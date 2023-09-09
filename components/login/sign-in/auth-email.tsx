'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type * as z from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { EyeIcon, EyeOffIcon } from '@/components/icons'
import { useToggle } from '@/lib/hooks/use-toggle'
import { useRouter } from 'next/navigation'
import { loginUserSchema } from '@/lib/validations/auth/login'
import Link from 'next/link'
import { errorNotify, successNotify } from '@/lib/common/notifys'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

const AuthEmail = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const supabase = createClientComponentClient()

  const form = useForm({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof loginUserSchema>) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      })

      if (error != null) return errorNotify({ message: error?.message })
      successNotify({ message: 'Success' })

      router.push('/')
    } catch (e) {
      console.log('error to log in')
    }
  }

  const [showPassword, togglePassword] = useToggle()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='email@example.com' {...field} type='text' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder='••••••••'
                  {...field}
                  type={showPassword ? 'text' : 'password'}
                />
              </FormControl>
              <Button
                type='button'
                size={'icon'}
                variant={'ghost'}
                className='absolute right-0 top-6'
                onClick={togglePassword}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </Button>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <Checkbox id='terms' required={true} />
            <Label
              htmlFor='terms'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              remember me
            </Label>
          </div>
          <Link
            href='/login/identify'
            className='text-sm font-medium text-primary hover:underline'
          >
            Forgot password?
          </Link>
        </div>

        <Button type='submit' className='!mt-6 w-full'>
          Login
        </Button>

        <div className='flex justify-center items-center'>
          <div className='h-0.5 w-full bg-secondary' />
          <span className='px-5 text-foreground'>or</span>
          <div className='h-0.5 w-full bg-secondary' />
        </div>

        {children}
      </form>
    </Form>
  )
}

export default AuthEmail
