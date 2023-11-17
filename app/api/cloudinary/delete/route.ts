import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
})

export async function DELETE(req: Request) {
  if (req.method !== 'DELETE') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
  }

  const publicIds: string[] = await req.json()

  try {
    for (const publicId of publicIds) {
      await cloudinary.uploader.destroy(publicId, { invalidate: true })
      console.log(`image with public id: '${publicId}' deleted successfully`)
    }

    const responseMessage =
      publicIds.length === 1
        ? `Image with public ID '${publicIds[0]}' deleted successfully.`
        : `${publicIds.length} images deleted successfully.`

    return NextResponse.json({ message: responseMessage }, { status: 200 })
  } catch (error) {
    console.error('Error deleting images from Cloudinary:', error)
    return NextResponse.json(
      { error: 'Error deleting images from Cloudinary' },
      { status: 500 }
    )
  }
}
