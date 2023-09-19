import { Button } from '@/components/ui/button'
import { FormLabel } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { errorNotify } from '@/lib/common/notifys'
import { GripVertical, X } from 'lucide-react'
import { useEffect, useState } from 'react'

interface FileObject {
  objectUrl: string
  name: string
}

const ProductImage = ({ form }: any) => {
  const [files, setFiles] = useState<File[] | null>(null)
  const [previews, setPreviews] = useState<FileObject[] | null>(null)

  const handleChangeImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files
    if (!fileList) return

    const filesArray = Array.from(fileList)

    for (const file of filesArray) {
      if (!file.type.includes('image')) {
        errorNotify({ message: 'Please upload an image file' })
        return
      }
    }

    setFiles(filesArray)
  }

  useEffect(() => {
    if (!files) return

    const fileObjects = files.map((file) => ({
      objectUrl: URL.createObjectURL(file),
      name: file.name,
    }))

    setPreviews(fileObjects)

    return () => {
      fileObjects.forEach((fileObject) => {
        URL.revokeObjectURL(fileObject.objectUrl)
      })
    }
  }, [files])

  return (
    <section className=''>
      <FormLabel>Media</FormLabel>
      <div className='flex items-center justify-center w-full py-2'>
        <Label
          htmlFor='dropzone-file'
          className='flex flex-col items-center justify-center w-full h-64 border-2 border-border border-dashed rounded-lg cursor-pointer bg-background hover:bg-popover'
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
              <span className='font-semibold'>Click to upload</span> or drag and
              drop
            </p>
            <p className='text-xs text-gray-500'>
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id='dropzone-file'
            type='file'
            accept='image/jpg, image/jpeg, image/png, image/avif, image/webp'
            multiple
            className='hidden'
            onChange={handleChangeImages}
          />
        </Label>
      </div>
      <div className='flex flex-col gap-y-3 mt-3'>
        {previews?.map(({ objectUrl, name }) => {
          return (
            <div
              key={name}
              className='relative flex flex-row flex-grow bg-background p-2 items-center justify-between'
            >
              <div className='flex flex-row items-center'>
                <Button
                  variant='ghost'
                  size='icon'
                  className='h-8 w-8 cursor-grab'
                >
                  <GripVertical className='h-5 w-5' />
                </Button>
                <img src={objectUrl} className='w-10 h-10 object-cover ml-2' />
                <span className='text-xs ml-2 whitespace-nowrap overflow-hidden text-ellipsis'>
                  {name}
                </span>
              </div>

              <Button
                type='button'
                variant='ghost'
                size='icon'
                className='h-8 w-8'
              >
                <X className='h-5 w-5' />
              </Button>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default ProductImage
