import { toast } from 'react-hot-toast'

export const successNotify = ({ message }: { message: string }) =>
  toast.success(`${message}`, {
    style: {
      background: 'var(--background)',
      color: 'var(--foreground)',
    },
  })

export const errorNotify = ({ message }: { message: string }) =>
  toast.error(`${message}`, {
    style: {
      background: 'var(--background)',
      color: 'var(--foreground)',
    },
  })
