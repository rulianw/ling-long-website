import { useContext, useEffect, useState } from 'react'
import type { OrderLine } from '../types'
import { OrderContext } from '../context/OrderContext'
import { formatPrice, getLineTotal } from '../utils/price'
import plasticBag from '../images/plasticBagRed.webp'

type OrderSummaryProps = {
  order: OrderLine[]
  totalPrice: string
}

export default function OrderSummary({ order, totalPrice }: OrderSummaryProps) {
  const orderApi = useContext(OrderContext)
  const [confirmDelete, setConfirmDelete] = useState(false)

  // if the order gets emptied some other way, forget the question
  useEffect(() => {
    if (order.length === 0) setConfirmDelete(false)
  }, [order.length])

  if (!orderApi) return null
  const { changeQuantity, deleteOrder } = orderApi

  return (
    <div className="menu">
      <section className="order-summary">
        <h2 className="order-summary-title">Uw Bestelling</h2>

        {order.length === 0 ? (
          <p className="order-summary-empty">Uw bestelling is leeg. Kies een item van het menu.</p>
        ) : (
          <div className="order-summary-lines">
            {confirmDelete ? (
              <div className="order-summary-confirm" role="alertdialog" aria-live="polite">
                <p>Weet u het zeker? De hele bestelling wordt verwijderd.</p>
                <div className="order-summary-confirm-buttons">
                  <button
                    className="order-summary-delete order-summary-delete--yes"
                    onClick={() => {
                      deleteOrder()
                      setConfirmDelete(false)
                    }}
                  >
                    Ja, verwijder
                  </button>
                  <button className="order-summary-cancel" onClick={() => setConfirmDelete(false)}>
                    Nee, terug
                  </button>
                </div>
              </div>
            ) : (
              <button className="order-summary-delete" onClick={() => setConfirmDelete(true)}>
                Verwijder alles
              </button>
            )}

            {order.map((item) => (
              <div className="order-summary-line" key={item.id}>
                <div className="order-summary-info">
                  <strong className="order-summary-name">{item.name}</strong>

                  {/* Choices (combinatie menu) */}
                  {item.choices && item.choices.length > 0 && (
                    <ul className="order-summary-list">
                      {item.choices.map((choice) => (
                        <li key={choice}>{choice}</li>
                      ))}
                    </ul>
                  )}

                  {/* Extras */}
                  {item.extras && item.extras.length > 0 && (
                    <ul className="order-summary-list">
                      {item.extras.map((extra) => (
                        <li key={extra.name}>
                          {extra.name} x {extra.quantity} (
                          {formatPrice(extra.price * extra.quantity)})
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="order-summary-right">
                  <span className="order-summary-price">{formatPrice(getLineTotal(item))}</span>
                  <div className="counter">
                    <button className="counter-button" onClick={() => changeQuantity(item.id, -1)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button className="counter-button" onClick={() => changeQuantity(item.id, 1)}>
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="order-summary-total">
          <span>Totaal</span>
          <span>{totalPrice}</span>
        </div>

        <p className="plastic-bag">
          <img src={plasticBag} alt="plastic tasje" className="plastic-bag-image" />
          <span> per tasje €0.05 extra, berekend bij de kassa </span>
        </p>

        <p className="order-summary-allergy">
          Als u allergieën of gevoeligheid voor bepaalde voedingsmiddelen heeft, meld het onze
          medewerkers.
        </p>

        <div className="order-summary-call">
          <p>
            I.v.m. de lange en zorgvuldige bereidingstijd verzoeken wij u vriendelijk uw bestelling
            telefonisch door te geven.
          </p>
          <a href="tel:0246775634" className="order-summary-phone">
            024 6775634
          </a>
        </div>
      </section>

      <section className="about-us-catering">
        <div className="catering-card">
          <h2>Catering Service</h2>
          <p>
            Wilt u uw gasten of personeel eens verwennen met een heerlijke Chinese maaltijd? Wij
            bezorgen catering aan huis of bedrijf!
          </p>
          <p className="catering-hint">(Vraag meer informatie aan de balie)</p>
        </div>
      </section>
    </div>
  )
}
