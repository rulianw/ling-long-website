import { useContext, useEffect, useState } from 'react'
import type { OrderLine } from '../types'
import { OrderContext } from '../context/OrderContext'
import { formatPrice, getLineTotal } from '../utils/price'
import plasticTasje from '../images/plasticTasjeRood.png'

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
      <section className="bestelling">
        <h2 className="bestelling-titel">Uw Bestelling</h2>

        {order.length === 0 ? (
          <p className="bestelling-leeg">Uw bestelling is leeg. Kies een item van het menu.</p>
        ) : (
          <div className="bestelling-regels">
            {confirmDelete ? (
              <div className="bestelling-bevestig" role="alertdialog" aria-live="polite">
                <p>Weet u het zeker? De hele bestelling wordt verwijderd.</p>
                <div className="bestelling-bevestig-knoppen">
                  <button
                    className="bestelling-verwijder bestelling-verwijder--ja"
                    onClick={() => {
                      deleteOrder()
                      setConfirmDelete(false)
                    }}
                  >
                    Ja, verwijder
                  </button>
                  <button className="bestelling-annuleer" onClick={() => setConfirmDelete(false)}>
                    Nee, terug
                  </button>
                </div>
              </div>
            ) : (
              <button className="bestelling-verwijder" onClick={() => setConfirmDelete(true)}>
                Verwijder alles
              </button>
            )}

            {order.map((item) => (
              <div className="bestelling-regel" key={item.id}>
                <div className="bestelling-info">
                  <strong className="bestelling-naam">{item.name}</strong>

                  {/* Choices (combinatie menu) */}
                  {item.choices && item.choices.length > 0 && (
                    <ul className="bestelling-lijst">
                      {item.choices.map((choice) => (
                        <li key={choice}>{choice}</li>
                      ))}
                    </ul>
                  )}

                  {/* Extras */}
                  {item.extras && item.extras.length > 0 && (
                    <ul className="bestelling-lijst">
                      {item.extras.map((extra) => (
                        <li key={extra.name}>
                          {extra.name} x {extra.quantity} (
                          {formatPrice(extra.price * extra.quantity)})
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="bestelling-rechts">
                  <span className="bestelling-prijs">{formatPrice(getLineTotal(item))}</span>
                  <div className="teller">
                    <button className="teller-knop" onClick={() => changeQuantity(item.id, -1)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button className="teller-knop" onClick={() => changeQuantity(item.id, 1)}>
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="bestelling-totaal">
          <span>Totaal</span>
          <span>{totalPrice}</span>
        </div>

        <p className="plastic-tasje">
          <img src={plasticTasje} alt="plastic tasje" className="plastic-tasje-afbeelding" />
          <span> per tasje €0.05 extra, berekend bij de kassa </span>
        </p>

        <p className="bestelling-allergie">
          Als u allergieën of gevoeligheid voor bepaalde voedingsmiddelen heeft, meld het onze
          medewerkers.
        </p>

        <div className="bestelling-bellen">
          <p>
            I.v.m. de lange en zorgvuldige bereidingstijd verzoeken wij u vriendelijk uw bestelling
            telefonisch door te geven.
          </p>
          <a href="tel:0246775634" className="bestelling-telefoon">
            024 6775634
          </a>
        </div>
      </section>

      <section className="over-ons-catering">
        <div className="catering-kaart">
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
