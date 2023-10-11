import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const ProductSizes = ({ form }: { form: any }) => {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder='Select a size' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value='Small'>Small</SelectItem>
          <SelectItem value='Medium'>Medium</SelectItem>
          <SelectItem value='Large'>Large</SelectItem>
          <SelectItem value='Gigant'>Gigant</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default ProductSizes
