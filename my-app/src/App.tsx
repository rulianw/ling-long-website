import { Outlet, useLocation } from 'react-router-dom'
import Navigatie from './components/Navbar'
import NavigatieMobile from './components/Navbar-mobile'
import { useIsMobile } from './hooks/useIsMobile'
import { isMobilePreview } from './utils/mobile'

export default function App() {
  const { pathname } = useLocation()
  const isMobile = useIsMobile() || isMobilePreview(pathname)

  return (
    <>
      {isMobile ? <NavigatieMobile /> : <Navigatie />}
      <Outlet />
    </>
  )
}
