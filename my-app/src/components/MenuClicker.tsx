import { useMemo, useState } from 'react'
import type { MenuItem } from '../types'
import { formatPrice } from '../utils/formatPrice'
import '../css/Menu.css'

type Props = {
    items: MenuItem[]
    onAdd: (key: string, name: string, price: number) => void
}
export default function MenuClicker ({ items, onAdd} : Props) {
    const  [selectedCategory, setSelectedCategory ] = useState<string | null> (null)

    const categories = useMemo(
        () => [...new Set(items.map(item => item.category))],
        [items]
    )

    //if no item is chosen, show the category menu
    if (selectedCategory === null){
        return (
            <div className = "categories">
                {categories.map(category => (
                    <button
                        key = {category}
                        className= "foodButton"
                        onClick={() => setSelectedCategory(category)}
                    >
                        <img></img> // add picture
                        {category}
                    </button>
                ))}
            </div>
        )
    }

    //if an item is chosen show the menu of that specific category
    const itemsInCategory = items.filter(item => item.category === selectedCategory)

    return(
        <div>
            <button onClick={() => setSelectedCategory(null)}>Terug naar categorieën</button>
            <h2>{selectedCategory}</h2>

            {itemsInCategory.map(item => {
                const price = item.price
                return(
                    <div key = {item.id}>
                        <img></img> //add picture
                        <strong> {item.id}. {item.name}</strong>
                        {item.description && <p> {item.description} </p>}

                        {item.variants ? (
                            item.variants.map(variant => (
                                <button
                                    key= {variant.label}
                                    className="itemButton"
                                    onClick={() =>
                                        onAdd(`${item.id}-${variant.label}`, `${item.name} (${variant.label})`)
                                    }
                                >
                                    {variant.label} - {formatPrice(variant.price)}
                                </button>
                            ))
                        ) : (
                            price !== null && (
                                <button
                                    className = "itemButton"
                                    onClick={() => onAdd(String(item.id), item.name, price)}
                                >
                                    Toevoegen - {formatPrice(price)}
                                </button>
                            )
                        )}
                    </div>
                )
            })}



        </div>

    )

    

        

    
    

    
}