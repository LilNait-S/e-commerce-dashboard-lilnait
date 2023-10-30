import { useFieldArray } from 'react-hook-form'
import ProductVariants from './product-variants'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

const maxVariables = 4
const minVariables = 1

const VariantContainer = ({ control }: any) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'variables',
  })

  console.log('fields', fields)

  const handleAppend = () => {
    if (fields.length < maxVariables) {
      append({
        in_stock: true,
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
          minVariables={minVariables}
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
