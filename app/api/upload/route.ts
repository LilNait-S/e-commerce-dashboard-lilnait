import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
})

export async function POST(request: Request) {
  const { paths } = await request.json()

  if (!paths) {
    return NextResponse.json(
      { message: 'Image path is required' },
      { status: 400 }
    )
  }

  try {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      transformation: [{ aspect_ratio: '1:1', height: 1100, crop: 'fill' }],
    }

    const urlImages = []

    for (const path of paths) {
      const result = await cloudinary.uploader.upload(path, options)
      urlImages.push(result)
    }

    return NextResponse.json(urlImages, { status: 200 })
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 500 })
  }
}