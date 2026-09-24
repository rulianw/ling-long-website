import { Routes, Route, Link } from 'react-router-dom'
import Hoofdpagina from './pages/Hoofdpagina'
import Menu from './pages/Menu'
import TijdLocatie from './pages/TijdLocatie'
import OverOns from './pages/OverOns'

export default function App() {
  return (
    <>
      <nav>
        <Link to="/">Hoofdpagina</Link> |{' '}
        <Link to="/menu">Menu</Link> |{' '}
        <Link to="/tijd-locatie">Tijd & Locatie</Link> |{' '}
        <Link to="/over-ons">Over ons</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Hoofdpagina />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/tijd-locatie" element={<TijdLocatie />} />
        <Route path="/over-ons" element={<OverOns />} />
      </Routes>
    </>
  )
}