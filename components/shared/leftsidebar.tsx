'use client'

import { usePathname } from 'next/navigation'
import { sidebarLinksBottom, sidebarLinksTop } from '@/constants/sidebar-links'
import { Accordion } from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'
import AccordionCustom from '../accordion-custom'

const LeftSidebar = () => {
  const pathname = usePathname()

  return (
    <section className='leftsidebar'>
      <div className='flex w-full flex-1 flex-col gap-3 px-6'>
        <Accordion type='single' collapsible className='w-full gap-2'>
          {sidebarLinksTop.map(({ link }) => {
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
        <Separator />
        <Accordion type='single' collapsible className='w-full gap-2'>
          {sidebarLinksBottom.map(({ link }) => {
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
