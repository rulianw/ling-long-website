import { useState } from 'react'
import menuData from '../data/menu.json'
import type { MenuItem, OrderLine } from '../types'

const items = menuData.items as MenuItem[]
console.log(items);

export default function Menu() {
    const [order, setOrder] = useState<[OrderLine[]]>([{
        key: string | null,
        name: string | null,
        price: number | null,
        quantity: number | null,
    }]);

    const totalPrice = order.reduce((accumulator, currentValue) =>  accumulator + currentValue, 0)

    function addToOrder(id, order){

    }
    
    function changeQuantity(order, number){
        //get the item out of the order, if clicked on '+' increase by one, if clicked on '-' decrease by one
    }


    function showCategories(menuData){
        // for each item in menuData when item.category is new, show the category


    }

    function showItemsInCategory(menuData, category){
        //for the category chosen show each item, for each item in menuData where item.category == category, show
    }

    return(

    )
}