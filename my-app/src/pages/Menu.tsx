import { useState } from 'react'
import menuData from '../data/menu.json'
import type { MenuItem, OrderLine, Extra, Variant, Pending } from '../types'

const items = menuData.items as MenuItem[]
const extras = menuData.extras.items as Extra[]



export default function Menu() {
    const [pendingItem, setPendingItem] = useState<Pending | null>(null)
    const [order, setOrder] = useState<OrderLine[]>([])
    const [selectedExtras, setSelectedExtras] = useState<Extra[]>([])

    /*
         ∧＿∧
        (・◦・)   ✧･ﾟ:*      h e l p e r  
        /づ~ ♡･ﾟ:*:･★‧₊˚       f u n c t i o n s
    */
    
    function formatPrice(number: number) {
        return new Intl.NumberFormat('nl-NL', {
            style: 'currency',
            currency: 'EUR',
        }).format(number)
    }

    /* Returns:
        -1 = extras are not allowed
        0 = extras are allowed but free
        1+ = extras are allowed and paid
    */
    function getMaxExtras(item: MenuItem, variant?: Variant): number {
        return variant?.maxExtras ?? (item.allowsExtras ? 1 : -1)
    }

    const extrasAreFree = pendingItem && getMaxExtras(pendingItem.item, pendingItem.variant) === 0
    const visibleExtras = extrasAreFree 
        ? extras.slice(0, 3) 
        : extras

    const totalPrice = formatPrice(
        order.reduce((total, x) => total + (x.basePrice + x.extrasPrice) * x.quantity, 0)
    )

    /*
         ∧＿∧
        (・◦・)   ✧･ﾟ:*      h a n d l i n g 
        /づ~ ♡･ﾟ:*:･★‧₊˚               i t e m s
    */

    //TODO: Edit or delete the selected extras submitted item
    function handleExtrasChange(index: number, extra: Extra) {
        return;
    }

    //Checks extras before adding to order
    function handleAdd(item: MenuItem, variant?: Variant) {
        const maxExtras = getMaxExtras(item, variant)
        if (maxExtras === -1) {
            addToOrder(item, variant)
            return
        } 
        setPendingItem({ item, variant })
    }

    //Checks if item is already in order, if so increase quantity, else add to order
    function addToOrder(newItem: MenuItem, variant?: Variant, extras?: Extra[]) {

        // Every combination of dish, variant and extras gets its own id
        const extrasKey = (extras ?? []).map((extra) => extra.name).sort().join('+')
        const id = [newItem.id, variant?.name, extrasKey].filter(Boolean).join('-')

        const name = variant
            ? `${newItem.name} - ${variant.name}`
            : newItem.name

        const basePrice = (variant?.price ?? newItem.price) ?? 0
        const extrasPrice = (extras ?? []).reduce((total, extra) => total + extra.price, 0)

        setOrder((prevOrder) => {
            const foundItem = prevOrder.find((item) => item.id === id)
            if (foundItem) {
                return prevOrder.map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }
        
            return [
                ...prevOrder,
                {
                    id: id,
                    name: name,
                    basePrice: basePrice,
                    extrasPrice: extrasPrice,
                    quantity: 1,
                    extras: extras,
                }
            ]
        })
        //reset popup state
        setSelectedExtras([])
        setPendingItem(null)
    }

    // Increases or decreases selected item
    function changeQuantity(itemId: number | string, delta: number) {
        setOrder((prevOrder) => {
            return prevOrder.map((item) => {
                if (item.id === itemId) {
                    return { ...item, quantity: item.quantity + delta };
                }
                return item;
            }).filter((item) => item.quantity > 0);
        })
    }

    return (
        <div>
        {/*    
             ∧＿∧
            (・◦・)   ✧･ﾟ:*      m e n u 
            /づ~ ♡･ﾟ:*:･★‧₊˚       i t e m s               
        */}
            <section>
                {items.map((item) => (
                    <div key={item.id}>
                        <h2>{item.name}</h2>

                        {item.variants?.length 
                        ? (
                            item.variants.map((variant) => (
                                <div key={variant.name}>
                                    <h3>{variant.name}</h3>

                                    <p>{formatPrice(variant.price)}</p>

                                    <button onClick={() => handleAdd(item, variant)}>
                                        Add item
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div>
                                <p>{formatPrice(item.price)}</p>

                                <button onClick={() => handleAdd(item)}>
                                    Add item
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </section>

        {/*    
             ∧＿∧
            (・◦・)   ✧･ﾟ:*      m e n u 
            /づ~ ♡･ﾟ:*:･★‧₊˚         o r d e r             
        */}
            <section>
                <h2>Uw Bestelling</h2>

                {order.length === 0 ? (
                    <p>Uw bestelling is leeg.</p>
                ) : (
                    order.map((item) => (
                        <div key={item.id}>
                            <div>
                                {/* Item */}
                                <strong>
                                    {item.name} 
                                </strong>
                                {' x ' + item.quantity} {formatPrice(item.basePrice*item.quantity)}

                                {/* Extras */}
                                {item.extras && 
                                    item.extras.length > 0 && (
                                        <ul>
                                            {item.extras.map((extra) => (
                                                <li key={extra.name}>
                                                    {extra.name}{' '} 
                                                    ({formatPrice(extra.price)})
                                                </li>
                                            ))}
                                        </ul>
                                    )
                                }

                                {/* Quantity buttons */}
                                <button
                                    onClick={() =>
                                        changeQuantity(item.id, 1)
                                    }
                                >
                                    +1
                                </button>

                                <button
                                    onClick={() =>
                                        changeQuantity(item.id, -1)
                                    }
                                >
                                    -1
                                </button>
                            </div>

                            <span>
                                {formatPrice((item.basePrice + item.extrasPrice) * item.quantity)}
                            </span>
                        </div>
                    ))
                )}

                <h3>Totaal: {totalPrice}</h3>
            </section>

        {/*    
             ∧＿∧
            (・◦・)   ✧･ﾟ:*      p e n d i n g 
            /づ~ ♡･ﾟ:*:･★‧₊˚       i t e m s               
        */}
            {pendingItem && (
                <section>
                    <h2>{pendingItem.item.name}</h2>

                    {pendingItem.variant && <p>{pendingItem.variant.name}</p>}

                    {Array.from({ length: Math.max(1, getMaxExtras(pendingItem.item, pendingItem.variant)) }).map((_, i) => (
                        <select 
                            key={i} 
                            value={selectedExtras[i]?.name || ''} 
                            onChange={(e) => {
                                const chosen = extras.find((extra) => extra.name === e.target.value)                               

                                if(chosen && extrasAreFree) {
                                    setSelectedExtras([{...chosen, price: 0}])
                                }
                                
                                else if (chosen && !(getMaxExtras(pendingItem.item, pendingItem.variant) > 1)) {
                                    setSelectedExtras([chosen])
                                }

                                else if (chosen && getMaxExtras(pendingItem.item, pendingItem.variant) > 1) {
                                    setSelectedExtras((prev) => {
                                        const next = [...prev];
                                        next[i] = chosen;
                                        return next;
                                    })
                                }

                                else {
                                    setSelectedExtras((prev) => {
                                        const next = [...prev];
                                        next[i] = { name: '', price: 0 };
                                        return next;
                                    })
                                }
                            }}
                        >
                            <option value="">Geen Keuze</option>

                            {visibleExtras.map((extra) =>
                                <option 
                                    key = {extra.name}
                                    value={extra.name}
                                > 
                                    {extra.name} 
                                    {!extrasAreFree && formatPrice(extra.price)}
                                </option>)}
                        </select>
                    ))}

                    {/*Cancel*/}
                    <button 
                        onClick={() => {
                            setPendingItem(null) 
                            setSelectedExtras([])
                        }}
                    >
                            Cancel
                    </button>
                    
                    {/*Submit*/}
                    <button 
                        onClick={() => 
                            addToOrder(
                                pendingItem.item, 
                                pendingItem.variant, 
                                selectedExtras.filter((x) => 
                                    x != null &&
                                    x.name != ''
                                )
                            )
                        }
                    >
                        Submit
                    </button>
                </section>
            )}
        </div>
    )
}
