'use client'

import { useForm } from 'react-hook-form'
import { registerUserSchema } from '@/lib/validations/auth/register'
import { zodResolver } from '@hookform/resolvers/zod'
import type * as z from 'zod'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

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
import AuthLayer from '../auth-layer'
import { EyeIcon, EyeOffIcon } from '@/components/icons'
import { useToggle } from '@/lib/hooks/use-toggle'
import { useRouter } from 'next/navigation'
import { errorNotify } from '@/lib/common'
import Link from 'next/link'

const SignUpCard = () => {
  const router = useRouter()
  const supabase = createClientComponentClient()

  const form = useForm({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof registerUserSchema>) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      })
      console.log('data', data)
      console.log('err', error)
      if (error != null) return errorNotify({ message: error?.message })

      // router.push('/')
    } catch (e) {
      throw new Error('error to register')
    }
  }

  const [showPassword, togglePassword] = useToggle()

  return (
    <AuthLayer>
      <h1 className='text-xl font-bold leading-tight tracking-tight md:text-2xl text-secondary-foreground'>
        Register to Lilnait.dev
      </h1>

      <p className='text-sm font-light text-gray-400 '>
        Do you already have an account?{' '}
        <Link
          href='/login'
          className='font-medium text-purple-500 hover:underline'
        >
          Sign in
        </Link>
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder='email@example.com'
                    {...field}
                    type='text'
                  />
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

          <Button type='submit' className='!mt-6 w-full'>
            Create account
          </Button>
        </form>
      </Form>
    </AuthLayer>
  )
}

export default SignUpCard
