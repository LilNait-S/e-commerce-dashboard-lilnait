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
import { fetchCategorys } from '@/lib/actions/product.actions'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Category {
  id: number
  category_name: string
}

const ProductCategory = ({ formControl }: any) => {
  const [category, setCategory] = useState<Category[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const { categorys } = await fetchCategorys()
      setCategory(categorys || [])
    }
    fetchData()
  }, [])

  console.log('category', category)

  return (
    <section>
      <h2 className='sub-title-product'>Organize</h2>
      <FormField
        control={formControl}
        name='categorys_id'
        render={({ field }) => (
          <FormItem>
            <div className='flex justify-between mb-3'>
              <FormLabel>Category</FormLabel>
              <Link
                href='/'
                className={`text-purple-500 text-sm font-medium leading-none`}
              >
                Add new category
              </Link>
            </div>

            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder='Select a category' />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  {category?.map(({ category_name, id }) => (
                    <SelectItem key={id} value={id.toString()}>
                      {category_name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <FormMessage />
          </FormItem>
        )}
      />
    </section>
  )
}

export default ProductCategory
