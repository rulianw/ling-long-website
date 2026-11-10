import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Responsive from './components/Responsive'
import Home from './pages/Home'
import Menu from './pages/Menu'
import TimeLocation from './pages/TimeLocation'
import AboutUs from './pages/AboutUs'
import HomeMobile from './pages/Home-mobile'
import MenuMobile from './pages/Menu-mobile'
import TimeLocationMobile from './pages/TimeLocation-mobile'
import AboutUsMobile from './pages/AboutUs-mobile'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Responsive desktop={<Home />} mobile={<HomeMobile />} />,
      },
      { path: '/menu', element: <Responsive desktop={<Menu />} mobile={<MenuMobile />} /> },
      {
        path: '/tijd-locatie',
        element: <Responsive desktop={<TimeLocation />} mobile={<TimeLocationMobile />} />,
      },
      {
        path: '/over-ons',
        element: <Responsive desktop={<AboutUs />} mobile={<AboutUsMobile />} />,
      },

      { path: '/hoofdpagina-mobile', element: <HomeMobile /> },
      { path: '/menu-mobile', element: <MenuMobile /> },
      { path: '/tijd-locatie-mobile', element: <TimeLocationMobile /> },
      { path: '/over-ons-mobile', element: <AboutUsMobile /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
