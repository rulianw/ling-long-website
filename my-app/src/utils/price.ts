import type { OrderLine } from "../types"

export function formatPrice(number: number) {
    return new Intl.NumberFormat('nl-NL', {
        style: 'currency',
        currency: 'EUR',
    }).format(number)
}

// export function getOrderTotal(order: OrderLine[]) {
//     return order.reduce(
//         (total, x) =>
//             total +
//             (x.basePrice * x.quantity) +
//             (x.extras?.reduce(
//                 (extraTotal, extra) =>
//                     extraTotal + (extra.price * extra.quantity),
//                 0
//             ) ?? 0),
//         0
//     )
// }

export function getOrderTotal(order: OrderLine[]) {
    return order.reduce(
        (total, x) =>
            total + getLineTotal(x),
        0
    )
}

export function getLineTotal(line: OrderLine){
    return (line.basePrice * line.quantity) + (                
        line.extras?.reduce(
            (extraTotal, extra) =>
                extraTotal + (extra.price * extra.quantity),
            0
        ) ?? 0);
}



        