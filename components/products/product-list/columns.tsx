'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'

import { Pencil2Icon } from '@radix-ui/react-icons'

import { Checkbox } from '@/components/ui/checkbox'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { type ProductColumns } from '@/components/products/types'
import { DataTableColumnHeader } from '@/components/products/product-list/datatable-column-header'
import Link from 'next/link'
import DeleteRow from './delete-row'
import { Label } from '@radix-ui/react-label'
import { sizesVariant } from '@/constants/products'

export const columns: ColumnDef<ProductColumns>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Label className='p-2'>
        <Checkbox
          className='!mt-[6px]'
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value)
          }}
          aria-label='Select all'
        />
      </Label>
    ),
    cell: ({ row }) => (
      <Label className='p-2'>
        <Checkbox
          className='!mt-[6px]'
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value)
          }}
          aria-label='Select row'
        />
      </Label>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
  },
  {
    accessorKey: 'referential_code',
    header: 'Referential code',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  // {
  //   accessorKey: 'price',
  //   header: () => <div className='text-right'>Price</div>,
  //   cell: ({ row }) => {
  //     const amount = parseFloat(row.getValue('price'))
  //     const formatted = new Intl.NumberFormat('en-US', {
  //       style: 'currency',
  //       currency: 'USD',
  //     }).format(amount)

  //     return <div className='text-right font-medium'>{formatted}</div>
  //   },
  // },
  {
    accessorKey: 'Sizes',
    header: 'Sizes',
    cell: ({ row }) => {
      const product = row.original

      const filteredSizes = sizesVariant.filter((size) =>
        product.variants.some(
          (variant) => variant.sizes_id.toString() === size.value
        )
      )
      return (
        <div className='flex -space-x-2 items-center'>
          {filteredSizes.map((size) => (
            <div
              key={size.value}
              className='flex items-center justify-center bg-secondary rounded-full h-8 w-8 border-2 border-card'
            >
              <span>{size.acronym}</span>
            </div>
          ))}
        </div>
      )
    },
  },
  {
    accessorKey: 'images',
    header: 'Images',
    cell: ({ row }) => {
      const product = row.original

      console.log('product', product)
      return (
        <div className='flex -space-x-2 items-center'>
          {product.images?.slice(0, 3).map((image, i) => (
            <img
              key={i}
              src={image.secure_url}
              className='rounded-full'
              width={25}
              height={25}
            />
          ))}

          {product.images.length > 3 ? (
            <div className='flex items-center justify-center bg-secondary rounded-full h-7 w-7'>
              +{product.images.length - 3}
            </div>
          ) : null}
        </div>
      )
    },
  },
  {
    id: 'actions',
    header: () => <div className='text-center'>Actions</div>,
    cell: ({ row }) => {
      const product = row.original
      return (
        <div className='text-center font-medium flex items-center justify-center'>
          <Link
            href={`/products/edit-product/${product.id}`}
            className={`h-8 w-8 !p-0 ${buttonVariants({ variant: 'ghost' })}`}
          >
            <span className='sr-only'>Edit product</span>
            <Pencil2Icon className='h-4 w-4' />
          </Link>
          <DeleteRow id={product.id} imgsData={product.images} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(product.id)
                }}
              >
                Copy product ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
