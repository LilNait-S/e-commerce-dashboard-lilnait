import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import { type LinkSidebar, type Sublink } from './types.d'

const AccordionCustom = ({ link, className }: LinkSidebar) => {
  return (
    <>
      {link.sublinks === null ? (
        <AccordionItem value={link.label} className='border-b-0 mb-2'>
          <Link
            href={link.route}
            className={`w-full !justify-start ${className} ${buttonVariants({
              variant: 'ghost',
            })}`}
          >
            {link.icon}
            <span className='px-3'>{link.label}</span>
          </Link>
        </AccordionItem>
      ) : (
        <AccordionItem value={link.label} className='border-b-0 mb-2'>
          <AccordionTrigger
            className={`w-full !justify-between hover:no-underline ${className} ${buttonVariants(
              {
                variant: 'ghost',
              }
            )}`}
          >
            <div className='inline-flex'>
              {link.icon}
              <span className='px-3'>{link.label}</span>
            </div>
          </AccordionTrigger>
          {link.sublinks?.map(({ label, icon, route }: Sublink) => {
            return (
              <AccordionContent key={label} className='!p-0'>
                <Link
                  href={route}
                  className={`w-full !justify-start mt-2 ${buttonVariants({
                    variant: 'ghost',
                  })}`}
                >
                  {icon}
                  <span className='px-3'>{label}</span>
                </Link>
              </AccordionContent>
            )
          })}
        </AccordionItem>
      )}
    </>
  )
}

export default AccordionCustom
