import type { ReactNode } from 'react'
import { useIsMobile } from '../hooks/useIsMobile'

type ResponsiveProps = {
    desktop: ReactNode
    mobile: ReactNode
}

//shows the mobile version of a page on small screens
export default function Responsive({ desktop, mobile }: ResponsiveProps) {
    return useIsMobile() ? mobile : desktop
}
