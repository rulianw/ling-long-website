import { useState } from 'react'
import menuData from '../data/menu.json'
import type { MenuItem, OrderLine, Extra, Variant, Pending } from '../types'
import { formatPrice, getOrderTotal } from '../utils/price'
import { getMaxExtras } from '../utils/extras'
import { addToOrder, changeQuantity } from '../utils/order'

const items = menuData.items as MenuItem[]
const extras = menuData.extras.items.map((extra) => ({
    ...extra,
    quantity: 1,
}))

export default function Menu() {
    const [pendingItem, setPendingItem] = useState<Pending | null>(null)
    const [order, setOrder] = useState<OrderLine[]>([])
    const [selectedExtras, setSelectedExtras] = useState<Extra[]>([])

    const extrasAreFree = pendingItem && getMaxExtras(pendingItem.item, pendingItem.variant) === 0
    const visibleExtras = extrasAreFree 
        ? extras.slice(0, 3) 
        : extras

    const totalPrice = formatPrice(getOrderTotal(order))

    /*
         ∧＿∧
        (・◦・)   ✧･ﾟ:*      h a n d l i n g 
        /づ~ ♡･ﾟ:*:･★‧₊˚               i t e m s
    */

    //Checks extras before adding to order
    function handleAdd(item: MenuItem, variant?: Variant) {
        const maxExtras = getMaxExtras(item, variant)
        if (maxExtras === -1) {
            addToOrder(item, variant)
            return
        } 
        setPendingItem({ item, variant })
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
                                {item.price !== null && <p>{formatPrice(item.price)}</p>}
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
                                                    {extra.name} x {extra.quantity} 
                                                    ({formatPrice(extra.price*extra.quantity)})
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
                                {formatPrice((item.basePrice * item.quantity + 
                                    (item.extras?.reduce(
                                        (extraTotal, extra) =>
                                            extraTotal + (extra.price * extra.quantity),
                                            0
                                    ) ?? 0)
                                ))}
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
                                        next[i] = { name: '', price: 0, quantity: 0 };
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

/* WORK IN PROGRESS: trying to integrate category buttons to filter menu items, but not working yet.

const unfilteredCategories = items.map((item) => item.category)
const categories = [...new Set(unfilteredCategories)]

const [shownItems, setShownItems] = useState<MenuItem[]>([])


{shownItems.length > 0 ? (
	<>
	<button onClick = { () => setShownItems([])}> {shownItems[0].category} </button>
	{shownItems.map ((item) => (
		<div key = {item.id}>
		
		<button onClick = handleAdd etc> 
			{item.name}
		</button>
		</div>
	))}
	</>
	

)

:

(categories.map ((category) => (
	<div key = {category}>
		<button onClick = { () => setShownItems(returnItemsFromCategory(category))}>
			<h2> {category} </h2>
		</button>
	</div>
	)

)}




function returnItemsFromCategory(category){
	return items.filter(item => item.category === category)
}

*/