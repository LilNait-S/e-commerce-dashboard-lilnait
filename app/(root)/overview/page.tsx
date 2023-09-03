'use client'

import { successNotify } from '@/lib/common/notifys'

const Page = () => {
  return (
    <div className='flex flex-col gap-3'>
     
      <button
        onClick={() => {
          successNotify({ message: 'hi' })
        }}
        className='bg-primary'
      >
        click me
      </button>
    </div>
  )
}

export default Page
