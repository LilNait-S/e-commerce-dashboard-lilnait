import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
})

export async function POST(request: Request) {
  const { ids } = await request.json()

  if (!ids) {
    return NextResponse.json(
      { message: 'ids of images is required' },
      { status: 400 }
    )
  }

  try {
    cloudinary.api
      .delete_resources(['ids'], { type: 'upload', resource_type: 'image' })
      .then(console.log)

    return NextResponse.json({ status: 200 })
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 500 })
  }
}
