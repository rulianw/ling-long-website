import { useSyncExternalStore } from 'react'

const query = window.matchMedia('(max-width: 768px)')

function subscribe(onChange: () => void) {
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
}

//true when the screen is phone sized, updates when the window is resized
export function useIsMobile() {
    return useSyncExternalStore(subscribe, () => query.matches)
}
