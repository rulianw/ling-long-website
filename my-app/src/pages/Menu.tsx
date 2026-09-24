import { useState } from 'react'
import menuData from '../data/menu.json'
import MenuClicker from '../components/MenuClicker'
import { formatPrice } from '../utils/formatPrice'
import type { MenuItem, OrderLine } from '../types'

const items = menuData.items as MenuItem[]

export default function Menu() {
    const [order, setOrder] = useState<OrderLine[]>([])

    function addToOrder(key: string, name: string, price: number){

    }
    
    function changeQuantity(key: string, delta: number){

    }

    const totalCents = 
}