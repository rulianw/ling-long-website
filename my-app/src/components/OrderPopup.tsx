import { useContext, useState } from 'react'
import '../css/OrderPopup.css'
import OrderSummary from './OrderSummary'
import { OrderContext } from '../context/OrderContext'
import { formatPrice, getOrderTotal } from '../utils/price'

export default function OrderPopup() {
  const [orderPopupIsActive, setOrderPopupIsActive] = useState(false)
  const orderApi = useContext(OrderContext)
  if (!orderApi) return null
  const { order } = orderApi
  const totalPrice = formatPrice(getOrderTotal(order))
  return (
    <div className={`order-popup ${orderPopupIsActive ? 'order-popup--open' : ''}`}>
      <button
        className="order-popup-tab"
        aria-expanded={orderPopupIsActive}
        onClick={() => setOrderPopupIsActive(!orderPopupIsActive)}
      >
        Zie uw bestelling
      </button>

      <div className="order-popup-open">
        {orderPopupIsActive && (
          <div>
            <div className="order-popup-content">
              <OrderSummary order={order} totalPrice={totalPrice} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
