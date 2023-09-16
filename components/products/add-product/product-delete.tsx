import { Button } from '@/components/ui/button'
import { deleteProduct } from '@/lib/actions/product.actions'
import { TrashIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'

const ProductDelete = ({ id }: { id: string }) => {
  const router = useRouter()
  const handleDelete = ({ id }: { id: string }) => {
    deleteProduct({ id })
    router.refresh()
  }
  return (
    <Button
      variant='ghost'
      className='h-8 w-8 p-[6px]'
      onClick={() => {
        handleDelete({ id })
      }}
    >
      <span className='sr-only'>Delete product</span>
      <TrashIcon className='h-6 w-6' />
    </Button>
  )
}

export default ProductDelete
