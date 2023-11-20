import ProductForm from '@/components/products/add-product/product-form'
import { getProductDetails } from '@/lib/actions/product.actions'

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const { product } = await getProductDetails({ id })

  return <ProductForm type='edit' product={product} />
}

export default page
