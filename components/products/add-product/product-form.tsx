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

import { productSchema } from '@/lib/validations/product'
import { createProduct, updateProduct } from '@/lib/actions/product.actions'
import { type ProductValue } from '../types'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import ProductCategory from './product-category'
import ProductImage from './product-image'
import VariantContainer from './variant-container'

import { RefreshCcw } from 'lucide-react'
import { textToSlug } from '@/lib/common/utils'

interface Props {
  type: string
  product?: ProductValue
}

const ProductForm = ({ type, product }: Props) => {
  const router = useRouter()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name ?? '',
      slug: product?.slug ?? '',
      referential_code: product?.referential_code ?? '',
      description: product?.description ?? '',
      images: product?.images ?? [],
      categorys_id: product?.categorys_id ?? '1',

      variants: [
        {
          in_stock: true,
          sizes_id: '1',
          price_size: 0,
          available_quantity: 0,
          price_offer: 0,
        },
      ],
    },
  })

  const onSubmit = async (values: z.infer<typeof productSchema>) => {
    setIsSubmitting(true)
    try {
      if (type === 'create') {
        await createProduct({
          values,
        })
        router.push('/products/product-list')
      }
      if (type === 'edit') {
        // await updateProduct({ values, productId: product?.id as string })
        // router.push('/products/product-list')
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsSubmitting(false)
    }

    router.refresh()
  }

  const handleSlug = () => {
    const name = form.watch('name')
    const slug = textToSlug(name)
    form.setValue('slug', slug)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <header className='flex w-full justify-between items-center mb-4'>
          <h1 className='title-product'>
            {type === 'create' ? 'Add a new Product' : 'Edit Product'}
          </h1>
          <div className='space-x-3'>
            <Button type='submit'>
              {isSubmitting
                ? `${type === 'create' ? 'Publishing' : 'Editing'}`
                : `${type === 'create' ? 'Publish' : 'Edit'}`}
            </Button>
          </div>
        </header>

        <div className='flex flex-wrap gap-6'>
          <section className='border border-border p-6 rounded-md space-y-6 flex-1'>
            <h2 className='sub-title-product'>Information</h2>
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
              name='slug'
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input {...field} type='text' />
                  </FormControl>
                  <Button
                    type='button'
                    size='icon'
                    variant='ghost'
                    className='absolute right-0 top-6'
                    onClick={handleSlug}
                  >
                    <RefreshCcw className='h-5 w-5' />
                  </Button>
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

            <ProductImage control={form.control} />
            <ProductCategory control={form.control} />
          </section>

          <VariantContainer form={form} />
        </div>
      </form>
    </Form>
  )
}

export default ProductForm
