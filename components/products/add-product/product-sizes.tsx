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

const ProductSizes = ({ control, index }: { control: any; index: number }) => {
  return (
    <div className='flex-1'>
      <FormField
        control={control}
        name={`variables.${index}.size_id`}
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
                    return (
                      <SelectItem key={value} value={value.toString()}>
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
