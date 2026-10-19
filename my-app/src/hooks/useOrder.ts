import { useState } from 'react'
import type { OrderLine } from '../types'
import { addToOrder , changeQuantity } from '../utils/order'
export function useOrder() {
    const [order, setOrder] = useState<OrderLine[]>([])

    // Define addToOrder() here
    // Define changeQuantity() here

    return {
        order,
        addToOrder,
        changeQuantity,
    }
}
