import "../css/Menu.css"
import "../css/Menu-mobile.css"
import MenuItems from '../components/MenuItems'
import OrderSummary from '../components/OrderSummary'
import PopUp from '../components/PopUp'
import { formatPrice, getOrderTotal} from '../utils/price'
import { useOrder } from '../hooks/useOrder'

//same components as the desktop menu, Menu-mobile.css restyles them
export default function MenuMobile() {
    const { order, pendingItem, setPendingItem, addToOrder, changeQuantity } = useOrder();
    const totalPrice = formatPrice(getOrderTotal(order))

    return (
        <div className="menu-mobile">
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
