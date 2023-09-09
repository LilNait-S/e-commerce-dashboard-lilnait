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
import { ProductValidation } from '@/lib/validations/product'
import { Textarea } from '@/components/ui/textarea'
import { errorNotify, successNotify } from '@/lib/common/notifys'

const ProductInformation = () => {
  const supabase = createClientComponentClient()

  const form = useForm({
    resolver: zodResolver(ProductValidation),
    defaultValues: {
      name: '',
      referential_code: '',
      price: 0,
      description: '',
      image_url: '',
    },
  })
  const { reset } = form

  const onSubmit = async (values: z.infer<typeof ProductValidation>) => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user === null) return
    const content = { ...values, user_id: user.id }

    const { data, error } = await supabase
      .from('products')
      .insert([content])
      .select()

    console.log('data', data)
    console.log('error', error)

    if (error != null) return errorNotify({ message: error?.message })
    successNotify({ message: 'Success' })
    reset()
  }

  return (
    <div className='border border-border p-6 rounded-md'>
      <h2 className='mb-6'>ProductInformation</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Product title' {...field} type='text' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='referential_code'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Referential Code</FormLabel>
                <FormControl>
                  <Input placeholder='0123AB-4567CD' {...field} type='text' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input {...field} type='number' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    rows={10}
                    placeholder='Product description'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default ProductInformation
