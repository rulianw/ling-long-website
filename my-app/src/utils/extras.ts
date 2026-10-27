    import type { MenuItem, Variant, Extra, Pending } from '../types'
    
    /* Returns:
        -1 = extras are not allowed
        0 = extras are allowed but free
        1+ = extras are allowed and paid
    */

    export function getMaxExtras(item: MenuItem, variant?: Variant): number {
        return variant?.maxExtras ?? (item.allowsExtras ? 1 : -1)
    }

    export function updateExtra(
        extras: Extra[],
        selectedExtras: Extra[],
        i: number,
        name: string,
        extrasAreFree: boolean | null,
    ): Extra[] {
        const chosen = extras.find((extra) => extra.name === name)

        if (chosen && extrasAreFree) {
            return [{ ...chosen, price: 0 }]
        }

        const next = [...selectedExtras]
        next[i] = chosen ?? { name: '', price: 0, quantity: 0 }
        return next
    }



    

