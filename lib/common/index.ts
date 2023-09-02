import { toast } from 'react-hot-toast'

export const successNotify = ({ message }: { message: string }) =>
  toast.success(`${message}`)

export const errorNotify = ({ message }: { message: string }) =>
  toast.error(`${message}`)
