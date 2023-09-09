export interface Sublink {
  icon: JSX.Element
  route: string
  label: string
}

export interface LinkSidebar {
  link: {
    icon: JSX.Element
    route: string
    label: string
    sublinks: Sublink[] | null
  }
  className?: string
}
