import { supabase } from '@/lib/supabase'
import { errorNotify, successNotify } from '../common/notifys'
import { type PostgrestResponse } from '@supabase/supabase-js'
import { type ProductValue } from '@/components/products/types'

const isProduction = process.env.NODE_ENV === 'production'

interface Params {
  values: ProductValue
}

const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : 'http://localhost:3000'

export const fetchProducts = async () => {
  const { data: products, error: productsError }: PostgrestResponse<any> =
    await supabase.from('products').select('*')

  if (productsError) {
    throw new Error(productsError.message)
  }

  const { data: variants, error: variantsError }: PostgrestResponse<any> =
    await supabase.from('variants').select('*')

  if (variantsError) {
    throw new Error(variantsError.message)
  }

  const combinedData = products.map((product) => ({
    ...product,
    variants: variants.filter((variant) => variant.product_id === product.id),
  }))

  if (!combinedData) {
    throw new Error('Products not found')
  }

  return { products: combinedData }
}

export const getProductDetails = async ({ id }: { id: string }) => {
  const { data: products, error } = await supabase
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

export const uploadImage = async (paths: string[]) => {
  try {
    const response = await fetch(`${serverUrl}/api/cloudinary/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paths),
    })

    return await response.json()
  } catch (e) {
    console.error('Error on uploadImage:', e)
    throw new Error('Error on uploadImage')
  }
}

export const createProduct = async ({ values }: Params) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user === null) {
      return errorNotify({ message: 'Needs a user id' })
    }

    const imagesURL = await uploadImage(values.images)

    if (!imagesURL) {
      return errorNotify({ message: "image upload error" })
    }

    const newContent = {
      user_id: user.id,
      name: values.name,
      slug: values.slug,
      referential_code: values.referential_code,
      description: values.description,
      images: imagesURL,
      categorys_id: +values.categorys_id,
    }
    const { data: products, error: productsError } = await supabase
      .from('products')
      .insert([newContent])
      .select()

    if (productsError != null) {
      return errorNotify({ message: productsError?.message })
    }

    const modifiedVariables = values.variants.map((object) => ({
      ...object,
      sizes_id: +object.sizes_id,
      available_quantity:
        object.available_quantity === 0 ? null : object.available_quantity,
      price_offer: object.price_offer === 0 ? null : object.price_offer,
      product_id: products[0].id,
    }))

    const { error: variantsError } = await supabase
      .from('variants')
      .insert(modifiedVariables)

    if (variantsError) {
      console.error('Error inserting variants into the database', variantsError)
    }

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
  values: ProductValue
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
    .select('id, category_name')

  if (error) {
    throw new Error('Categorys not found')
  }
  if (!categorys) {
    throw new Error('Categorys not found')
  }

  return { categorys }
}
