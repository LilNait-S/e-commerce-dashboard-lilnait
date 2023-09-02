'use client'

import { useForm } from 'react-hook-form'
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
import { loginUserSchema } from '@/lib/validations/auth/login'
import Link from 'next/link'
import { AuthGoogleButton } from './google-sign-in'
import { errorNotify } from '@/lib/common'

const AuthSignInCard = () => {
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
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      })

      console.log('data', data)
      console.log('err', error?.stack)
      if (error != null) return errorNotify({ message: error?.message })

      router.push('/')
    } catch (e) {
      console.log('error to log in')
    }
  }

  const [showPassword, togglePassword] = useToggle()

  return (
    <AuthLayer>
      <h1 className='text-xl font-bold leading-tight tracking-tight md:text-2xl text-foreground'>
        Sign in to Lilnait.dev
      </h1>
      <p className='text-sm font-light text-secondary-foreground'>
        Don’t have an account?{' '}
        <Link
          href='/signup'
          className='font-medium text-primary hover:underline'
        >
          Sign up
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

          <div className='flex items-center justify-between'>
            <div className='flex items-start'>
              <div className='flex items-center h-5'>
                <input
                  id='remember'
                  aria-describedby='remember'
                  type='checkbox'
                  className='w-4 h-4'
                  required={true}
                />
              </div>
              <div className='ml-3 text-sm'>
                <label htmlFor='remember' className='text-muted-foreground'>
                  Remember me
                </label>
              </div>
            </div>
            <Link
              href='#'
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

          <AuthGoogleButton />
        </form>
      </Form>
    </AuthLayer>
  )
}

export default AuthSignInCard
