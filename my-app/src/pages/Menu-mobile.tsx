import { useContext } from 'react'
import '../css/Menu.css'
import '../css/Menu-mobile.css'
import MenuItems from '../components/MenuItems'
import OrderSummary from '../components/OrderSummary'
import PopUp from '../components/PopUp'
import OrderPopup from '../components/OrderPopup'
import { formatPrice, getOrderTotal } from '../utils/price'
import { OrderContext } from '../context/OrderContext'

// same components as the desktop menu, Menu-mobile.css restyles them
export default function MenuMobile() {
  const orderApi = useContext(OrderContext)
  if (!orderApi) return null
  const { order, pendingItem, setPendingItem, addToOrder, changeQuantity } = orderApi
  const totalPrice = formatPrice(getOrderTotal(order))

  return (
    <div className="menu-mobile">
      <OrderPopup />
      <MenuItems
        order={order}
        setPendingItem={setPendingItem}
        addToOrder={addToOrder}
        changeQuantity={changeQuantity}
      />

      <OrderSummary order={order} totalPrice={totalPrice} />

      <PopUp pendingItem={pendingItem} setPendingItem={setPendingItem} addToOrder={addToOrder} />
    </div>
  )
}
