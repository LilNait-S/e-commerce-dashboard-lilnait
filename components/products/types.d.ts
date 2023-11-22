export interface ProductColumns {
  id: string
  user_id: string
  name: string
  slug: string
  referential_code?: string | null
  description: string
  categorys_id: string
  created_at: string
  images: imagesDB[]
  variants: variants[]
}

export interface ProductValue {
  name: string
  slug: string
  referential_code?: string | null
  description: string
  images: imagesDB[]
  categorys_id: string
  variants: variants[]
}

export interface imagesDB {
  id?: number
  created_at: Date
  asset_id: string
  public_id: string
  format: string
  tags?: string[]
  type: string
  url: string
  secure_url: string
  folder: string
  product_id: string
  order: number
  id_local?: number
}

export interface variants {
  id?: string
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
