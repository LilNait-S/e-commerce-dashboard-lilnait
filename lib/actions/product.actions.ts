import { supabase } from '@/lib/supabase'
import { errorNotify, successNotify } from '../common/notifys'
import { type PostgrestResponse } from '@supabase/supabase-js'
import {
  type variants,
  type imagesDB,
  type ProductValue,
} from '@/components/products/types'

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

  const { data: images, error: imagesError }: PostgrestResponse<any> =
    await supabase.from('images').select('*')

  if (imagesError) {
    throw new Error(imagesError.message)
  }

  const combinedData = products.map((product) => ({
    ...product,
    variants: variants.filter((variant) => variant.product_id === product.id),
    images: images.filter((image) => image.product_id === product.id),
  }))

  if (!combinedData) {
    throw new Error('Products not found')
  }

  return { products: combinedData }
}

export const getProductDetails = async ({ id }: { id: string }) => {
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)

  if (productsError) {
    throw new Error('Product not found')
  }

  if (!products) {
    throw new Error('Product not found')
  }

  const { data: variants, error: variantsError }: PostgrestResponse<any> =
    await supabase.from('variants').select('*').eq('product_id', id)

  if (variantsError) {
    throw new Error(variantsError.message)
  }

  const { data: images, error: imagesError }: PostgrestResponse<any> =
    await supabase.from('images').select('*').eq('product_id', id)

  if (imagesError) {
    throw new Error(imagesError.message)
  }

  const combinedData = {
    ...products[0],
    variants: [
      ...variants.map((variant) => ({
        ...variant,
        sizes_id: variant.sizes_id.toString(),
      })),
    ],
    images,
  }

  return { product: combinedData }
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

    const productContent = {
      user_id: user.id,
      name: values.name,
      slug: values.slug,
      referential_code: values.referential_code,
      description: values.description,
      categorys_id: +values.categorys_id,
    }

    const { data: products, error: productsError } = await supabase
      .from('products')
      .insert([productContent])
      .select()

    if (productsError != null) {
      return errorNotify({ message: productsError?.message })
    }

    /* -------- images --------- */

    const dataImages = values.images.map(({ id_local, ...rest }) => ({
      ...rest,
      product_id: products[0].id,
    }))

    const { error: imagesError } = await supabase
      .from('images')
      .insert(dataImages)

    if (imagesError) {
      console.error('Error insert images into the database', imagesError)
    }

    /* -------- images --------- */

    const newVariants = values.variants.map((object) => ({
      ...object,
      sizes_id: +object.sizes_id,
      product_id: products[0].id,
    }))

    const { error: variantsError } = await supabase
      .from('variants')
      .insert(newVariants)

    if (variantsError) {
      console.error('Error insert variants into the database', variantsError)
    }

    successNotify({ message: 'Success when creating the product' })
  } catch (error: any) {
    throw new Error(`Failed to create product: ${error.message}`)
  }
}

export const deleteImagesCloudinary = async (publicIds: string[]) => {
  try {
    const response = await fetch(`${serverUrl}/api/cloudinary/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(publicIds),
    })

    return await response.json()
  } catch (e) {
    console.error('Error on delete images:', e)
    throw new Error('Error on delete images')
  }
}

export const deleteImagesDB = async (ids: number[]) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user === null) return

    const { error } = await supabase.from('images').delete().in('id', ids)

    if (error != null) return errorNotify({ message: error?.message })

    successNotify({ message: 'Success when deleting the images on db' })
  } catch (error: any) {
    throw new Error(`Failed to delete product(s): ${error.message}`)
  }
}

export const deleteProduct = async ({
  id,
  imgsData,
}: {
  id: string
  imgsData: imagesDB[]
}) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user === null) return

    const publicIds = imgsData.map((id) => id.public_id)
    const { error: ErrorCloudinary } = await deleteImagesCloudinary(publicIds)
    if (ErrorCloudinary) {
      return errorNotify({ message: ErrorCloudinary?.message })
    }

    const { error: errorProducts } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
    if (errorProducts != null) {
      return errorNotify({ message: errorProducts?.message })
    }

    successNotify({ message: 'Success when deleting the product' })
  } catch (error: any) {
    throw new Error(`Failed to delete product: ${error.message}`)
  }
}

export const deleteProducts = async ({
  ids,
  publicIds,
}: {
  ids: string[]
  publicIds: string[]
}) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user === null) return

    const { error: ErrorCloudinary } = await deleteImagesCloudinary(publicIds)
    if (ErrorCloudinary) {
      return errorNotify({ message: ErrorCloudinary?.message })
    }

    const { error } = await supabase.from('products').delete().in('id', ids)
    if (error != null) return errorNotify({ message: error?.message })
    successNotify({ message: 'Success when deleting the products' })
  } catch (error: any) {
    throw new Error(`Failed to delete product(s): ${error.message}`)
  }
}

export const updateProduct = async ({
  values,
  productId,
  deletedIds,
  variantsNotInDB,
  variantsInDB,
}: {
  values: ProductValue
  productId: string
  deletedIds?: string[]
  variantsNotInDB?: variants[]
  variantsInDB?: variants[]
}) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user === null) {
      return errorNotify({ message: 'Needs a user id' })
    }

    const productContent = {
      user_id: user.id,
      name: values.name,
      slug: values.slug,
      referential_code: values.referential_code,
      description: values.description,
      categorys_id: +values.categorys_id,
    }

    const { error: productsError } = await supabase
      .from('products')
      .update(productContent)
      .eq('id', productId)

    if (productsError != null) {
      return errorNotify({ message: productsError?.message })
    }

    /* -------- images --------- */

    const dataImages = values.images.map(
      ({ id_local, product_id, ...rest }) => rest
    )

    const imgsNotInDB = dataImages
      .filter(({ id }) => !id)
      .map((obj) => ({ product_id: productId, ...obj }))

    const { error: imagesError } = await supabase
      .from('images')
      .insert(imgsNotInDB)

    if (imagesError) {
      console.error('Error inserting images into the database', imagesError)
    }

    /* -------- images --------- */

    if (deletedIds) {
      await deleteVariantsDB({ ids: deletedIds })
    }

    if (variantsNotInDB) {
      const newVariantsUpdate = variantsNotInDB.map((object) => ({
        ...object,
        sizes_id: +object.sizes_id,
        product_id: productId,
      }))

      const { error: insertVariantsError } = await supabase
        .from('variants')
        .insert(newVariantsUpdate)

      if (insertVariantsError) {
        console.error(
          'Error insert variants into the database',
          insertVariantsError
        )
      }
    }

    if (variantsInDB) {
      const variantLast = variantsInDB.map((obj) => ({
        ...obj,
        product_id: productId,
      }))
      const { error: variantsErrorUpdated } = await supabase
        .from('variants')
        .upsert(variantLast)

      if (variantsErrorUpdated) {
        console.error(
          'Error upsert variants into the database',
          variantsErrorUpdated
        )
      }
    }

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

export const deleteVariantsDB = async ({ ids }: { ids: string[] }) => {
  try {
    const { error } = await supabase.from('variants').delete().in('id', ids)
    if (error != null) return errorNotify({ message: error?.message })
    successNotify({ message: 'Success when deleting the variants' })
  } catch (error: any) {
    throw new Error(`Failed to delete product(s): ${error.message}`)
  }
}
