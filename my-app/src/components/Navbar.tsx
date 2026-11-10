import { Link, NavLink, useLocation } from 'react-router-dom'
import '../css/Navbar.css'
import paper from '../images/navbar.png'

const links = [
  { to: '/menu', nl: 'menu', zh: '菜单' },
  { to: '/tijd-locatie', nl: 'tijd & locatie', zh: '时间和地点' },
  { to: '/over-ons', nl: 'over ons', zh: '我们' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const isDark = pathname === '/tijd-locatie'

  return (
    <header className={`navbar ${isHome ? 'navbar--home' : ''} ${isDark ? 'navbar--dark' : ''}`}>
      {!isHome && (
        <Link to="/" className="navbar-logo" viewTransition>
          <span lang="zh">玲珑阁</span>
          <span>Ling Long</span>
        </Link>
      )}

      <nav
        className="navbar-links"
        style={isHome ? undefined : { backgroundImage: `url(${paper})` }}
      >
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} className="navbar-link" viewTransition>
            <span>{link.nl}</span>
            <span lang="zh">{link.zh}</span>
          </NavLink>
        ))}
      </nav>

      {!isHome && (
        <div className="navbar-call">
          <p>bestellingen via de telefoon</p>
          <a href="tel:0246775634" className="navbar-phone">
            024 6775634
          </a>
        </div>
      )}
    </header>
  )
}
