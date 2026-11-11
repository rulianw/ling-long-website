import { useState } from 'react'
import type { MenuItem, Variant, Card, OrderLine, MenuCategory } from '../types'
import { formatPrice } from '../utils/price'
import { getMaxExtras } from '../utils/extras'
import type { OrderApi } from '../context/OrderContext'
import bowl from '../images/bowl.webp'
import bowlHover from '../images/bowlHover.webp'
import menuData from '../data/menu.json'

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
}: MenuItemsProps) {
  const items = menuData.items as MenuItem[]
  const categories = menuData.categories as MenuCategory[]

  const [activeCategory, setActiveCategory] = useState<MenuCategory | null>(null)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const [slideDirection, setSlideDirection] = useState<'previous' | 'next' | null>(null)

  function goToNeighbour(category: MenuCategory, direction: 'previous' | 'next') {
    setSlideDirection(direction)
    setActiveCategory(category)
  }

  // items of the chosen category
  const shownItems = activeCategory
    ? items.filter((item) => activeCategory.matches.includes(item.category))
    : []

  // one card per item, or one per variant
  const cards: Card[] = shownItems.flatMap((item): Card[] =>
    item.variants?.length
      ? item.variants.map((variant) => ({
          key: `${item.id}-${variant.name}`,
          item,
          variant,
          price: variant.price,
          title: `${item.name} – ${variant.name}`,
        }))
      : [
          {
            key: String(item.id),
            item,
            variant: undefined,
            price: item.price,
            title: item.name,
          },
        ],
  )

  const previousCategory =
    activeCategory && activeCategory.id > 1
      ? categories.find((category) => category.id === activeCategory.id - 1)
      : null

  const nextCategory =
    activeCategory && activeCategory.id < categories.length
      ? categories.find((category) => category.id === activeCategory.id + 1)
      : null

  // Checks extras before adding to order
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
    const line = order.find((o) => o.item.id === item.id && o.variant === variant?.name)
    if (line) changeQuantity(line.id, -1)
  }

  return (
    <div>
      {activeCategory ? (
        <div
          className={`category-view ${slideDirection ? `slide-${slideDirection}` : ''}`}
          key={activeCategory.name}
        >
          <div className="category-headers">
            {previousCategory && (
              <button
                className="category-header-left"
                onClick={() => goToNeighbour(previousCategory, 'previous')}
                aria-label={`Vorige categorie: ${previousCategory.name}`}
              >
                <img src={bowl} alt="" className="header-icon header-icon--normal" />
                <span className="header-name">{previousCategory.name}</span>
                <span className="header-zh" lang="zh">
                  {previousCategory.zh}
                </span>
              </button>
            )}

            <button
              className="category-header"
              onClick={() => setActiveCategory(null)}
              aria-label="Terug naar alle categorieën"
            >
              <img src={bowl} alt="" className="header-icon header-icon--normal" />
              <img src={bowlHover} alt="" className="header-icon header-icon--hover" />
              <span className="header-name">{activeCategory.name}</span>
              <span className="header-zh" lang="zh">
                {activeCategory.zh}
              </span>
            </button>

            {nextCategory && (
              <button
                className="category-header-right"
                onClick={() => goToNeighbour(nextCategory, 'next')}
                aria-label={`Volgende categorie: ${nextCategory.name}`}
              >
                <img src={bowl} alt="" className="header-icon header-icon--normal" />
                <span className="header-name">{nextCategory.name}</span>
                <span className="header-zh" lang="zh">
                  {nextCategory.zh}
                </span>
              </button>
            )}
          </div>

          <div className="cards">
            {cards.map((card, index) => (
              <article
                key={card.key}
                className={`card ${card.item.image || card.item.description ? 'card--info' : ''}`}
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <span className="card-number">{card.item.id}</span>

                <div className="card-middle">
                  {expandedCard === card.key ? (
                    <div className="card-description" onClick={() => setExpandedCard(null)}>
                      <p>{card.item.description}</p>
                    </div>
                  ) : (
                    <h3
                      className="card-name"
                      onClick={() => {
                        if (card.item.description) {
                          setExpandedCard(card.key)
                        }
                      }}
                      style={{
                        cursor: card.item.description ? 'pointer' : 'default',
                      }}
                    >
                      {card.title}
                      {card.item.description && <span className="card-hint">meer info</span>}
                    </h3>
                  )}
                </div>

                <div className="card-bottom">
                  {card.price !== null && (
                    <p className="card-price">
                      <b>{formatPrice(card.price)}</b>
                    </p>
                  )}
                  <div className="counter">
                    <button
                      className="counter-button"
                      onClick={() => removeOne(card.item, card.variant)}
                    >
                      -
                    </button>
                    <span>{countInOrder(card.item, card.variant)}</span>
                    <button
                      className="counter-button"
                      onClick={() => handleAdd(card.item, card.variant)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <div className="categories">
          {categories.map((category) => (
            <button
              key={category.name}
              className="category"
              onClick={() => setActiveCategory(category)}
            >
              <img src={bowl} alt="" className="header-icon header-icon--normal" />
              <img src={bowlHover} alt="" className="header-icon header-icon--hover" />
              <h2>
                {category.name}
                <span className="category-zh" lang="zh">
                  {category.zh}
                </span>
              </h2>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
