import ProductForm from '@/components/products/add-product/product-form'

const page = () => {
  return (
    <section>
      <h1 className='text-2xl font-bold mb-5'>Add Product</h1>
      <ProductForm type="create" />
    </section>
  )
}

export default page
