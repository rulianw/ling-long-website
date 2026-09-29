import { useState } from 'react'
import menuData from '../data/menu.json'
import type { MenuItem, OrderLine } from '../types'

const items = menuData.items as MenuItem[]
console.log(items);

export default function Menu() {
    const [order, setOrder] = useState<OrderLine[]>([])
    const totalPrice = convertToEuro(order.reduce((total, x) =>  total + x.price*x.quantity, 0))

    function convertToEuro(number: number){
        return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(number)
    }

    //Add new item into the order, checks if it already exists to increase quantity and otherwise add a new item into the order array
    function addToOrder(newItem: OrderLine){
        const foundItem = order.find((item) => item.id == newItem.id)
        if(foundItem){
            setOrder(
                order.map((item) => {
                    if (item.id == newItem.id){
                        return {...item, quantity: item.quantity+1}
                    }
                    return item
                })
            )
        } else {
            setOrder([...order, newItem])
        }
    }
    
    //checks boolean, if true it will increase quantity, if false it will decrease quantity
    function increaseQuantity(increase: boolean, itemId: number){
        if(increase){
            order.map((item)=>{
                if(item.id == itemId)
                    return {...item, quantity: item.quantity+1}
            })
        }
        else if(!increase){
            order.map((item)=>{
                if(item.id == itemId)
                    return {...item, quantity: item.quantity-1}
            })
        }
    }
    //WIP


    // function showCategories(menuData){
    //     // for each item in menuData when item.category is new, show the category


    // }

    // function showItemsInCategory(menuData, category){
    //     //for the category chosen show each item, for each item in menuData where item.category == category, show
    // }

    return (
        <>
            <div>
                {items.map((item) => (
                    <div key={item.id}>
                        <h2>{item.name}</h2>
                        <p>{convertToEuro(item.price)}</p>

                        <button onClick={() => addToOrder({ ...item, quantity: 1 })}>
                            Add item
                        </button>
                    </div>
                ))}
            </div>

            <div>
                <h2>Uw Bestelling</h2>

                {order.map((item) => (
                    <div key={item.id}>
                        <span>
                            {item.name} x {item.quantity}
                            <button onClick={()=>increaseQuantity(true, item.id)}>add 1</button>
                            <button onClick={()=>increaseQuantity(false, item.id)}>delete 1</button>
                        </span>

                        <span>
                            {convertToEuro(item.price * item.quantity)}
                        </span>
                    </div>
                ))}

                <h3>Totaal: {totalPrice}</h3>
            </div>
        </>
    )
}