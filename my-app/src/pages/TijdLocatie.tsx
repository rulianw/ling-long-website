
import "../css/TijdLocatie.css";

const openingHours = [
  ["Maandag", "gesloten"],
  ["Dinsdag", "15:00 tot 21:00"],
  ["Woensdag", "15:00 tot 21:00"],
  ["Donderdag", "15:00 tot 21:00"],
  ["Vrijdag", "15:00 tot 21:00"],
  ["Zaterdag", "13:00 tot 21:00"],
  ["Zondag", "13:00 tot 21:00"],
];

export default function TijdLocatie() {
  return (
    <section className="tijd-locatie">
      <div className="openingstijden">
        <div className="openingstijden-content">
          <div className="openingstijden-box">
            <h2>openingstijden</h2>

            <div className="openingstijden-rijen">
              {openingHours.map(([day, hours]) => (
                <div className="openingstijden-rij" key={day}>
                  <span>{day}</span>
                  <span>{hours}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="openingstijden-notificatie">
            ieder feestdag open van
            <br />
            13.00 tot 21.00
          </div>
        </div>

        <h2 className="openingstijden-titel" lang="zh">
          营业时间
        </h2>
      </div>

      <div className="locatie">
        <div className="locatie-content">
          <div className="locatie-kaart">
            <iframe
              title="Ling Long locatie in Beuningen"
              src="https://maps.google.com/maps?q=Koolzaadveld%2067%2C%206641%20SV%20Beuningen&output=embed"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <p className="locatie-adres">
            <span aria-hidden="true">📍</span>
            Koolzaadveld 67, 6641 SV, Beuningen
          </p>
        </div>

        <h2 className="locatie-titel" lang="zh">
          地点
        </h2>
      </div>
    </section>
  );
}
