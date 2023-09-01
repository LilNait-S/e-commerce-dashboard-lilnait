import {
  AnalyticsIcon,
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
    icon: <AnalyticsIcon />,
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
    route: '/profile',
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
