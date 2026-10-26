import { Link, NavLink, useLocation } from 'react-router-dom'
import "../css/Navigatie.css"
import papier from "../images/navigatie.png"

const links = [
  { to: '/menu', nl: 'menu', zh: '菜单' },
  { to: '/tijd-locatie', nl: 'tijd & locatie', zh: '时间和地点' },
  { to: '/over-ons', nl: 'over ons', zh: '我们' },
]

export default function Navigatie() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const isDark = pathname === '/tijd-locatie'

  return (
    <header className={`navigatie ${isHome ? 'navigatie--home' : ''} ${isDark ? 'navigatie--donker' : ''}`}>
        {!isHome && (
            <Link to="/" className="navigatie-logo" viewTransition>
            <span lang="zh">玲珑阁</span>
            <span>Ling Long</span>
            </Link>
        )}

        <nav
            className="navigatie-links"
            style={isHome ? undefined : { backgroundImage: `url(${papier})` }}
        >
            {links.map((link) => (
            <NavLink key={link.to} to={link.to} className="navigatie-link" viewTransition>
                <span>{link.nl}</span>
                <span lang="zh">{link.zh}</span>
            </NavLink>
            ))}
        </nav>

        {!isHome && (
        <div className="navigatie-bellen">
            <p>bestellingen via de telefoon</p>
            <a href="tel:0246775634" className="navigatie-telefoon">
            024 6775634
            </a>
        </div>
        )}
    </header>
  )
}