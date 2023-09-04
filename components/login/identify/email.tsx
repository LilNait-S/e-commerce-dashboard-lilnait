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
import { Button, buttonVariants } from '@/components/ui/button'
import { errorNotify, successNotify } from '@/lib/common/notifys'
import { identifyUserSchema } from '@/lib/validations/auth/identify'
import Link from 'next/link'

const EmailIdentify = () => {
  const supabase = createClientComponentClient()
  const form = useForm({
    resolver: zodResolver(identifyUserSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof identifyUserSchema>) => {
    try {
      const {  error } = await supabase.auth.resetPasswordForEmail(
        values.email
      )

      if (error != null) return errorNotify({ message: error?.message })
      successNotify({ message: 'Successfully reset password.' })

    } catch (e) {
      console.log('error to log in')
    }
  }
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

        <div className='grid grid-cols-2 gap-4'>
          <Link
            href="/login"
            className={buttonVariants({ variant: 'outline' })}
          >
            Cancel
          </Link>
          <Button type='submit'>Send</Button>
        </div>
      </form>
    </Form>
  )
}

export default EmailIdentify
