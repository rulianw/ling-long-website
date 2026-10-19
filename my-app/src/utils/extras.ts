    import type { MenuItem, Variant } from '../types'
    
    /* Returns:
        -1 = extras are not allowed
        0 = extras are allowed but free
        1+ = extras are allowed and paid
    */

    export function getMaxExtras(item: MenuItem, variant?: Variant): number {
        return variant?.maxExtras ?? (item.allowsExtras ? 1 : -1)
    }