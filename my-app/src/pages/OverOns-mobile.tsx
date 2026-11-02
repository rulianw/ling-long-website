import { useEffect, useRef } from "react";
import "../css/OverOns-mobile.css";
import overOnsImage from "../images/overOns.png";
import image1 from "../images/image1.png"
import image2 from "../images/image2.png"
import image3 from "../images/image3.png"
import image4 from "../images/image4.png"
import image5 from "../images/image5.png"
import image6 from "../images/image6.png"
import image7 from "../images/image7.png"
import image8 from "../images/image8.png"
import image9 from "../images/image9.png"

const fotos = [image1, image2, image3, image4, image5, image6, image7, image8, image9]

export default function OverOnsMobile() {
  const textRef = useRef<HTMLDivElement>(null);
  const collageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [textRef.current, collageRef.current].filter(
      (el): el is HTMLDivElement => el !== null
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="over-ons-mobile">
      <section className="over-ons-mobile-hero">
        <img
          className="over-ons-mobile-illustratie"
          src={overOnsImage}
          alt="Illustratie van Ling Long"
        />

        <h1>over ons</h1>
        <p className="over-ons-mobile-chinees" lang="zh">
          我们
        </p>
      </section>

      <section className="over-ons-mobile-verhaal">
        <div className="over-ons-mobile-tekst over-ons-mobile-reveal" ref={textRef}>
          <p>
            Líng Lóng staat voor verfijnd en delicaat, maar ook voor
            levendigheid en karakter. Klein van formaat, groot in
            gastvrijheid: wij geloven dat een afhaalmaaltijd net zo warm
            en gezellig kan zijn als thuis aan tafel.
          </p>

          <p>
            Alles wordt bij ons dagelijks vers bereid, nooit voorgemaakt.
            Dat brengt soms een langere wachttijd mee, maar voor kwaliteit
            nemen wij graag de tijd.
          </p>
        </div>
      </section>

      {/* first photo full width, the rest in two columns */}
      <div className="over-ons-mobile-galerie over-ons-mobile-reveal" ref={collageRef}>
        {fotos.map((src, i) => (
          <figure className="over-ons-mobile-foto" key={i}>
            <img src={src} alt={`Foto ${i + 1}`} loading="lazy" />
          </figure>
        ))}
      </div>
    </main>
  );
}
