import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../css/Navbar-mobile.css'
import CircleLinksMobile from './CircleLinks-mobile'
import { basePath, isMobilePreview, mobilePath } from '../utils/mobile'

export default function NavbarMobile() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const page = basePath(pathname)
  const isDark = page === '/tijd-locatie'

  // the home page shows the links itself
  if (page === '/') return null

  return (
    <header className={`navbar-mobile ${isDark ? 'navbar-mobile--dark' : ''}`}>
      <Link
        to={mobilePath('/', isMobilePreview(pathname))}
        className="navbar-mobile-logo"
        onClick={() => setOpen(false)}
        viewTransition
      >
        <span lang="zh">玲珑阁</span>
        <span>Ling Long</span>
      </Link>

      <a href="tel:0246775634" className="navbar-mobile-phone">
        024 6775634
      </a>

      <button
        className="navbar-mobile-button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? 'Menu sluiten' : 'Menu openen'}
      >
        <span />
        <span />
        <span />
      </button>

      {open && (
        <div className="navbar-mobile-panel">
          <CircleLinksMobile onClick={() => setOpen(false)} />
        </div>
      )}
    </header>
  )
}
