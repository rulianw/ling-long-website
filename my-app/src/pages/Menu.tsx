import "../css/Menu.css"
import { useState } from 'react'
import menuData from '../data/menu.json'
import type { MenuItem, Extra, Variant, Card } from '../types'
import { formatPrice, getOrderTotal } from '../utils/price'
import { getMaxExtras } from '../utils/extras'
import { useOrder } from '../hooks/useOrder'

type MenuCategory = {
    name: string
    zh: string
    matches: string[]
}

const items = menuData.items as MenuItem[]
const categories = menuData.categories as MenuCategory[]
const extras = menuData.extras.items.map((extra) => ({
    ...extra,
    quantity: 1,
}))

export default function Menu() {
    const { order, pendingItem, setPendingItem, addToOrder, changeQuantity } = useOrder();
    const [selectedExtras, setSelectedExtras] = useState<Extra[]>([])
    const [selectedChoices, setSelectedChoices] = useState<string[]>([])
    const [activeCategory, setActiveCategory] = useState<MenuCategory | null>(null)

    const totalPrice = formatPrice(getOrderTotal(order))

    //extras
    const extrasAreFree = pendingItem && getMaxExtras(pendingItem.item, pendingItem.variant) === 0
    const visibleExtras = extrasAreFree
        ? extras.slice(0, 3)
        : extras

    //items of the chosen category
    const shownItems = activeCategory
        ? items.filter((item) => activeCategory.matches.includes(item.category))
        : []

    //one card per item, or one per variant
    const cards: Card[] = shownItems.flatMap((item): Card[] =>
        item.variants?.length
            ? item.variants.map((variant) => ({
                key: `${item.id}-${variant.name}`,
                item,
                variant,
                price: variant.price,
                title: `${item.name} – ${variant.name}`,
            }))
            : [{
                key: String(item.id),
                item,
                variant: undefined,
                price: item.price,
                title: item.name,
            }]
    )


    /*
         ∧＿∧
        (・◦・)   ✧･ﾟ:*      f u n c t i o n s
        /づ~ ♡･ﾟ:*:･★‧₊˚
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

    function countInOrder(item: MenuItem, variant?: Variant) {
        return order
            .filter((o) => o.item.id === item.id && o.variant === variant?.name)
            .reduce((sum, o) => sum + o.quantity, 0)
    }

    function removeOne(item: MenuItem, variant?: Variant) {
        const line = order.find(
            (o) => o.item.id === item.id && o.variant === variant?.name
        )
        if (line) changeQuantity(line.id, -1)
    }

    return (
        <div className="menu">
            {/*
                 ∧＿∧
                (・◦・)   ✧･ﾟ:*      m e n u
                /づ~ ♡･ﾟ:*:･★‧₊˚       i t e m s
            */}

        {activeCategory ? (
            <div className="categorie-weergave" key={activeCategory.name}>
                <button
                    className="categorie-kop"
                    onClick={() => setActiveCategory(null)}
                    aria-label="Terug naar alle categorieën"
                >
                    <img src="/assets/kom.svg" alt="" className="kop-icoon kop-icoon--normaal" />
                    <img src="/assets/kom-hover.svg" alt="" className="kop-icoon kop-icoon--hover" />
                    <span className="kop-naam">{activeCategory.name}</span>
                    <span className="kop-zh" lang="zh">{activeCategory.zh}</span>
                </button>

                <div className="kaarten">
                    {cards.map((card, index) => (
                        <article
                            key={card.key}
                            className={`kaart ${card.item.image || card.item.description ? 'kaart--info' : ''}`}
                            style={{ animationDelay: `${index * 60}ms` }}
                        >
                            <span className="kaart-nummer">{card.item.id}</span>

                            <div className="kaart-midden">
                                <h3 className="kaart-naam">{card.title}</h3>

                                {(card.item.image || card.item.description) && (
                                    <div className="kaart-hover">
                                        {card.item.image && (
                                            <img src={card.item.image} alt={card.item.name} />
                                        )}
                                        {card.item.description && <p>{card.item.description}</p>}
                                    </div>
                                )}
                            </div>

                            <div className="kaart-onder">
                                {card.price !== null && (
                                    <p className="kaart-prijs"><b>{formatPrice(card.price)}</b></p>
                                )}
                                <div className="teller">
                                    <button className="teller-knop" onClick={() => removeOne(card.item, card.variant)}>-</button>
                                    <span>{countInOrder(card.item, card.variant)}</span>
                                    <button className="teller-knop" onClick={() => handleAdd(card.item, card.variant)}>+</button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        ) : (
                <div className="categorieen">
                    {categories.map((category) => (
                        <button
                            key={category.name}
                            className="categorie"
                            onClick={() => setActiveCategory(category)}
                        >
                            <img src="/assets/kom.svg" alt="" className="categorie-icoon" />
                            <h2>
                                {category.name}
                                <span className="categorie-zh" lang="zh">{category.zh}</span>
                            </h2>
                        </button>
                    ))}
                </div>
            )}

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
                                <strong>{item.name}</strong>
                                {' x ' + item.quantity} {formatPrice(item.basePrice * item.quantity)}

                                {/* Choices (combinatie menu) */}
                                {item.choices && item.choices.length > 0 && (
                                    <ul>
                                        {item.choices.map((choice) => (
                                            <li key={choice}>{choice}</li>
                                        ))}
                                    </ul>
                                )}

                                {/* Extras */}
                                {item.extras && item.extras.length > 0 && (
                                    <ul>
                                        {item.extras.map((extra) => (
                                            <li key={extra.name}>
                                                {extra.name} x {extra.quantity}
                                                ({formatPrice(extra.price * extra.quantity)})
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {/* Quantity buttons */}
                                <button onClick={() => changeQuantity(item.id, 1)}>+1</button>
                                <button onClick={() => changeQuantity(item.id, -1)}>-1</button>
                            </div>

                            <span>
                                {formatPrice(
                                    item.basePrice * item.quantity +
                                    (item.extras?.reduce(
                                        (extraTotal, extra) =>
                                            extraTotal + extra.price * extra.quantity,
                                        0
                                    ) ?? 0)
                                )}
                            </span>
                        </div>
                    ))
                )}

                <h3>Totaal: {totalPrice}</h3>

                <p>bestellingen via de telefoon</p>
                <button>024 6775634</button>
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

                    {/* CHOICES SELECTION */}
                    {Array.from({ length: pendingItem.variant?.choiceAmount ?? 0 }).map((_, i) => (
                        <select
                            key={i}
                            value={selectedChoices[i] || ''}
                            onChange={(e) => {
                                setSelectedChoices((prev) => {
                                    const next = [...prev];
                                    next[i] = e.target.value;
                                    return next;
                                })
                            }}
                        >
                            <option value="">Geen Keuze</option>

                            {pendingItem.item.choices?.map((choice) => (
                                <option key={choice} value={choice}>
                                    {choice}
                                </option>
                            ))}
                        </select>
                    ))}

                    {/* EXTRAS SELECTION */}
                    <p><b> Bijgerechten </b></p>
                    {Array.from({ length: Math.max(1, getMaxExtras(pendingItem.item, pendingItem.variant)) }).map((_, i) => (
                        <select
                            key={i}
                            value={selectedExtras[i]?.name || ''}
                            onChange={(e) => {
                                const chosen = extras.find((extra) => extra.name === e.target.value)

                                if (chosen && extrasAreFree) {
                                    setSelectedExtras([{ ...chosen, price: 0 }])
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

                            {visibleExtras.map((extra) => (
                                <option key={extra.name} value={extra.name}>
                                    {extra.name}
                                    {!extrasAreFree && formatPrice(extra.price)}
                                </option>
                            ))}
                        </select>
                    ))}

                    {/* Cancel */}
                    <button
                        onClick={() => {
                            setPendingItem(null)
                            setSelectedExtras([])
                            setSelectedChoices([])
                        }}
                    >
                        Cancel
                    </button>

                    {/* Submit */}
                    <button
                        onClick={() => {
                            addToOrder(
                                pendingItem.item,
                                pendingItem.variant,
                                selectedExtras.filter((x) => x != null && x.name != ''),
                                selectedChoices.filter((x) => x != null && x != ''),
                            )
                            setPendingItem(null)
                            setSelectedExtras([])
                            setSelectedChoices([])
                        }}
                    >
                        Submit
                    </button>
                </section>
            )}
        </div>
    )
}