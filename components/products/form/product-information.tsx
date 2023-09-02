'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

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
import type * as z from 'zod'
import { ProductValidation } from '@/lib/validations/product'
import { Textarea } from '@/components/ui/textarea'

const ProductInformation = () => {
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

  function onSubmit(values: z.infer<typeof ProductValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
    <div className='border-2 border-gray-900 p-6 rounded-md'>
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
