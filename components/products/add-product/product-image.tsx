import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { errorNotify } from '@/lib/common/notifys'
import { useState } from 'react'
import { type imagesDB } from '../types'
import { Input } from '@/components/ui/input'
import ProductSortable from './product-sortable'
import { deleteImages, uploadImage } from '@/lib/actions/product.actions'
import { processImage } from '@/lib/common/utils'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

const ProductImage = ({ form }: any) => {
  const [imagePreviews, setImagePreviews] = useState<imagesDB[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)

  const handleChangeImages = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string[]) => void
  ) => {
    e.preventDefault()

    const files = e.target.files
    if (!files || files.length === 0) return
    if (loadingProgress > 0) {
      setLoadingProgress(0)
    }
    setIsLoading(true)

    const imagePromises: (string | null)[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const preview = await processImage(file)
      if (preview !== null) {
        imagePromises.push(preview)
      }
    }
    setLoadingProgress(20)

    const validResults = imagePromises.filter((result) => result !== null)

    try {
      const dataImages = await uploadImage(validResults as string[])
      setLoadingProgress(60)

      if (!dataImages) {
        errorNotify({ message: 'Image upload error' })
        setIsLoading(false)
        return
      }

      const newImages = dataImages.map((data: imagesDB, index: number) => ({
        id: imagePreviews.length + index + 1,
        created_at: data.created_at,
        asset_id: data.asset_id,
        public_id: data.public_id,
        format: data.format,
        tags: data.tags,
        type: data.type,
        url: data.url,
        secure_url: data.secure_url,
        folder: data.folder,
      }))

      const lastData = [...imagePreviews, ...newImages].map((data, index) => ({
        ...data,
        order: index + 1,
      }))
      setLoadingProgress(100)
      setImagePreviews(lastData)
      fieldChange(lastData)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveImage = async (public_id: string) => {
    try {
      const updatedPreviews = imagePreviews.filter(
        (item) => item.public_id !== public_id
      )
      await deleteImages([public_id])

      form.setValue(
        'images',
        updatedPreviews.map((imageData, index) => ({
          ...imageData,
          order: index + 1,
        }))
      )

      setImagePreviews(updatedPreviews)
    } catch (e) {
      console.error(e)
    }
  }

  const remoteAllImages = async (public_ids: string[]) => {
    try {
      setIsLoading(true)
      setLoadingProgress(20)
      await deleteImages(public_ids)
      form.setValue('images', [])
      setImagePreviews([])
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
      setLoadingProgress(100)
    }
  }

  const images = form.watch('images')
  console.log('images', images)
  console.log(`imagePreviews`, imagePreviews)

  return (
    <FormField
      control={form.control}
      name='images'
      render={({ field }) => (
        <FormItem className='flex flex-col space-y-5'>
          <FormLabel>Media</FormLabel>
          <div className='flex flex-col gap-4'>
            <div className='flex justify-between items-center gap-4'>
              <FormLabel
                htmlFor='dropzone-file'
                className='border-2 border-border rounded-lg cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-900 h-10 px-4 py-2 flex-1'
              >
                <div className='flex items-center justify-center gap-2 text-gray-500 whitespace-nowrap'>
                  <svg
                    className='w-5 h-5'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 20 16'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='1.5'
                      d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                    />
                  </svg>
                  Add images
                </div>
                <FormControl>
                  <Input
                    id='dropzone-file'
                    type='file'
                    accept='image/jpg, image/jpeg, image/png, image/avif, image/webp'
                    multiple
                    className='hidden'
                    onChange={(e) => {
                      handleChangeImages(e, field.onChange)
                    }}
                  />
                </FormControl>
              </FormLabel>
              <Button
                type='button'
                variant='outline'
                className='border-destructive text-destructive hover:text-destructive dark:hover:bg-neutral-900 flex-1'
                onClick={() => {
                  remoteAllImages(imagePreviews.map((img) => img.public_id))
                }}
              >
                Delete all images
              </Button>
            </div>

            <p className='text-sm text-gray-500 text-center'>
              PNG, JPG, AVIF or WEBP (MAX. 1000x1000px or 2mb per image)
            </p>
          </div>
          <FormMessage />

          {isLoading ? (
            <Progress value={loadingProgress} />
          ) : (
            <ProductSortable
              form={form}
              imagePreviews={imagePreviews}
              setImagePreviews={setImagePreviews}
              handleRemoveImage={handleRemoveImage}
            />
          )}
        </FormItem>
      )}
    />
  )
}

export default ProductImage
