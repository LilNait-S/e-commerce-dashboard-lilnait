'use client'

import { usePathname } from 'next/navigation'
import { sidebarLinks } from '@/constants/sidebar-links'
import { Accordion } from '../ui/accordion'
import AccordionCustom from '../accordion-custom'

const LeftSidebar = () => {
  
  const pathname = usePathname()

  return (
    <section className='leftsidebar'>
      <div className='flex w-full flex-1 flex-col gap-6 px-6'>
        <Accordion type='single' collapsible className='w-full gap-2'>
          {sidebarLinks.map(({ link }) => {
            const isActive =
              (pathname.includes(link.route) && link.route.length > 1) ||
              pathname === link.route

            // if (link.route === '/profile') link.route = `${link.route}/${userId}`
            return (
              <AccordionCustom
                key={link.label}
                link={link}
                className={`${isActive && 'bg-primary'}`}
              />
            )
          })}
        </Accordion>
      </div>
    </section>
  )
}

export default LeftSidebar
