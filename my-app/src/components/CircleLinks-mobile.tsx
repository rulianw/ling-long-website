import { NavLink, useLocation } from 'react-router-dom'
import '../css/CircleLinks-mobile.css'
import { isMobilePreview, mobilePath } from '../utils/mobile'

// every word gets its own line inside the circle
const links = [
  { to: '/menu', nl: ['menu'], zh: ['菜单'] },
  { to: '/over-ons', nl: ['over ons'], zh: ['我们'] },
  { to: '/tijd-locatie', nl: ['tijd', 'locatie'], zh: ['时间', '地点'] },
]

type CircleLinksProps = {
  onClick?: () => void
}

export default function CircleLinksMobile({ onClick }: CircleLinksProps) {
  const preview = isMobilePreview(useLocation().pathname)

  return (
    <nav className="circles-mobile">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={mobilePath(link.to, preview)}
          className="circle-mobile"
          onClick={onClick}
          viewTransition
        >
          {link.nl.map((word) => (
            <span key={word}>{word}</span>
          ))}
          <span className="circle-mobile-zh" lang="zh">
            {link.zh.map((word) => (
              <span key={word}>{word}</span>
            ))}
          </span>
        </NavLink>
      ))}
    </nav>
  )
}
