export type Variant = { label: string; price: number }

export type MenuItem = {
  id: number 
  name: string
  price: number
  category: string
  description: string
  variants?: Variant[]
  choices?: string[]
}

export type OrderLine = {
  id: number
  name: string
  price: number
  quantity: number
}