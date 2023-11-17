import { Button } from '@/components/ui/button'
import { deleteProduct } from '@/lib/actions/product.actions'
import { TrashIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { type imagesDB } from '../types'

interface Props {
  id: string
  imgsData: imagesDB[]
}
const DeleteRow = ({ id, imgsData }: Props) => {
  const router = useRouter()
  const handleDelete = () => {
    deleteProduct({ id, imgsData })
    router.refresh()
  }
  return (
    <Button variant='ghost' className='h-8 w-8 p-0' onClick={handleDelete}>
      <span className='sr-only'>Delete product</span>
      <TrashIcon className='h-4 w-4' />
    </Button>
  )
}

export default DeleteRow
