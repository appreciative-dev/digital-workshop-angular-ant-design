interface MenuOption {
  title?: string
  icon?: string
  link?: string
  roles?: string[]
}

export const MENU_OPTIONS: Array<MenuOption> = [
  {
    title: 'Clients',
    icon: 'meh',
    link: 'clients',
  },
  {
    title: 'Spares',
    icon: 'shopping-cart',
    link: 'spares',
  },
  {
    title: 'Orders',
    icon: 'car',
    link: 'orders',
  },
]

export const CLIENT_MENU_OPTIONS: Array<MenuOption> = [
  {
    title: 'Info',
    icon: 'info',
    link: 'info',
  },
]
