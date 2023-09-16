'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const ProductTag = () => {
  const [tags, setTags] = useState(['please', 'do not'])

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const inputElement = e.target as HTMLInputElement
      if (inputElement.value.length > 0) {
        setTags([...tags, inputElement.value])
        inputElement.value = ''
      }
    }
  }

  const removeTag = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag)
    setTags(newTags)
  }
  return (
    <div className='border border-secundary p-3 rounded-md'>
      {tags.map((tag, index) => {
        return (
          <Badge key={index} variant='secondary' className='m-1 !px-4 py-1'>
            {tag}
            <Button
              variant='ghost'
              className='h-4 w-4 p-2 ml-2'
              onClick={() => {
                removeTag(tag)
              }}
            >
              x
            </Button>
          </Badge>
        )
      })}

      <input
        className='border-none flex-1 outline-none p-2 bg-transparent'
        onKeyDown={addTag}
      />
    </div>
  )
}

export default ProductTag
