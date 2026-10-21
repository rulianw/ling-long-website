import { useState } from 'react'
import type { MenuItem, OrderLine, Variant, Extra, Pending } from '../types'
import { getMaxExtras } from '../utils/extras.ts'
export function useOrder( ) {
    const [order, setOrder] = useState<OrderLine[]>([])
    const [pendingItem, setPendingItem] = useState<Pending | null>(null)

    function addToOrder(newItem: MenuItem, variant?: Variant, extras?: Extra[], choices?: string[]) {
        const name = variant
            ? `${newItem.name} - ${variant.name}`
            : newItem.name

        const basePrice = variant?.price ?? newItem.price ?? 0

        //ID based on the dish + variant + extras + choices
        const selectedExtras = (extras ?? []).map((extra) => ({
            ...extra,
            quantity: 1,
        }))

        const extrasKey = selectedExtras
            .map((extra) => extra.name)
            .sort()
            .join('+')

        const choicesKey = (choices??[])
            .sort()
            .join('+')

        const id = [
            newItem.id,
            variant?.name,
            extrasKey,
            choicesKey,
        ]
            .filter(Boolean)
            .join('-')

        setOrder((prevOrder) => {
            const existingItem = prevOrder.find(
                (item) => item.id === id
            )

            if (existingItem) {
                return prevOrder.map((item) =>
                    item.id === id
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                            extras: item.extras?.map((extra) => ({
                                ...extra,
                                quantity: extra.quantity + 1,
                            })),
                        }
                        : item
                )
            }

            return [
                ...prevOrder,
                {
                    id,
                    item: newItem,
                    name,
                    basePrice,
                    quantity: 1,
                    variant: variant?.name,
                    extras: selectedExtras,
                    choices
                },
            ]
        })
    }

    // Increases or decreases selected item
    function changeQuantity(itemId: number | string, delta: number) {
        const orderItem = order.find(
            (item) => item.id === itemId
        )
        if (!orderItem) return

        if (delta === 1) {
            const menuItem = orderItem.item

            const variant = orderItem.variant
                ? menuItem.variants?.find(
                    (v) => v.name === orderItem.variant
                )
                : undefined
            
            //if the item has extras, open extras selection
            if (getMaxExtras(menuItem, variant) !== -1) {
                // setSelectedExtras([])

                setPendingItem({
                    item: menuItem,
                    variant: variant,
                })
                return
            }
        }

        setOrder((prevOrder) => {
            return prevOrder
                .map((item) => {
                    if (item.id !== itemId) {
                        return item
                    }

                    const newQuantity =
                        item.quantity + delta


                    const newExtras = item.extras
                        ?.map((extra) => ({
                            ...extra,
                            quantity:
                                extra.quantity + delta,
                        }))
                        .filter(
                            (extra) => extra.quantity > 0
                        )


                    return {
                        ...item,
                        quantity: newQuantity,
                        extras: newExtras,
                    }
                })
                .filter((item) => item.quantity > 0)
        })
    }

    return {
        order,
        pendingItem,
        setPendingItem,
        addToOrder,
        changeQuantity,
    }
}
