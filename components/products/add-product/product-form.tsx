'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { Textarea } from '@/components/ui/textarea'

import { ProductValidation } from '@/lib/validations/product'
import { useRouter } from 'next/navigation'
import { createProduct, updateProduct } from '@/lib/actions/product.actions'
import { type ProductDetails } from '../types'
import { useState } from 'react'

interface Props {
  type: string
  product?: ProductDetails
}

const ProductForm = ({ type, product }: Props) => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm({
    resolver: zodResolver(ProductValidation),
    defaultValues: {
      name: product?.name ?? '',
      referential_code: product?.referential_code ?? '',
      price: product?.price ?? 0,
      description: product?.description ?? '',
    },
  })

  const onSubmit = async (values: z.infer<typeof ProductValidation>) => {
    setIsSubmitting(true)

    try {
      if (type === 'create') {
        await createProduct({
          values,
        })
        router.push('/products/product-list')
      }
      if (type === 'edit') {
        await updateProduct({ values, productId: product?.id as string })
      }
    } catch (e) {
      console.error(e)
    }

    router.refresh()
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

          <Button type='submit'>
            {isSubmitting
              ? `${type === 'create' ? 'Creating' : 'Editing'}`
              : `${type === 'create' ? 'Create' : 'Edit'}`}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default ProductForm
