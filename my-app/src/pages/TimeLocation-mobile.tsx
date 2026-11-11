import '../css/TimeLocation-mobile.css'
import OrderPopup from '../components/OrderPopup'
import locationIcon from '../images/location.webp'
import { openingHours } from '../data/openingHours'

export default function TimeLocationMobile() {
  const today = new Date().getDay()

  return (
    <main className="time-location-mobile">
      <OrderPopup />
      <section className="time-mobile">
        <h2 className="time-location-mobile-zh" lang="zh">
          营业时间
        </h2>

        <div className="time-mobile-box">
          <h3>openingstijden</h3>

          {openingHours.map(([name, hours, dayNumber]) => (
            <div
              className={`time-mobile-row ${dayNumber === today ? 'time-mobile-row--today' : ''}`}
              key={name}
            >
              <span>{name}</span>
              <span>{hours}</span>
            </div>
          ))}
        </div>

        <p className="time-mobile-holiday">
          ieder feestdag open van
          <br />
          13.00 tot 21.00
        </p>
      </section>

      <section className="location-mobile">
        <h2 className="time-location-mobile-zh" lang="zh">
          地点
        </h2>

        <div className="location-mobile-map">
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
          className="location-mobile-address"
          href="https://maps.google.com/?q=Koolzaadveld%2067%2C%206641%20SV%20Beuningen"
          target="_blank"
          rel="noreferrer"
        >
          <img src={locationIcon} alt="" className="location-mobile-icon" />
          Koolzaadveld 67, 6641 SV, Beuningen
        </a>
      </section>
    </main>
  )
}
