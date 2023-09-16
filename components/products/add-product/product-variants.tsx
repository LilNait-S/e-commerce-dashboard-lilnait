/* eslint-disable react/no-unescaped-entities */
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import ProductSizes from './product-sizes'
import { Input } from '@/components/ui/input'
import ProductDelete from './product-delete'

const ProductVariants = ({ form }: { form: any }) => {
  return (
    <section className='border border-border p-6 rounded-md space-y-6 w-full'>
      <header className='flex justify-between items-center'>
        <FormField
          control={form.control}
          name='in_stock'
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
        <ProductDelete />
      </header>
      <ProductSizes form={form} />
      <FormField
        control={form.control}
        name='price'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Price</FormLabel>
            <FormControl>
              <Input {...field} type='number' />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <h2 className='sub-title-product'>Optional</h2>
      <FormField
        control={form.control}
        name='available_quantity'
        render={({ field }) => (
          <FormItem>
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
        name='on_offer'
        render={({ field }) => (
          <FormItem className='flex flex-row'>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <FormLabel className='text-base !mt-0 ml-2'>
              It's on offer?
            </FormLabel>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='offer_price'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Offer price</FormLabel>
            <FormControl>
              <Input {...field} type='number' />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </section>
  )
}

export default ProductVariants
