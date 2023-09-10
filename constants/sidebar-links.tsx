import {
  AnalyticsIcon,
  BannersIcon,
  CustomersIcon,
  DotIcon,
  EcommerceIcon,
  MessagesIcon,
  OrdersIcon,
  OverviewIcon,
  ProductsIcon,
  ProfileIcon,
} from '@/components/icons'
import { type LinkSidebar } from '@/components/types'

export const sidebarLinksTop: LinkSidebar[] = [
  {
    link: {
      icon: <OverviewIcon />,
      route: '/',
      label: 'Overview',
      sublinks: null,
    },
  },
  {
    link: {
      icon: <AnalyticsIcon />,
      route: '/analytics',
      label: 'Analytics',
      sublinks: null,
    },
  },
  {
    link: {
      icon: <EcommerceIcon />,
      route: '/ecommerce',
      label: 'E-commerce',
      sublinks: null,
    },
  },
  {
    link: {
      icon: <ProfileIcon />,
      route: '/profile',
      label: 'Profile',
      sublinks: null,
    },
  },
]

export const sidebarLinksBottom: LinkSidebar[] = [
  {
    link: {
      icon: <CustomersIcon />,
      route: '/customers',
      label: 'Customers',
      sublinks: null,
    },
  },
  {
    link: {
      icon: <ProductsIcon />,
      route: '/products',
      label: 'Products',
      sublinks: [
        {
          icon: <DotIcon />,
          route: '/products/add-product',
          label: 'Add Product',
        },
        {
          icon: <DotIcon />,
          route: '/products/product-list',
          label: 'Product list',
        },
        {
          icon: <DotIcon />,
          route: '/products/category-list',
          label: 'Category list',
        },
      ],
    },
  },
  {
    link: {
      icon: <OrdersIcon />,
      route: '/orders',
      label: 'Orders',
      sublinks: null,
    },
  },
  {
    link: {
      icon: <BannersIcon />,
      route: '/banners',
      label: 'Banners',
      sublinks: null,
    },
  },
  {
    link: {
      icon: <MessagesIcon />,
      route: '/messages',
      label: 'Messages',
      sublinks: null,
    },
  },
]
