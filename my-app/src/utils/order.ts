import { getMaxExtras } from '../utils/extras'
import type { Extra, MenuItem, Variant } from "../types"

//Checks if item is already in order, if so increase quantity, else add to order
export function addToOrder(newItem: MenuItem, variant?: Variant, extras?: Extra[]) {
    const name = variant
        ? `${newItem.name} - ${variant.name}`
        : newItem.name

    const basePrice = variant?.price ?? newItem.price ?? 0

    //ID based on the dish + variant + extras
    const selectedExtras = (extras ?? []).map((extra) => ({
        ...extra,
        quantity: 1,
    }))

    const extrasKey = selectedExtras
        .map((extra) => extra.name)
        .sort()
        .join('+')

    const id = [
        newItem.id,
        variant?.name,
        extrasKey,
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
            },
        ]
    })

    setSelectedExtras([])
    setPendingItem(null)
}

// Increases or decreases selected item
export function changeQuantity(itemId: number | string, delta: number) {
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
            setSelectedExtras([])

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