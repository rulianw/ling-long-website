import { useState } from 'react'
import type { MenuItem, Variant, Card, OrderLine, MenuCategory } from '../types'
import { formatPrice } from '../utils/price'
import { getMaxExtras } from '../utils/extras'
import { useOrder } from '../hooks/useOrder'
import kom from '../images/kom.png'
import komHover from '../images/komHover.png'
import menuData from '../data/menu.json'

type OrderApi = ReturnType<typeof useOrder>

type MenuItemsProps = {
    order: OrderLine[]
    setPendingItem: OrderApi['setPendingItem']
    addToOrder: OrderApi['addToOrder']
    changeQuantity: OrderApi['changeQuantity']
}

export default function MenuItems({
    order,
    setPendingItem,
    addToOrder,
    changeQuantity,
} : MenuItemsProps){
    const items = menuData.items as MenuItem[]
    const categories = menuData.categories as MenuCategory[]

    const [activeCategory, setActiveCategory] = useState<MenuCategory | null>(null)
    const [expandedCard, setExpandedCard] = useState<string | null>(null)

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

    return(
        <div>
            {activeCategory ? (
                <div className="categorie-weergave" key={activeCategory.name}>
                    <button
                        className="categorie-kop"
                        onClick={() => setActiveCategory(null)}
                        aria-label="Terug naar alle categorieën"
                    >
                        <img src= {kom} alt="" className="kop-icoon kop-icoon--normaal" />
                        <img src= {komHover} alt="" className="kop-icoon kop-icoon--hover" />
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
                                    {expandedCard === card.key ? (
                                        <div
                                            className="kaart-beschrijving"
                                            onClick={() => setExpandedCard(null)}
                                        >
                                            <p>{card.item.description}</p>
                                        </div>
                                    ) : (
                                        <h3
                                            className="kaart-naam"
                                            onClick={() => {
                                                if (card.item.description) {
                                                    setExpandedCard(card.key)
                                                }
                                            }}
                                            style={{
                                                cursor: card.item.description ? 'pointer' : 'default'
                                            }}
                                        >
                                            {card.title}
                                            {card.item.description && (
                                                <span className="kaart-hint">meer info</span>
                                            )}
                                        </h3>
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
                                <img src={kom} alt="" className="kop-icoon kop-icoon--normaal" />
                                <img src={komHover} alt="" className="kop-icoon kop-icoon--hover" />
                                <h2>
                                    {category.name}
                                    <span className="categorie-zh" lang="zh">{category.zh}</span>
                                </h2>
                            </button>
                        ))}
                    </div>
            )
        }
    </div>
    )
}