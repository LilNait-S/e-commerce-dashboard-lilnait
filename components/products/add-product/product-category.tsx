import { Label } from '@/components/ui/label'
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
  category: string
  created_at: string
}

const ProductCategory = () => {
  const [category, setCategory] = useState<Category[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const { categorys } = await fetchCategorys()
      setCategory(categorys || [])
    }
    fetchData()
  }, [])

  return (
    <section>
      <h2 className='sub-title-product'>Organize</h2>
      <div className='flex justify-between mb-3'>
        <Label>Category</Label>
        <Link
          href='/'
          className={`text-purple-500 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70`}
        >
          Add new category
        </Link>
      </div>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder='Select a category' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Categories</SelectLabel>
            {category?.map(({ category, id }) => (
              <SelectItem key={id} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </section>
  )
}

export default ProductCategory
