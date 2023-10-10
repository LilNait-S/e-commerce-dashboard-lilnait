/* eslint-disable react/no-unescaped-entities */
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { suggestions } from '@/constants/products'
import { Info } from 'lucide-react'
import { useRef, useState } from 'react'

const ProductTag = () => {
  const [tags, setTags] = useState(['Anime', 'Plush'])
  const ref = useRef<HTMLInputElement>(null)

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
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
    <section>
      <h3 className='text-sm font-medium leading-none'>Tags</h3>
      <header className='relative mt-2'>
        {suggestions.map((info) => (
          <div
            key={info.title}
            className='flex flex-col mt-3 text-gray-700 dark:text-gray-400'
          >
            <span className='text-sm font-mono font-semibold'>
              {info.title}
            </span>
            <p className='text-xs font-mono'>{info.paragraph}</p>
          </div>
        ))}
      </header>

      <main
        className='border border-secundary p-3 rounded-md mt-3'
        onClick={() => {
          ref.current?.focus()
        }}
      >
        {tags.map((tag, index) => {
          return (
            <Badge key={index} variant='secondary' className='m-1 !px-4 py-1'>
              {tag}
              <Button
                type='button'
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
          ref={ref}
          className='border-none flex-1 outline-none p-2 bg-transparent'
          onKeyDown={addTag}
        />
      </main>
      <footer className='flex items-center flex-grow justify-center mt-3'>
        <div className='relative'>
          <Info className='h-4 w-4 absolute -left-4 top-[5px]' />
          <span className='text-sm ml-2'>Press enter to enter the tags</span>
        </div>
      </footer>
    </section>
  )
}

export default ProductTag
