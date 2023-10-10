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

interface Props {
  type: string
  product?: ProductDetails
}

const ProductForm = ({ type, product }: Props) => {
  const router = useRouter()
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name ?? '',
      slug: product?.slug ?? '',
      referential_code: product?.referential_code ?? '',
      description: product?.description ?? '',
      media: product?.media ?? '',
      categorys_id: product?.categorys_id ?? undefined,
      tags_id: product?.tags_id ?? undefined,
      inventory_id: product?.inventory_id ?? '',
    },
  })

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault()

    // Crea una nueva instancia de FileReader para leer el archivo seleccionado.
    const fileReader = new FileReader()

    // Verifica si se seleccionaron archivos.
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      // Actualiza el estado con los archivos seleccionados.
      setFiles(Array.from(e.target.files))

      // Verifica si el archivo seleccionado es una imagen.
      if (!file.type.includes('image')) return

      // Define un manejador de eventos para cuando el FileReader termine de cargar el archivo.
      fileReader.onload = async (e) => {
        // Recupera la URL de Datos que representa la imagen.
        const imageDataUrl = e.target?.result?.toString() ?? ''

        // Llama a la función de devolución de llamada proporcionada para actualizar el campo con la URL de Datos de la imagen.
        fieldChange(imageDataUrl)
      }

      // Lee el archivo seleccionado como una URL de Datos.
      fileReader.readAsDataURL(file)
    }
  }

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

  return (
    <>
      <header className='flex justify-between items-center mb-4'>
        <h1 className='title-product'>
          {type === 'create' ? 'Add a new Product' : 'Edit Product'}
        </h1>
        <div className='space-x-3'>
          <Button
            type='button'
            onClick={() => {
              form.handleSubmit(onSubmit)
            }}
          >
            {isSubmitting
              ? `${type === 'create' ? 'Publishing' : 'Editing'}`
              : `${type === 'create' ? 'Publish' : 'Edit'}`}
          </Button>
        </div>
      </header>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-wrap gap-6'
        >
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
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input {...field} type='text' />
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
            {/* <FormField
            control={form.control}
            name='media'
            render={({ field }) => (
              <FormItem className='flex items-center gap-4'>
                <FormLabel className='account-form_image-label'>
                  {field.value ? (
                    <img
                      src={field.value}
                      alt='profile photo'
                      width={96}
                      height={96}
                      className='rounded-full object-contain'
                    />
                  ) : (
                    <img
                      src='/assets/profile.svg'
                      alt='profile photo'
                      width={96}
                      height={96}
                      className='object-contain'
                    />
                  )}
                </FormLabel>
                <FormControl className='flex-1 text-base-semibold text-gray-200'>
                  <Input
                    type='file'
                    accept='image/*'
                    placeholder='Upload a photo'
                    className='account-form_image-input'
                    onChange={(e) => {
                      handleImage(e, field.onChange)
                    }}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          /> */}

            <ProductImage form={form} />
            <ProductCategory />
            <ProductTag />
          </section>

          <section className='flex-1 min-w-[280px]'>
            <ProductVariants form={form} />
          </section>
        </form>
      </Form>
    </>
  )
}

export default ProductForm
