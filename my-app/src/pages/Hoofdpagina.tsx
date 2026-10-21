import "../css/Hoofdpagina.css"

export default function Hoofdpagina() {
  return (
    <main className="hoofdpagina">
      <h1 className="titel">
        <span className="titel-zh" lang="zh">玲珑阁</span>
        <span className="titel-nl">Ling Long</span>
      </h1>

      <p className="omschrijving">
        Een klein Chinees afhaal restaurant gelegen in Beuningen.
      </p>

      <div className="bestellen">
        <p>bestellingen via de telefoon</p>
        <button>024 6775634</button>
      </div>
    </main>
  );
}