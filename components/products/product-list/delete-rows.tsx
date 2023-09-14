import { Button } from '@/components/ui/button'
import { deleteProducts } from '@/lib/actions/product.actions'
import { TrashIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'

interface DataTableProps<TData> {
  data: TData[]
  rowSelection: Record<string, boolean>
  setRowSelection: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
}

export function DeleteRows<TData>({
  data,
  rowSelection,
  setRowSelection,
}: DataTableProps<TData>) {
  const router = useRouter()
  const handleDeleteRowSelected = async () => {
    const idsToDelete = Object.keys(rowSelection)
      .filter((index) => rowSelection[index])
      .map((index) => data[parseInt(index)].id)

    await deleteProducts({ ids: idsToDelete })

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
