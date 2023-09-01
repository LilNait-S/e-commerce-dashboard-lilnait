import { type ReactNode } from 'react'
import Topbar from './topbar'
import LeftSidebar from './leftsidebar'

const LayoutBar = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Topbar />
      <main className='flex flex-row'>
        <LeftSidebar />
        <section className='main-container'>
          <div className='w-full max-w-4xl'>{children}</div>
        </section>
      </main>
    </>
  )
}

export default LayoutBar
