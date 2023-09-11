export interface ProductDetails {
  id: string
  name: string
  referential_code?: string
  description: string
  price: number
  user_id?: string
  created_at: Date
}

export interface ProductForm {
  name: string
  referential_code?: string
  description: string
  price: number
}
