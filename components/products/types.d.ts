export interface ProductDetails {
  id: string
  user_id: string
  name: string
  slug: string
  referential_code?: string | null
  description: string
  categorys_id: string
  created_at: string
  images: File[] | string[]
  thumbnail?: string[]
  variants: {
    in_stock: boolean
    sizes_id: number
    price_size: number
    available_quantity?: number | null
    price_offer?: number | null
  }[]
}

export interface ProductForm {
  name: string
  slug: string
  referential_code?: string | null
  description: string
  images: File[]
  categorys_id: string
  variants: {
    in_stock: boolean
    sizes_id: string
    price_size: number
    available_quantity?: number | null
    price_offer?: number | null
  }[]
}

export interface Products {
  id: string
  created_at: string
  description: string
  user_id: string
  name: string
  referential_code?: string | null
  categorys_id: number
  slug: string
  images: string[]
}

export interface Sizes {
  id: number
  size: string
  approx_size: string
}
