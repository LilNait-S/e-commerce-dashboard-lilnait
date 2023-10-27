import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const ProductSizes = ({ formControl }: any) => {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder='Select a size' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value='1'>Pequeño</SelectItem>
          <SelectItem value='2'>Mediano</SelectItem>
          <SelectItem value='3'>Grande</SelectItem>
          <SelectItem value='4'>Gigante</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default ProductSizes
