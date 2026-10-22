import { Routes, Route } from 'react-router-dom'
import Navigatie from './components/Navbar'
import Hoofdpagina from './pages/Hoofdpagina'
import Menu from './pages/Menu'
import TijdLocatie from './pages/TijdLocatie'
import OverOns from './pages/OverOns'

export default function App() {
  return (
    <>
      <Navigatie />

      <Routes>
        <Route path="/" element={<Hoofdpagina />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/tijd-locatie" element={<TijdLocatie />} />
        <Route path="/over-ons" element={<OverOns />} />
      </Routes>
    </>
  )
}