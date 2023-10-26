import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import ProductSizes from './product-sizes'
import ProductDelete from './product-delete'

const ProductVariants = ({
  form,
  deleteVariable,
  id,
  minVariables,
  variables,
}: {
  form: any
  deleteVariable: (id: string) => void
  id: string
  minVariables: number
  variables: string[]
}) => {
  return (
    <section className='border border-border p-6 rounded-md space-y-6 w-full'>
      <header className='flex justify-between items-center'>
        <FormField
          control={form.control}
          defaultValue={true}
          name={`in_stock ${id}`}
          render={({ field }) => (
            <FormItem className='flex flex-row'>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className='text-base !mt-0 ml-2'>In stock</FormLabel>
            </FormItem>
          )}
        />
        {variables.length > minVariables && (
          <ProductDelete deleteVariable={deleteVariable} id={id} />
        )}
      </header>
      <main className='flex items-center gap-5'>
        <FormItem className='flex-1'>
          <FormLabel>Size</FormLabel>
          <ProductSizes form={form} />
        </FormItem>

        <FormField
          control={form.control}
          name='price'
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input {...field} type='number' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </main>

      <h2 className='sub-title-product'>Optional</h2>
      <div className='flex items-center gap-5'>
        <FormField
          control={form.control}
          name='available_quantity'
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>Available quantity</FormLabel>
              <FormControl>
                <Input {...field} type='number' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='offer_price'
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>Offer price</FormLabel>
              <FormControl>
                <Input {...field} type='number' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </section>
  )
}

export default ProductVariants
