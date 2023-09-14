'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type * as z from 'zod'
import { supabase } from '@/lib/supabase'

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
import { errorNotify, successNotify } from '@/lib/common/notifys'
import { loginUserSchema } from '@/lib/validations/auth/login'
import { useToggle } from '@/lib/hooks/use-toggle'
import { EyeIcon, EyeOffIcon } from '@/components/icons'

const RecoverPassword = () => {
  const form = useForm({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof loginUserSchema>) => {
    try {
      const { error } = await supabase.auth.updateUser({
        email: values.email,
        password: values.password,
        data: { hello: 'world' },
      })

      if (error != null) return errorNotify({ message: error?.message })
      successNotify({ message: 'Successfully reset password.' })
    } catch (e) {
      console.log('error to log in')
    }
  }

  const [showPassword, togglePassword] = useToggle()
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
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
                <span className='sr-only'>Show password</span>
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </Button>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full'>
          Update
        </Button>
      </form>
    </Form>
  )
}

export default RecoverPassword
