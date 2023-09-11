import { supabase } from '@/lib/supabase'
import { errorNotify, successNotify } from '../common/notifys'
import { type PostgrestSingleResponse } from '@supabase/supabase-js'
import {
  type ProductDetails,
  type ProductForm,
} from '@/components/products/types'

interface Params {
  values: ProductForm
}

export const fetchProducts = async () => {
  const { data: products }: PostgrestSingleResponse<ProductDetails[]> =
    await supabase.from('products').select('*')

  if (!products) return { products: [] }

  return { products }
}

export const createProduct = async ({ values }: Params) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user === null) return
    const content = { ...values, user_id: user.id }

    const { error } = await supabase.from('products').insert([content])

    if (error != null) return errorNotify({ message: error?.message })
    successNotify({ message: 'Success when creating the product' })
  } catch (error: any) {
    throw new Error(`Failed to create product: ${error.message}`)
  }
}

export const deleteProduct = async ({ ids }: { ids: ProductDetails[] }) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user === null) return

    const { error } = await supabase.from('products').delete().in('id', ids)
    console.log(error)
  } catch (error: any) {
    throw new Error(`Failed to delete product(s): ${error.message}`)
  }
}
