import { useContext } from 'react'
import '../css/Menu.css'
import MenuItems from '../components/MenuItems'
import OrderSummary from '../components/OrderSummary'
import PopUp from '../components/PopUp'
import OrderPopup from '../components/OrderPopup'
import { formatPrice, getOrderTotal } from '../utils/price'
import { OrderContext } from '../context/OrderContext'

export default function Menu() {
  const orderApi = useContext(OrderContext)
  if (!orderApi) return null
  const { order, pendingItem, setPendingItem, addToOrder, changeQuantity } = orderApi
  const totalPrice = formatPrice(getOrderTotal(order))

  return (
    <div className="menu">
      <OrderPopup />

      <p className="alert" role="note">
          <strong>Let op:</strong> hier bestelt en betaalt u niet online.
          Stel uw bestelling samen en geef die telefonisch aan ons door.
      </p>
      
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
