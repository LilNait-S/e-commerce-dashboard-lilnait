import {
  AnalitycsIcon,
  BannersIcon,
  ClientsIcon,
  EcommerceIcon,
  MessagesIcon,
  OrdersIcon,
  OverviewIcon,
  ProductsIcon,
  ProfileIcon,
} from '@/components/icons'

export const sidebarLinks = [
  {
    icon: <OverviewIcon />,
    route: '/',
    label: 'Overview',
  },
  {
    icon: <AnalitycsIcon />,
    route: '/analytics',
    label: 'Analytics',
  },
  {
    icon: <EcommerceIcon />,
    route: '/ecommerce',
    label: 'E-commerce',
  },
  {
    icon: <ProfileIcon />,
    route: '/my-profile',
    label: 'Profile',
  },
  {
    icon: <ClientsIcon />,
    route: '/clients',
    label: 'Clients',
  },
  {
    icon: <ProductsIcon />,
    route: '/products',
    label: 'Products',
  },
  {
    icon: <OrdersIcon />,
    route: '/orders',
    label: 'Orders',
  },
  {
    icon: <BannersIcon />,
    route: '/banners',
    label: 'Banners',
  },
  {
    icon: <MessagesIcon />,
    route: '/messages',
    label: 'Messages',
  },
]
