/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'

import { type ReactNode } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { GripVertical, X } from 'lucide-react'

export function SortableItem({
  id,
  id_local,
  children,
  name,
  onRemove,
  dragOverlay = true,
  asChild,
  itemsLength,
  ...props
}: {
  id: number
  id_local: number
  children: ReactNode
  name: string
  className?: string
  onRemove?: (id_local: string, id: number) => void
  dragOverlay?: boolean
  asChild?: boolean
  itemsLength: number
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    isSorting,
    isDragging,
    transform,
    transition,
    setActivatorNodeRef,
  } = useSortable({ id: id_local })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      className={cn(
        props.className,
        'flex cursor-auto items-center justify-between shadow-md'
      )}
      style={style}
      {...attributes}
    >
      <div className='flex flex-row items-center'>
        {itemsLength > 1 && (
          <Button
            type='button'
            ref={setActivatorNodeRef}
            size='icon'
            className='h-8 w-8 cursor-grab active:cursor-grabbing'
            variant='ghost'
            {...listeners}
          >
            <GripVertical className='h-5 w-5' />
          </Button>
        )}
        <div className='flex flex-row items-center'>{children}</div>
      </div>
      <div className='flex items-center gap-1'>
        {onRemove && (
          <Button
            type='button'
            size='icon'
            variant='ghost'
            onClick={() => {
              onRemove(name, id)
            }}
            className={cn(
              isSorting
                ? 'opacity-0'
                : 'opacity-100 md:opacity-0 md:group-hover:opacity-100',
              'h-8 w-8 '
            )}
          >
            <X className='h-5 w-5' />
          </Button>
        )}
      </div>
    </div>
  )
}
