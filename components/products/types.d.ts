export interface ProductDetails {
  id: string
  user_id: string
  name: string
  slug: string
  referential_code?: string | null
  description: string
  categorys_id: string
  created_at: string
  images: [string, ...string[]]
  variables: {
    in_stock: boolean
    size_id: string
    price_product: number
    available_quantity?: number
    offer_price?: number
  }[]
}

export interface ProductForm {
  name: string
  slug: string
  referential_code?: string | null
  description: string
  images: [string, ...string[]]
  categorys_id: string
  variables: {
    in_stock: boolean
    size_id: string
    price_product: number
    available_quantity?: number
    offer_price?: number
  }[]
}

export interface Sizes {
  id: number
  size: string
  approx_size: string
}
