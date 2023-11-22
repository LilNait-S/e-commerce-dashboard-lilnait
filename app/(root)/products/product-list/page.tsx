import ListInformation from '@/components/products/product-list/list-information'

export const dynamic = 'force-dynamic'

const Page = () => {
  return (
    <section>
      <h1 className='text-2xl font-bold mb-5'>Product list</h1>
      <ListInformation />
    </section>
  )
}

export default Page