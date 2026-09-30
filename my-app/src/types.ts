export type Variant = { label: string; price: number; maxExtras?: number }

export type Extra = { name: string; price: number }

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
  name: string
  price: number              
  quantity: number
  variant?: string           
  extras?: Extra[]
}