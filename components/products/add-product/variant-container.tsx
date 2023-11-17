import { useFieldArray } from 'react-hook-form'
import ProductVariants from './product-variants'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { maxVariables } from '@/constants/products'

const VariantContainer = ({ form }: any) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'variants',
    rules: {
      minLength: 1,
      maxLength: 4,
    },
  })

  const handleAppend = () => {
    if (fields.length < maxVariables) {
      append({
        in_stock: true,
        sizes_id: '',
        price_size: 0,
        available_quantity: 0,
        price_offer: 0,
      })
    }
  }

  return (
    <section className='flex-1 flex flex-col min-w-[280px] gap-6 items-center'>
      {fields.map(({ id }, index) => (
        <ProductVariants
          key={id}
          form={form}
          index={index}
          remove={remove}
          variants={fields.length}
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
