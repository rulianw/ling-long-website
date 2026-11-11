import '../css/Home-mobile.css'
import homeImage from '../images/home.webp'
import CircleLinksMobile from '../components/CircleLinks-mobile'
import OrderPopup from '../components/OrderPopup'

export default function HomeMobile() {
  return (
    <main className="home-mobile">
      <img src={homeImage} alt="" className="home-mobile-image" />
      <OrderPopup />
      <h1 className="home-mobile-title">
        <span className="home-mobile-zh" lang="zh">
          玲珑阁
        </span>
        <span className="home-mobile-nl">Ling Long</span>
      </h1>

      <p className="home-mobile-description">
        Een klein Chinees afhaal restaurant gelegen in Beuningen.
      </p>

      <CircleLinksMobile />

      <div className="home-mobile-ordering">
        <p>bestellingen graag via de telefoon</p>
        <a href="tel:0246775634">024 6775634</a>
      </div>
    </main>
  )
}
