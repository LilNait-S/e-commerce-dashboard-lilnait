import { useFieldArray } from 'react-hook-form'
import ProductVariants from './product-variants'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { maxVariables } from '@/constants/products'

const VariantContainer = ({ control, setValue }: any) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'variables',
    rules: {
      minLength: 1,
      maxLength: 4,
    },
  })

  console.log('fields', fields)

  const handleAppend = () => {
    if (fields.length < maxVariables) {
      append({
        in_stock: true,
        size_id: '',
        price_product: 0,
        available_quantity: 0,
        offer_price: 0,
      })
    }
  }

  return (
    <section className='flex-1 flex flex-col min-w-[280px] gap-6 items-center'>
      {fields.map(({ id }, index) => (
        <ProductVariants
          key={id}
          control={control}
          index={index}
          remove={remove}
          variables={fields.length}
        />
      ))}

      {fields.length < maxVariables && (
        <Button
          type='button'
          variant='outline'
          size='icon'
          onClick={handleAppend}
        >
          <Plus />
        </Button>
      )}
    </section>
  )
}

export default VariantContainer
