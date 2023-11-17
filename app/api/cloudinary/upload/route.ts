import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
})

export async function POST(req: Request) {
  const paths = await req.json()

  if (!paths) {
    return NextResponse.json(
      { error: 'Image paths are required' },
      { status: 400 }
    )
  }

  try {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      transformation: [{ aspect_ratio: '1:1', height: 1100, crop: 'fill' }],
      folder: 'aini28',
    }

    const dataImages = []

    for (const path of paths) {
      try {
        const res = await cloudinary.uploader.upload(path, options)
        dataImages.push(res)
      } catch (uploadError) {
        console.error('Error al subir una imagen a Cloudinary:', uploadError)
        return NextResponse.json(
          { error: 'Error al subir imágenes a Cloudinary' },
          { status: 500 }
        )
      }
    }

    return NextResponse.json(dataImages, { status: 200 })
  } catch (error) {
    console.error('Error en la API de carga de imágenes:', error)
    return NextResponse.json(
      { error: 'Error en la API de carga de imágenes' },
      { status: 500 }
    )
  }
}
