import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import "../css/Navigatie-mobile.css"
import CirkelLinksMobile from './CirkelLinks-mobile'
import { basePath, isMobilePreview, mobilePath } from '../utils/mobile'

export default function NavigatieMobile() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const page = basePath(pathname)
  const isDark = page === '/tijd-locatie'

  // the home page shows the links itself
  if (page === '/') return null

  return (
    <header className={`navigatie-mobile ${isDark ? 'navigatie-mobile--donker' : ''}`}>
      <Link
        to={mobilePath('/', isMobilePreview(pathname))}
        className="navigatie-mobile-logo"
        onClick={() => setOpen(false)}
        viewTransition
      >
        <span lang="zh">玲珑阁</span>
        <span>Ling Long</span>
      </Link>

      <a href="tel:0246775634" className="navigatie-mobile-telefoon">
        024 6775634
      </a>

      <button
        className="navigatie-mobile-knop"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? 'Menu sluiten' : 'Menu openen'}
      >
        <span />
        <span />
        <span />
      </button>

      {open && (
        <div className="navigatie-mobile-paneel">
          <CirkelLinksMobile onClick={() => setOpen(false)} />
        </div>
      )}
    </header>
  )
}
