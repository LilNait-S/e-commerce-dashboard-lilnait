import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { sizesVariant } from '@/constants/products'

const ProductSizes = ({ form, index }: { form: any; index: number }) => {
  const sizes = form.watch('variants')
  return (
    <div className='flex-1'>
      <FormField
        control={form.control}
        name={`variants.${index}.sizes_id`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Size</FormLabel>

            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder='Select a size' />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sizes</SelectLabel>
                  {sizesVariant?.map(({ value, size }) => {
                    const isDisabled = sizes.some(
                      (entry: { sizes_id: string; }) => entry.sizes_id === value.toString()
                    )
                    return (
                      <SelectItem
                        key={value}
                        value={value.toString()}
                        disabled={isDisabled}
                      >
                        {size}
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

export default ProductSizes
