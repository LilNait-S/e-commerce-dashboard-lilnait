import ProductInformation from '@/components/products/form/product-information'
import React from 'react'

const page = () => {
  return (
    <section>
      <h1 className='text-2xl font-bold mb-5'>Add Product</h1>
      <ProductInformation />
    </section>
  )
}

export default page
