export interface ProductColumns {
  id: string
  user_id: string
  name: string
  slug: string
  referential_code?: string | null
  description: string
  categorys_id: string
  created_at: string
  images: string[]
  variants: variants[]
}

export interface ProductValue {
  name: string
  slug: string
  referential_code?: string | null
  description: string
  images: string[]
  categorys_id: string
  variants: variants[]
}

export interface variants {
  in_stock: boolean
  sizes_id: string
  price_size: number
  available_quantity?: number | null
  price_offer?: number | null
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

export interface FileObjectImage {
  id: number
  name: string
  preview: string
}
