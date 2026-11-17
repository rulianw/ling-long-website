import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import '../css/Navbar-mobile.css'
import { basePath, isMobilePreview, mobilePath } from '../utils/mobile'

const links = [
  { to: '/menu', nl: 'Menu', zh: '菜单' },
  { to: '/over-ons', nl: 'Over ons', zh: '我们' },
  { to: '/tijd-locatie', nl: 'Tijd & locatie', zh: '时间地点' },
]

export default function NavbarMobile() {
  const { pathname } = useLocation()
  const preview = isMobilePreview(pathname)
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

      {/* tapping anywhere outside the panel closes it */}
      {open && <div className="navbar-mobile-backdrop" onClick={() => setOpen(false)} />}

      {/* always rendered so it can slide out again, hidden with CSS when closed */}
      <nav className={`navbar-mobile-dropdown ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={mobilePath(link.to, preview)}
            className="navbar-mobile-link"
            onClick={() => setOpen(false)}
            tabIndex={open ? undefined : -1}
            viewTransition
          >
            <span>{link.nl}</span>
            <span className="navbar-mobile-link-zh" lang="zh">
              {link.zh}
            </span>
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
