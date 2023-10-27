export interface ProductDetails {
  id: string
  user_id: string
  name: string
  slug: string
  referential_code?: string | null
  description: string
  categorys_id: string
  created_at: string
  images: string[]
}

export interface ProductForm {
  name: string
  slug: string
  referential_code?: string | null
  description: string
  images: string[]
  categorys_id: string
}

export interface Sizes {
  id: number
  size: string
  approx_size: string
}
