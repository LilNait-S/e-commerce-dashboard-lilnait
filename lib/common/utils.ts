import { MAX_FILE_SIZE } from '@/constants/products'
import { errorNotify } from './notifys'

export const textToSlug = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .slice(0, 50)
}

export const areBase64Images = (imagesData: string[]) => {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/

  return imagesData.every((imageData) => base64Regex.test(imageData))
}

export const readFileAsDataURL = async (file: File): Promise<string> => {
  return await new Promise((resolve) => {
    const fileReader = new FileReader()
    fileReader.onload = () => {
      resolve(fileReader.result as string)
    }
    fileReader.readAsDataURL(file)
  })
}

export const processImage = async (file: File): Promise<string | null> => {
  if (!file.type.includes('image')) {
    errorNotify({
      message: `The file ${file.name} is not a valid image.`,
    })
    return null
  }

  if (file.size > MAX_FILE_SIZE) {
    errorNotify({
      message: `The image ${file.name} is too large. Maximum 2MB allowed.`,
    })
    return null
  }

  const preview = await readFileAsDataURL(file)
  return preview
}
