import { useState } from 'react'
import menuData from '../data/menu.json'
import type { MenuItem, OrderLine, Extra, Variant } from '../types'

const items = menuData.items as MenuItem[]
const extras = menuData.extras.items as Extra[]

export default function Menu() {
    type Pending = { item: MenuItem; variant?: Variant }

    const [pending, setPending] = useState<Pending | null>(null)
    const [order, setOrder] = useState<OrderLine[]>([]) //is dit iets van alleen het menu of zal ik het over andere applicaties willen gebruiken
    const [tempExtras, setTempExtras] = useState<Extra[]>([])
    const totalPrice = convertToEuro(
        order.reduce((total, x) => total + (x.basePrice + x.extrasPrice) * x.quantity, 0)
    )

    function convertToEuro(number: number) {
        return new Intl.NumberFormat('nl-NL', {
            style: 'currency',
            currency: 'EUR',
        }).format(number)
    }

    //Before adding to the order it will check whether extras can be added
    //If so, it will open a pop up menu through pending so extras can be chosen
    //otherwise it will just add the item to the order as it is
    function handleAdd(item: MenuItem, variant?: Variant) {
        const maxExtras:number = getMaxExtras(item, variant)
        if (maxExtras >= 0) {
            setPending({ item, variant })
        } else {
            addToOrder(item, variant)
        }
    }

    //Function to check whether there are extras in an item, returns the amount of extras allowed
    function getMaxExtras(item: MenuItem, variant?: Variant): number {
        return variant?.maxExtras ?? (item.allowsExtras ? 1 : -1)
    }

    // Add new item into the order.
    // If it already exists, increase quantity.
    // Otherwise add a new item to the order array.
    function addToOrder(newItem: MenuItem, variant?: Variant, extras?: Extra[]) {
        setTempExtras([])
        setPending(null)

        // Every combination of dish, variant and extras gets its own id
        const extrasKey = (extras ?? []).map((extra) => extra.name).sort().join('+')
        const id = [newItem.id, variant?.name, extrasKey].filter(Boolean).join('-')

        const name = variant
            ? `${newItem.name} - ${variant.name}`
            : newItem.name

        const basePrice = (variant ? variant.price : newItem.price) ?? 0
        const extrasPrice = (extras ?? []).reduce((total, extra) => total + extra.price, 0)

        const foundItem = order.find((item) => item.id === id)

        if (foundItem) {
            setOrder(
                order.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    }
                    return item
                })
            )
        } else {
            setOrder([
                ...order,
                {
                    id: id,
                    name: name,
                    basePrice: basePrice,
                    extrasPrice: extrasPrice,
                    quantity: 1,
                    extras: extras,
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
                    //niet filteren maar splicen? 
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
                            <div key={variant.name}>
                                <h3>{variant.name}</h3>

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
                            {item.name} x {item.quantity} ({convertToEuro(item.basePrice)})
                            {item.extras && item.extras.length > 0 && (
                                <ul>
                                    {item.extras.map((extra) => (
                                        <li key={extra.name}>
                                            {extra.name} {convertToEuro(extra.price)}
                                        </li>
                                    ))}
                                </ul>
                            )}

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
                            {convertToEuro((item.basePrice + item.extrasPrice) * item.quantity)}
                        </span>
                    </div>
                ))}

                <h3>Totaal: {totalPrice}</h3>
            </div>

            <div>
                {pending && (
                    <div>
                        <h2>{pending.item.name}</h2>
                        {pending.variant && <p>{pending.variant.name}</p>}

                        {Array.from({ length: getMaxExtras(pending.item, pending.variant) }).map((_, i) => (
                            <select key={i} onChange={(e) => {
                                const chosen = extras.find((extra) => extra.name === e.target.value)
                                const extrasAllowed = getMaxExtras(pending.item, pending.variant) > 1
                                if (chosen && !extrasAllowed) {
                                    setTempExtras([chosen])
                                }
                                else if (chosen && extrasAllowed) {
                                    setTempExtras([...tempExtras, chosen])
                                }
                                else {
                                    setTempExtras([...tempExtras, { name: "Geen Keuze", price: 0 }])
                                }
                            }}>
                                <option value="">Geen Keuze</option>
                                {extras.map((extra) =>
                                <option value={extra.name}>{extra.name} {convertToEuro(extra.price)}</option>)}
                            </select>
                        ))}

                        <button onClick={() => setPending(null)}>Cancel</button>
                        <button onClick={() => addToOrder(pending.item, pending.variant, tempExtras)}>Submit</button>
                
                    </div>
                )}
            </div>
                
            
        </div>
    )
}
