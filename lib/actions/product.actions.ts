import { supabase } from '@/lib/supabase'
import { errorNotify, successNotify } from '../common/notifys'
import {
  type SupabaseClient,
  type PostgrestSingleResponse,
} from '@supabase/supabase-js'
import {
  type ProductDetails,
  type ProductForm,
} from '@/components/products/types'

const isProduction = process.env.NODE_ENV === 'production'

interface Params {
  values: ProductForm
}

const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : 'http://localhost:3000'

export const fetchProducts = async ({
  supabaseServer,
}: {
  supabaseServer: SupabaseClient<any, 'public', any>
}) => {
  const { data: products, error }: PostgrestSingleResponse<ProductDetails[]> =
    await supabaseServer.from('products').select('*')

  if (error) {
    throw new Error('Products not found')
  }
  if (!products) {
    throw new Error('Products not found')
  }

  return { products }
}

export const getProductDetails = async ({
  id,
  supabaseServer,
}: {
  id: string
  supabaseServer: SupabaseClient<any, 'public', any>
}) => {
  const { data: products, error } = await supabaseServer
    .from('products')
    .select('*')
    .eq('id', id)

  if (error) {
    throw new Error('Product not found')
  }
  if (!products) {
    throw new Error('Product not found')
  }

  const product = products[0]

  return { product }
}

export const uploadImage = async (imagePath: string[]) => {

  try {
    const response = await fetch(`${serverUrl}/api/upload`, {
      method: 'POST',
      body: JSON.stringify({ paths: imagePath }),
    })

    return await response.json()
  } catch (e) {
    console.error('Error on uploadImage:', e)
    throw e
  }
}

export const createProduct = async ({ values }: Params) => {
  // const imagesURL = await uploadImage(values.images)
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user === null) return

    // const content = { ...values, user_id: user.id, images: imagesURL }
    const content = { ...values, user_id: user.id }

    const { error } = await supabase.from('products').insert([content])

    if (error != null) return errorNotify({ message: error?.message })
    successNotify({ message: 'Success when creating the product' })
  } catch (error: any) {
    throw new Error(`Failed to create product: ${error.message}`)
  }
}

export const deleteProduct = async ({ id }: { id: string }) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user === null) return

    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error != null) return errorNotify({ message: error?.message })
    successNotify({ message: 'Success when deleting the product' })
  } catch (error: any) {
    throw new Error(`Failed to delete product: ${error.message}`)
  }
}

export const deleteProducts = async ({ ids }: { ids: string[] }) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user === null) return

    const { error } = await supabase.from('products').delete().in('id', ids)
    if (error != null) return errorNotify({ message: error?.message })
    successNotify({ message: 'Success when deleting the product(s)' })
  } catch (error: any) {
    throw new Error(`Failed to delete product(s): ${error.message}`)
  }
}

export const updateProduct = async ({
  values,
  productId,
}: {
  values: ProductForm
  productId: string
}) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user === null) return

    const content = { ...values, user_id: user.id }

    const { error } = await supabase
      .from('products')
      .update(content)
      .eq('id', productId)

    if (error != null) return errorNotify({ message: error?.message })
    successNotify({ message: 'Success when editing the product' })
  } catch (error: any) {
    throw new Error(`Failed to editing product: ${error.message}`)
  }
}

export const fetchCategorys = async () => {
  const { data: categorys, error } = await supabase
    .from('categorys')
    .select('*')

  if (error) {
    throw new Error('Categorys not found')
  }
  if (!categorys) {
    throw new Error('Categorys not found')
  }

  return { categorys }
}