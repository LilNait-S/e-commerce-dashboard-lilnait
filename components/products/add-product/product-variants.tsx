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
import { minVariables } from '@/constants/products'

const ProductVariants = ({
  form,
  remove,
  index,
  variants,
}: {
  form: any
  remove: (index: number) => void
  index: number
  variants: number
}) => {
  return (
    <section className='border border-border p-6 rounded-md space-y-6 w-full'>
      <header className='flex justify-between items-center'>
        <FormField
          control={form.control}
          defaultValue={true}
          name={`variants.${index}.in_stock`}
          render={({ field }) => (
            <FormItem className='flex flex-row'>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className='text-base !mt-0 ml-2'>In stock</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        {variants > minVariables && (
          <ProductDelete remove={remove} index={index} />
        )}
      </header>
      <main className='flex gap-5 justify-start items-start'>
        <ProductSizes form={form} index={index} />
        <FormField
          control={form.control}
          name={`variants.${index}.price_size`}
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='number'
                  className='[&::-webkit-inner-spin-button]:appearance-none'
                />
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
          name={`variants.${index}.available_quantity`}
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>Available quantity</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='number'
                  className='[&::-webkit-inner-spin-button]:appearance-none'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`variants.${index}.price_offer`}
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>Offer price</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='number'
                  className='[&::-webkit-inner-spin-button]:appearance-none'
                />
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
