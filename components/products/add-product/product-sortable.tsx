import React from 'react'
import { SortableLayer } from './sortable-layer'
import { SortableItem } from './sortable-item'
import { type Dispatch, type SetStateAction } from 'react'
const ProductSortable = ({
  form,
  imagePreviews,
  setImagePreviews,
  handleRemoveImage,
}: {
  form: any
  imagePreviews: any[]
  setImagePreviews: Dispatch<SetStateAction<any[]>>
  handleRemoveImage: (imageName: string) => void
}) => {
  return (
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
                <img src={file.preview} className='w-8 h-8 object-cover ml-2' />
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
  )
}

export default ProductSortable
