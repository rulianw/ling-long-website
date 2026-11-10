import { useEffect, useRef } from 'react'
import '../css/AboutUs.css'
import OrderPopup from '../components/OrderPopup'
import aboutUsImage from '../images/aboutUs.png'
import image1 from '../images/image1.png'
import image2 from '../images/image2.png'
import image3 from '../images/image3.png'
import image4 from '../images/image4.png'
import image5 from '../images/image5.png'
import image6 from '../images/image6.png'
import image7 from '../images/image7.png'
import image8 from '../images/image8.png'
import image9 from '../images/image9.png'

export default function AboutUs() {
  const textRef = useRef<HTMLDivElement>(null)
  const collageRef = useRef<HTMLDivElement>(null)
  const columns = [
    [image1, image2, image3],
    [image4, image5, image6],
    [image7, image8, image9],
  ]
  useEffect(() => {
    const elements = [textRef.current, collageRef.current].filter(
      (el): el is HTMLDivElement => el !== null,
    )

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.15,
      },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  return (
    <main className="about-us">
      <OrderPopup />
      <section className="about-us-hero">
        <div className="about-us-hero-content">
          <img
            className="about-us-illustration"
            src={aboutUsImage}
            alt="Illustratie van Ling Long"
          />

          <h1>over ons</h1>
          <p className="about-us-chinese" lang="zh">
            我们
          </p>
        </div>
      </section>

      <section className="about-us-story">
        <div className="about-us-text reveal" ref={textRef}>
          <p>
            Líng Lóng staat voor verfijnd en delicaat, maar ook voor levendigheid en karakter. Klein
            van formaat, groot in gastvrijheid: wij geloven dat een afhaalmaaltijd net zo warm en
            gezellig kan zijn als thuis aan tafel.
          </p>

          <p>
            Alles wordt bij ons dagelijks vers bereid, nooit voorgemaakt. Dat brengt soms een
            langere wachttijd mee, maar voor kwaliteit nemen wij graag de tijd.
          </p>
        </div>
      </section>

      <section className="about-us-gallery">
        <div className="about-us-gallery-grid reveal" ref={collageRef}>
          {columns.map((column, c) => (
            <div className="gallery-column" key={c}>
              {column.map((src, i) => (
                <figure className="gallery-tile" key={i} tabIndex={0}>
                  <img src={src} alt={`Foto ${c * 3 + i + 1}`} loading="lazy" />
                </figure>
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
