export interface ProductDetails {
  id: string
  user_id: string
  name: string
  slug: string
  referential_code: string | null
  description: string
  categorys_id: number
  created_at: string
  inventory_id?: string
  media: string
  tags_id: number
}

export interface ProductForm {
  name: string
  slug: string
  referential_code?: string | null
  description: string
  media: string | string[]
  categorys_id?: number
  tags_id?: number | number[] 
  inventory_id?: string | string[]
}


export interface Sizes {
  id: number
  size: string
  approx_size: string
}