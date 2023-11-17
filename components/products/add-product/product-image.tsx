import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { errorNotify } from '@/lib/common/notifys'
import { useState } from 'react'
import { SortableLayer } from './sortable-layer'
import { SortableItem } from './sortable-item'
import { MAX_FILE_SIZE } from '@/constants/products'
import { type FileObjectImage } from '../types'
import { Input } from '@/components/ui/input'

const ProductImage = ({ form }: any) => {
  const [imagePreviews, setImagePreviews] = useState<FileObjectImage[]>([])

  const handleChangeImages = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string[]) => void
  ) => {
    e.preventDefault()

    const files = e.target.files
    if (!files || files.length === 0) return
    const imagePromises: Promise<FileObjectImage>[] = []
    let id = 1

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (!file.type.includes('image')) {
        errorNotify({
          message: `The file ${file.name} is not a valid image.`,
        })
        continue
      }

      if (file.size > MAX_FILE_SIZE) {
        errorNotify({
          message: `The image ${file.name} is too large. Maximum 2MB allowed.`,
        })
        continue
      }

      const imagePromise = new Promise<FileObjectImage>((resolve) => {
        const fileReader = new FileReader()
        fileReader.onload = () => {
          const result = fileReader.result as string
          resolve({ id: id++, name: file.name, preview: result })
        }
        fileReader.readAsDataURL(file)
      })

      imagePromises.push(imagePromise)
    }

    Promise.all(imagePromises)
      .then((results) => {
        setImagePreviews(results)
        const data = results.map((entry) => entry.preview)
        fieldChange(data)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const handleRemoveImage = (imageName: string) => {
    const updatedPreviews = imagePreviews.filter(
      (item) => item.name !== imageName
    )
    setImagePreviews(updatedPreviews)

    const dataImgs = updatedPreviews.map((entry) => entry.preview)
    form.setValue('images', dataImgs)
  }

  return (
    <FormField
      control={form.control}
      name='images'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Media</FormLabel>
          <div className='flex items-center justify-center w-full py-2'>
            <FormLabel
              htmlFor='dropzone-file'
              className='flex flex-col items-center justify-center w-full h-64 border-2 border-border border-dashed rounded-lg cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-900'
            >
              <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                <svg
                  className='w-8 h-8 mb-4 text-gray-500'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 20 16'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                  />
                </svg>
                <p className='mb-2 text-sm text-gray-500'>
                  <span className='font-semibold'>Click to upload</span>
                </p>
                <p className='text-xs text-gray-500 max-w-[20ch] text-center'>
                  PNG, JPG, AVIF or WEBP (MAX. 1000x1000px or 2mb per image)
                </p>
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
              <FormMessage />
            </FormLabel>
          </div>

          <div className='flex flex-col gap-y-3 mt-3'>
            <SortableLayer
              items={imagePreviews}
              setItems={setImagePreviews}
              form={form}
            >
              {imagePreviews?.length ? (
                imagePreviews.map((file, i) => {
                  return (
                    <SortableItem
                      itemsLength={imagePreviews.length}
                      key={file.id}
                      id={file.id}
                      name={file.name}
                      className={
                        'text-md group flex items-center justify-between rounded-md bg-neutral-100 px-3 py-2 font-mono dark:bg-neutral-900'
                      }
                      onRemove={handleRemoveImage}
                    >
                      <img
                        src={file.preview}
                        className='w-8 h-8 object-cover ml-2'
                      />
                      <span className='text-xs ml-2 whitespace-nowrap overflow-hidden text-ellipsis'>
                        {file.name.length > 20
                          ? `${file.name.substring(0, 20)}...`
                          : file.name}
                        {i === 0 ? '(main image)' : null}
                      </span>
                    </SortableItem>
                  )
                })
              ) : (
                <span className='flex flex-grow justify-center text-xs'>
                  No hay imagenes para este producto
                </span>
              )}
            </SortableLayer>
          </div>
        </FormItem>
      )}
    />
  )
}

export default ProductImage
