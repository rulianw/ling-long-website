import '../css/TimeLocation.css'
import OrderPopup from '../components/OrderPopup'
import locationIcon from '../images/location.png'
import { openingHours } from '../data/openingHours'

export default function TimeLocation() {
  const today = new Date().getDay()

  return (
    <section className="time-location">
      <OrderPopup />
      <div className="opening-hours">
        <div className="opening-hours-content">
          <div className="opening-hours-box">
            <h2>openingstijden</h2>

            <div className="opening-hours-rows">
              {openingHours.map(([name, hours, dayNumber]) => (
                <div
                  className={`opening-hours-row ${dayNumber === today ? 'opening-hours-row--today' : ''}`}
                  key={name}
                >
                  <span>{name}</span>
                  <span>{hours}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="opening-hours-notice">
            ieder feestdag open van
            <br />
            13.00 tot 21.00
          </div>
        </div>

        <h2 className="opening-hours-title" lang="zh">
          营业时间
        </h2>
      </div>

      <div className="location">
        <div className="location-content">
          <div className="location-map">
            <iframe
              title="Ling Long locatie in Beuningen"
              src="https://maps.google.com/maps?q=Koolzaadveld%2067%2C%206641%20SV%20Beuningen&output=embed"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <p className="location-address">
            <span aria-hidden="true">
              <img src={locationIcon} alt="locatie" className="location-icon" />
            </span>
            Koolzaadveld 67, 6641 SV, Beuningen
          </p>
        </div>

        <h2 className="location-title" lang="zh">
          地点
        </h2>
      </div>
    </section>
  )
}
