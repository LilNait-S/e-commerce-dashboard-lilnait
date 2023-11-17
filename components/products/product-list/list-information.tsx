import { columns } from '@/components/products/product-list/columns'
import { DataTable } from '@/components/products/product-list/data-table'
import { fetchProducts } from '@/lib/actions/product.actions'

const ListInformation = async () => {
  const { products } = await fetchProducts()

  return (
    <div>
      <DataTable columns={columns} data={products} />
    </div>
  )
}

export default ListInformation
