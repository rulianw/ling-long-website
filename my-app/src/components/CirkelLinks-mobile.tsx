import { NavLink, useLocation } from 'react-router-dom'
import "../css/CirkelLinks-mobile.css"
import { isMobilePreview, mobilePath } from '../utils/mobile'

//every word gets its own line inside the circle
const links = [
  { to: '/menu', nl: ['menu'], zh: ['菜单'] },
  { to: '/over-ons', nl: ['over ons'], zh: ['我们'] },
  { to: '/tijd-locatie', nl: ['tijd', 'locatie'], zh: ['时间', '地点'] },
]

type CirkelLinksProps = {
  onClick?: () => void
}

export default function CirkelLinksMobile({ onClick }: CirkelLinksProps) {
  const preview = isMobilePreview(useLocation().pathname)

  return (
    <nav className="cirkels-mobile">
      {links.map((link) => (
        <NavLink key={link.to} to={mobilePath(link.to, preview)} className="cirkel-mobile" onClick={onClick} viewTransition>
          {link.nl.map((woord) => (
            <span key={woord}>{woord}</span>
          ))}
          <span className="cirkel-mobile-zh" lang="zh">
            {link.zh.map((woord) => (
              <span key={woord}>{woord}</span>
            ))}
          </span>
        </NavLink>
      ))}
    </nav>
  )
}
