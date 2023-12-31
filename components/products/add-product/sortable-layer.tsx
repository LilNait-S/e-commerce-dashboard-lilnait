'use client'

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from '@dnd-kit/modifiers'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { type Dispatch, type ReactNode, type SetStateAction } from 'react'

export function SortableLayer({
  children,
  items,
  setItems,
  form,
}: {
  children: ReactNode
  items: any[]
  setItems: Dispatch<SetStateAction<any[]>>
  form: any
}) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id_local === active?.id)
        const newIndex = items.findIndex((item) => item.id_local === over?.id)

        form.setValue(
          'images',
          arrayMove(items, oldIndex, newIndex).map((imageData, index) => ({
            ...imageData,
            order: index + 1,
          }))
        )

        return arrayMove(items, oldIndex, newIndex).map((imageData, index) => ({
          ...imageData,
          order: index + 1,
        }))
      })
    }
  }
}
