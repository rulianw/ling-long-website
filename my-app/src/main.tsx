import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Responsive from './components/Responsive'
import Hoofdpagina from './pages/Hoofdpagina'
import Menu from './pages/Menu'
import TijdLocatie from './pages/TijdLocatie'
import OverOns from './pages/OverOns'
import HoofdpaginaMobile from './pages/Hoofdpagina-mobile'
import MenuMobile from './pages/Menu-mobile'
import TijdLocatieMobile from './pages/TijdLocatie-mobile'
import OverOnsMobile from './pages/OverOns-mobile'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: '/', element: <Responsive desktop={<Hoofdpagina />} mobile={<HoofdpaginaMobile />} /> },
      { path: '/menu', element: <Responsive desktop={<Menu />} mobile={<MenuMobile />} /> },
      { path: '/tijd-locatie', element: <Responsive desktop={<TijdLocatie />} mobile={<TijdLocatieMobile />} /> },
      { path: '/over-ons', element: <Responsive desktop={<OverOns />} mobile={<OverOnsMobile />} /> },

      // always the mobile version, to check it in a desktop browser
      { path: '/hoofdpagina-mobile', element: <HoofdpaginaMobile /> },
      { path: '/menu-mobile', element: <MenuMobile /> },
      { path: '/tijd-locatie-mobile', element: <TijdLocatieMobile /> },
      { path: '/over-ons-mobile', element: <OverOnsMobile /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
