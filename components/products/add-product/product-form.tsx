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
import { useRouter } from 'next/navigation'
import { createProduct, updateProduct } from '@/lib/actions/product.actions'
import { type ProductDetails } from '../types'
import { useState } from 'react'
import ProductCategory from './product-category'
import ProductTag from './product-tag'
import ProductImage from './product-image'
import ProductVariants from './product-variants'
import { Plus, RefreshCcw } from 'lucide-react'
import { textToSlug } from '@/lib/common/utils'

interface Props {
  type: string
  product?: ProductDetails
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
      categorys_id: product?.categorys_id ?? undefined,
      tags_id: product?.tags_id ?? undefined,
      variants_id: product?.variants_id ?? '',
    },
  })

  const onSubmit = async (values: z.infer<typeof productSchema>) => {
    setIsSubmitting(true)
    try {
      if (type === 'create') {
        console.log('values', values)
        // await createProduct({
        //   values,
        // })
        // router.push('/products/product-list')
      }
      if (type === 'edit') {
        await updateProduct({ values, productId: product?.id as string })
        router.push('/products/product-list')
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsSubmitting(false)
    }

    router.refresh()
  }

  const [variables, setVariables] = useState<string[]>([crypto.randomUUID()])
  const maxVariables = 4
  const minVariables = 1

  const addVariable = () => {
    if (variables.length < maxVariables) {
      setVariables([...variables, crypto.randomUUID()])
    }
  }
  const deleteVariable = (id: string) => {
    if (variables.length > minVariables) {
      const indexToDelete = variables.findIndex((item) => item === id)
      variables.splice(indexToDelete, 1)
      router.refresh()
    }
  }
  const [nameValue, setNameValue] = useState('')
  const [slugValue, setSlugValue] = useState('')

  const handleName = (text: string) => {
    setNameValue(text)
  }

  const handleSlug = () => {
    const newSlug = textToSlug(nameValue)
    setSlugValue(newSlug)
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
                    onClick={() => {
                      handleSlug()
                    }}
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

            <ProductImage form={form} />
            <ProductCategory />
            <ProductTag />
          </section>

          <section className='flex-1 flex flex-col min-w-[280px] gap-6 items-center'>
            {variables.map((id) => (
              <ProductVariants
                key={id}
                form={form}
                deleteVariable={deleteVariable}
                id={id}
                variables={variables}
                minVariables={minVariables}
              />
            ))}

            {variables.length < maxVariables && (
              <Button
                type='button'
                variant='outline'
                size='icon'
                onClick={addVariable}
              >
                <Plus />
              </Button>
            )}
          </section>
        </div>
      </form>
    </Form>
  )
}

export default ProductForm
