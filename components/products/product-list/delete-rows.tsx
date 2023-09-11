import { Button } from '@/components/ui/button'
import { deleteProduct } from '@/lib/actions/product.actions'
import { TrashIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'

const DeleteRows = ({ data, rowSelection, setRowSelection }) => {
  const router = useRouter()
  const handleDeleteRowSelected = async () => {
    const idsParaBorrar = Object.keys(rowSelection)
      .filter((indice) => rowSelection[indice])
      .map((indice) => data[indice].id)
    await deleteProduct({ ids: idsParaBorrar })
    router.refresh()
    setRowSelection({})
  }

  return (
    <Button
      variant='ghost'
      onClick={() => {
        handleDeleteRowSelected()
      }}
    >
      <TrashIcon className='h-5 w-5' />
    </Button>
  )
}

export default DeleteRows
