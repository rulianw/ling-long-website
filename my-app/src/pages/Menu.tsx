import "../css/Menu.css"
import MenuItems from '../components/MenuItems'
import OrderSummary from '../components/OrderSummary'
import PopUp from '../components/PopUp'
import { formatPrice, getOrderTotal} from '../utils/price'
import { OrderContext } from "../context/OrderContext"
import { useContext } from 'react' 

export default function Menu() {
    const orderApi = useContext(OrderContext??null)
    if (!orderApi) return null;
    const { 
        order,
        pendingItem,
        setPendingItem,
        addToOrder,
        changeQuantity 
    } = orderApi
    const totalPrice = formatPrice(getOrderTotal(order))

    return (
        <div className="menu">
            <MenuItems 
                order={order} 
                setPendingItem={setPendingItem} 
                addToOrder={addToOrder} 
                changeQuantity={changeQuantity} 
            />

            <OrderSummary 
                order={order} 
                totalPrice={totalPrice}
            />
 
            <PopUp 
                pendingItem={pendingItem} 
                setPendingItem={setPendingItem} 
                addToOrder={addToOrder}
            />
        </div>
    )
}