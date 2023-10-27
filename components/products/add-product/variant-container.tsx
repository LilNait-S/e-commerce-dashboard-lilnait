import { useState } from 'react'
import ProductVariants from './product-variants'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

const maxVariables = 4
const minVariables = 1

const VariantContainer = ({ formControl }: any) => {

  const [variables, setVariables] = useState<string[]>([crypto.randomUUID()])
  const router = useRouter()

  const addVariable = () => {
    if (variables.length < maxVariables) {
      setVariables([...variables, crypto.randomUUID()])
    }
  }

  const deleteVariable = (id: string) => {
    if (variables.length > minVariables) {
      const indexToDelete = variables.findIndex((item) => item === id)
      variables.splice(indexToDelete, 1)
      router.refresh()
    }
  }
  
  return (
    <section className='flex-1 flex flex-col min-w-[280px] gap-6 items-center'>
      {variables.map((id) => (
        <ProductVariants
          key={id}
          formControl={formControl}
          deleteVariable={deleteVariable}
          id={id}
          variables={variables}
          minVariables={minVariables}
        />
      ))}

      {variables.length < maxVariables && (
        <Button
          type='button'
          variant='outline'
          size='icon'
          onClick={addVariable}
        >
          <Plus />
        </Button>
      )}
    </section>
  )
}

export default VariantContainer
