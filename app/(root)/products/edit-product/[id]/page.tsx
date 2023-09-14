import ProductForm from '@/components/products/add-product/product-form'
import { type ProductDetails } from '@/components/products/types'
import { getProductDetails } from '@/lib/actions/product.actions'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const supabaseServer = createServerComponentClient({ cookies })
  const { product } = (await getProductDetails({ id, supabaseServer })) as {
    product?: ProductDetails
  }

  return (
    <section>
      <h1 className='text-2xl font-bold mb-5'>Add Product</h1>
      <ProductForm type='edit' product={product} />
    </section>
  )
}

export default page
