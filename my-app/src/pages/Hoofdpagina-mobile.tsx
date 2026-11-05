import '../css/Hoofdpagina-mobile.css'
import hoofdpagina from '../images/hoofdpagina.png'
import CirkelLinksMobile from '../components/CirkelLinks-mobile'
import OrderPopup from '../components/OrderPopup'

export default function HoofdpaginaMobile() {
  return (
    <main className="hoofdpagina-mobile">
      <img src={hoofdpagina} alt="" className="hoofdpagina-mobile-beeld" />
      <OrderPopup />
      <h1 className="hoofdpagina-mobile-titel">
        <span className="hoofdpagina-mobile-zh" lang="zh">
          玲珑阁
        </span>
        <span className="hoofdpagina-mobile-nl">Ling Long</span>
      </h1>

      <p className="hoofdpagina-mobile-omschrijving">
        Een klein Chinees afhaal restaurant gelegen in Beuningen.
      </p>

      <CirkelLinksMobile />

      <div className="hoofdpagina-mobile-bestellen">
        <p>bestellingen via de telefoon</p>
        <a href="tel:0246775634">024 6775634</a>
      </div>
    </main>
  )
}
