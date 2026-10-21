export type Variant = { name: string; price: number; maxExtras?: number; choiceAmount?: number }

export type Extra = { name: string; price: number; quantity: number }

export type MenuItem = {
  id: number | string       
  name: string
  price: number | null      
  category: string
  description: string
  image: string
  allowsExtras: boolean
  variants?: Variant[]
  choices?: string[]
}

export type OrderLine = {
  id: number | string
  item: MenuItem
  name: string
  basePrice: number
  quantity: number
  variant?: string
  extras?: Extra[]
  choices?: string[]
}

export type Pending = { 
  item: MenuItem
  variant?: Variant 
}

export type Card = {
    key: string
    item: MenuItem
    variant?: Variant
    price: number | null
    title: string
}