
import { useEffect, useRef } from "react";
import "../css/OverOns.css";

export default function OverOns() {
  const textRef = useRef(null);
  const collageRef = useRef(null);

  useEffect(() => {
    const elements = [textRef.current, collageRef.current].filter(Boolean);

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
    <main className="over-ons">
      {/* Full-screen title section */}
      <section className="over-ons-hero">
        <div className="over-ons-hero-content">
          <img
            className="over-ons-illustratie"
            src="/images/over-ons-illustratie.png"
            alt="Illustratie van Ling Long"
          />

          <h1>over ons</h1>
          <p className="over-ons-chinees" lang="zh">
            我们
          </p>

        </div>
      </section>

      <section className="over-ons-verhaal">
        <div className="over-ons-tekst reveal" ref={textRef}>
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

      <section className="over-ons-collage-section">
        <div className="over-ons-collage reveal" ref={collageRef}>
          <img
            src="/images/over-ons-collage.png"
            alt="Een kijkje bij Ling Long"
            loading="lazy"
          />
        </div>
      </section>
    </main>
  );
}
