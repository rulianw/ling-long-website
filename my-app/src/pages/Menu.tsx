import { useState } from 'react'
import menuData from '../data/menu.json'
import type { MenuItem, OrderLine, Extra, Variant } from '../types'

const items = menuData.items as MenuItem[]
const extras = menuData.extras.items as Extra[]

export default function Menu() {
    type Pending = { item: MenuItem; variant?: Variant }

    const [pending, setPending] = useState<Pending | null>(null)
    const [order, setOrder] = useState<OrderLine[]>([])

    const totalPrice = convertToEuro(
        order.reduce((total, x) => total + x.price * x.quantity, 0)
    )

    function convertToEuro(number: number) {
        return new Intl.NumberFormat('nl-NL', {
            style: 'currency',
            currency: 'EUR',
        }).format(number)
    }

    function handleAdd(item: MenuItem, variant?: Variant) {
        if (getMaxExtras(item, variant) > 0) {
            setPending({ item, variant })
        } else {
            addToOrder(item, variant)
        }
    }

    function getMaxExtras(item: MenuItem, variant?: Variant): number {
        return variant?.maxExtras ?? (item.allowsExtras ? 1 : 0)
    }

    // Add new item into the order.
    // If it already exists, increase quantity.
    // Otherwise add a new item to the order array.
    function addToOrder(newItem: MenuItem, variant?: Variant) {
        const id = variant
            ? `${newItem.id}-${variant.label}`
            : newItem.id

        const name = variant
            ? `${newItem.name} - ${variant.label}`
            : newItem.name

        const price = variant
            ? variant.price
            : newItem.price

        const foundItem = order.find((item) => item.id === id)

        if (foundItem) {
            setOrder(
                order.map((item) => {
                    if (item.id === id) {
                        return {
                            ...item,
                            quantity: item.quantity + 1,
                        }
                    }

                    return item
                })
            )
        } else {
            setOrder([
                ...order,
                {
                    id,
                    name,
                    price,
                    quantity: 1,
                },
            ])
        }
    }

    // Checks boolean:
    // true = increase quantity
    // false = decrease quantity
    function increaseQuantity(increase: boolean, itemId: number | string) {
        if (increase) {
            setOrder(
                order.map((item) => {
                    if (item.id === itemId) {
                        return {
                            ...item,
                            quantity: item.quantity + 1,
                        }
                    }

                    return item
                })
            )
        } else {
            setOrder(
                order
                    .map((item) => {
                        if (item.quantity >= 1 && item.id === itemId) {
                            return {
                                ...item,
                                quantity: item.quantity - 1,
                            }
                        }

                        return item
                    })
                    .filter((item) => item.quantity >= 1)
            )
        }
    }

    return (
        <div>
            {items.map((item) => (
                <div key={item.id}>
                    <h2>{item.name}</h2>

                    {item.variants ? (
                        item.variants.map((variant) => (
                            <div key={variant.label}>
                                <h3>{variant.label}</h3>

                                <p>{convertToEuro(variant.price)}</p>

                                <button
                                    onClick={() => handleAdd(item, variant)}
                                >
                                    Add item
                                </button>
                            </div>
                        ))
                    ) : (
                        <>
                            <p>{convertToEuro(item.price)}</p>

                            <button
                                onClick={() => handleAdd(item)}
                            >
                                Add item
                            </button>
                        </>
                    )}
                </div>
            ))}

            <div>
                <h2>Uw Bestelling</h2>

                {order.map((item) => (
                    <div key={item.id}>
                        <span>
                            {item.name} x {item.quantity}

                            <button
                                onClick={() =>
                                    increaseQuantity(true, item.id)
                                }
                            >
                                add 1
                            </button>

                            <button
                                onClick={() =>
                                    increaseQuantity(false, item.id)
                                }
                            >
                                delete 1
                            </button>
                        </span>

                        <span>
                            {convertToEuro(item.price * item.quantity)}
                        </span>
                    </div>
                ))}

                <h3>Totaal: {totalPrice}</h3>
            </div>
        </div>
    )
}
