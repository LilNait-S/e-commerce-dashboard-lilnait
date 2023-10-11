import { Button } from '@/components/ui/button'
import { TrashIcon } from '@radix-ui/react-icons'

const ProductDelete = ({
  deleteVariable,
  id,
}: {
  id: string
  deleteVariable: (id: string) => void
}) => {
  return (
    <Button
      type='button'
      variant='ghost'
      className='h-8 w-8 p-[6px]'
      onClick={() => {
        deleteVariable(id)
      }}
    >
      <span className='sr-only'>Delete product</span>
      <TrashIcon className='h-6 w-6' />
    </Button>
  )
}

export default ProductDelete
