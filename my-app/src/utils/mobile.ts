//pages ending in -mobile always show the mobile version, handy for checking it in a desktop browser
export function isMobilePreview(pathname: string) {
    return pathname.endsWith('-mobile')
}

//turns "/menu" into "/menu-mobile" while previewing, so the links stay on the mobile pages
export function mobilePath(to: string, preview: boolean) {
    if (!preview) return to
    return to === '/' ? '/hoofdpagina-mobile' : `${to}-mobile`
}

//"/menu-mobile" -> "/menu", "/hoofdpagina-mobile" -> "/"
export function basePath(pathname: string) {
    const path = pathname.replace(/-mobile$/, '')
    return path === '/hoofdpagina' ? '/' : path
}
