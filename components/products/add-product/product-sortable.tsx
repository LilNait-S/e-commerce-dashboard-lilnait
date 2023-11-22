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
  handleRemoveImage: (public_id: string, idDB?: number) => void
}) => {
  return (
    <div className='flex flex-col gap-y-3'>
      <SortableLayer
        items={imagePreviews}
        setItems={setImagePreviews}
        form={form}
      >
        {imagePreviews.map((file, i) => {
          return (
            <SortableItem
              id={file.id}
              itemsLength={imagePreviews.length}
              key={file.public_id}
              id_local={file.id_local}
              name={file.public_id}
              className={
                'text-md group flex items-center justify-between rounded-md bg-neutral-100 px-3 py-2 font-mono dark:bg-neutral-900'
              }
              onRemove={handleRemoveImage}
            >
              <img
                src={file.secure_url}
                className='w-8 h-8 object-cover ml-2'
              />
              <span className='text-xs ml-2 whitespace-nowrap overflow-hidden text-ellipsis'>
                {file.public_id.length > 20
                  ? `${file.public_id.substring(0, 20)}...`
                  : file.public_id}
                {i === 0 ? '(main image)' : null}
              </span>
            </SortableItem>
          )
        })}
      </SortableLayer>
    </div>
  )
}

export default ProductSortable
