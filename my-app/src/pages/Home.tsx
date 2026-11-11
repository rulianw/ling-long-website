import '../css/Home.css'
import homeImage from '../images/home.webp'

export default function Home() {
  return (
    <main className="home">
      <img src={homeImage} alt="" className="home-image" />

      <div className="home-content">
        <h1 className="title">
          <span className="title-zh" lang="zh">
            玲珑阁
          </span>
          <span className="title-nl">Ling Long</span>
        </h1>

        <p className="description">Een klein Chinees afhaal restaurant gelegen in Beuningen.</p>

        <div className="ordering">
          <p>bestellingen graag via de telefoon</p>
          <a href="tel:0246775634" className="ordering-button">
            024 6775634
          </a>
        </div>
      </div>
    </main>
  )
}
