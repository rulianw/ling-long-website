import { useState } from 'react'
import type { Extra } from '../types'
import menuData from '../data/menu.json'
import { formatPrice } from '../utils/price'
import { getMaxExtras, updateExtra } from '../utils/extras'
import { useOrder } from '../hooks/useOrder'

type OrderApi = ReturnType<typeof useOrder>

type PopUpProps = {
    pendingItem: OrderApi['pendingItem']
    setPendingItem: OrderApi['setPendingItem']
    addToOrder: OrderApi['addToOrder']
}

const extras = menuData.extras.items.map((extra) => ({
    ...extra,
    quantity: 1,
}))

export default function PopUp({
    pendingItem,
    setPendingItem,
    addToOrder,
}: PopUpProps) {
    const [selectedExtras, setSelectedExtras] = useState<Extra[]>([])
    const [selectedChoices, setSelectedChoices] = useState<string[]>([])

    if (!pendingItem) return null

    const choiceAmount = pendingItem.variant?.choiceAmount ?? 0
    const maxExtras = getMaxExtras(pendingItem.item, pendingItem.variant)
    const extrasAreFree = maxExtras === 0
    const visibleExtras = extrasAreFree ? extras.slice(0, 3) : extras

    function close() {
        setPendingItem(null)
        setSelectedExtras([])
        setSelectedChoices([])
    }

    return (
        <div className="pop-up-overlay">
            <div className="pop-up-box">
                <h2>{pendingItem.item.name}</h2>

                {pendingItem.variant && <p>{pendingItem.variant.name}</p>}

                <div className="selection-section">
                    {choiceAmount > 0 && <p><b> Gerechten </b></p>}

                    {/* CHOICES SELECTION */}
                    {Array.from({ length: choiceAmount }).map((_, i) => (
                        <select
                            key={i}
                            value={selectedChoices[i] || ''}
                            onChange={(e) =>
                                setSelectedChoices((prev) => {
                                    const next = [...prev]
                                    next[i] = e.target.value
                                    return next
                                })
                            }
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
                    {Array.from({ length: Math.max(1, maxExtras) }).map((_, i) => (
                        <select
                            key={i}
                            value={selectedExtras[i]?.name || ''}
                            onChange={(e) =>
                                setSelectedExtras(
                                    updateExtra(extras, selectedExtras, i, e.target.value, extrasAreFree)
                                )
                            }
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
                </div>

                <div className="button-section">
                    <button className="button" onClick={close}>
                        Verwijder
                    </button>

                    <button
                        className="button"
                        onClick={() => {
                            addToOrder(
                                pendingItem.item,
                                pendingItem.variant,
                                selectedExtras.filter((x) => x != null && x.name != ''),
                                selectedChoices.filter((x) => x != null && x != ''),
                            )
                            close()
                        }}
                    >
                        Voeg toe
                    </button>
                </div>
            </div>
        </div>
    )
}