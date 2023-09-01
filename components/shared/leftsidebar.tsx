'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { sidebarLinks } from '@/constants/sidebar-links'

const LeftSidebar = () => {
  const pathname = usePathname()

  return (
    <section className='leftsidebar'>
      <div className='flex w-full flex-1 flex-col gap-6 px-6'>
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route

          // if (link.route === '/profile') link.route = `${link.route}/${userId}`

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`leftsidebar_link ${isActive && 'bg-primary-500'}`}
            >
              <div className='inline-flex items-center'>{link.icon}</div>
              <p className='text-light-1 max-lg:hidden'>{link.label}</p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default LeftSidebar
