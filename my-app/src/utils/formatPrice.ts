const euro = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' })

export const formatPrice = (amount: number) => euro.format(amount)