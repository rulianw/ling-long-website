import { createContext, type ReactNode } from 'react'
import { useOrder } from '../hooks/useOrder'

type OrderApi = ReturnType<typeof useOrder>

export const OrderContext = createContext<OrderApi | null>(null)

export default function OrderProvider({ children } : { children: ReactNode }) {
    const order = useOrder();

    return (
        <OrderContext.Provider value={order}>
            {children}
        </OrderContext.Provider>
    )
}
