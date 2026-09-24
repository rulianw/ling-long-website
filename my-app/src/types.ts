export type Variant = { label: string; price: number }

export type MenuItem = {
  id: number | string
  name: string
  price: number | null
  category: string
  description: string
  variants?: Variant[]
  choices?: string[]
}

export type OrderLine = {
  key: string
  name: string
  price: number
  quantity: number
}