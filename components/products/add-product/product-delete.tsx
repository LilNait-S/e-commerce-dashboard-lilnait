import { Button } from '@/components/ui/button'
import { TrashIcon } from '@radix-ui/react-icons'

const ProductDelete = ({
  remove,
  index,
}: {
  index: number
  remove: (index: number) => void
}) => {
  return (
    <Button
      type='button'
      variant='ghost'
      className='h-8 w-8 p-[6px]'
      onClick={() => {
        remove(index)
      }}
    >
      <span className='sr-only'>Delete product</span>
      <TrashIcon className='h-6 w-6' />
    </Button>
  )
}

export default ProductDelete
