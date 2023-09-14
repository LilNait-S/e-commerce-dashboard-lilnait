import { columns } from '@/components/products/product-list/columns'
import { DataTable } from '@/components/products/product-list/data-table'
import { fetchProducts } from '@/lib/actions/product.actions'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const ListInformation = async () => {
  const supabaseServer = createServerComponentClient({ cookies })
  const { products } = await fetchProducts({ supabaseServer })

  return (
    <div>
      <DataTable columns={columns} data={products} />
    </div>
  )
}

export default ListInformation
