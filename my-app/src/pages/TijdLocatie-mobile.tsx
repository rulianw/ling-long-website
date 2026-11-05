import '../css/TijdLocatie-mobile.css'
import OrderPopup from '../components/OrderPopup'
import locatie from '../images/locatie.png'
import { openingHours } from '../data/openingstijden'

export default function TijdLocatieMobile() {
  const today = new Date().getDay()

  return (
    <main className="tijd-locatie-mobile">
      <OrderPopup />
      <section className="tijd-mobile">
        <h2 className="tijd-locatie-mobile-zh" lang="zh">
          营业时间
        </h2>

        <div className="tijd-mobile-box">
          <h3>openingstijden</h3>

          {openingHours.map(([name, hours, dayNumber]) => (
            <div
              className={`tijd-mobile-rij ${dayNumber === today ? 'tijd-mobile-rij--vandaag' : ''}`}
              key={name}
            >
              <span>{name}</span>
              <span>{hours}</span>
            </div>
          ))}
        </div>

        <p className="tijd-mobile-feestdag">
          ieder feestdag open van
          <br />
          13.00 tot 21.00
        </p>
      </section>

      <section className="locatie-mobile">
        <h2 className="tijd-locatie-mobile-zh" lang="zh">
          地点
        </h2>

        <div className="locatie-mobile-kaart">
          <iframe
            title="Ling Long locatie in Beuningen"
            src="https://maps.google.com/maps?q=Koolzaadveld%2067%2C%206641%20SV%20Beuningen&output=embed"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* opens the maps app on a phone */}
        <a
          className="locatie-mobile-adres"
          href="https://maps.google.com/?q=Koolzaadveld%2067%2C%206641%20SV%20Beuningen"
          target="_blank"
          rel="noreferrer"
        >
          <img src={locatie} alt="" className="locatie-mobile-icoon" />
          Koolzaadveld 67, 6641 SV, Beuningen
        </a>
      </section>
    </main>
  )
}
