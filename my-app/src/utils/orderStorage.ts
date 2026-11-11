import type { MenuItem, OrderLine, Extra } from '../types'
import menuData from '../data/menu.json'
import { getMaxExtras } from './extras'

const STORAGE_KEY = 'order'

const menuItems = menuData.items as MenuItem[]
const menuExtras = menuData.extras.items

// Storage can throw (blocked cookies, some private modes, full quota).
// Never let that take the page down: just behave as if nothing was saved.
function readRaw(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export function saveOrder(order: OrderLine[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(order))
  } catch {
    // ignore: the order still works for this visit, it just won't be remembered
  }
}

export function clearSavedOrder() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}

// Rebuilds a saved line from the current menu, so prices are always up to date.
// Returns null when the dish, variant or an extra no longer exists.
function refreshLine(saved: unknown): OrderLine | null {
  if (!saved || typeof saved !== 'object') return null
  const line = saved as Partial<OrderLine>

  const quantity = line.quantity
  if (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity < 1) return null
  if (line.id === undefined || !line.item) return null

  const item = menuItems.find((menuItem) => String(menuItem.id) === String(line.item?.id))
  if (!item) return null

  const variant = line.variant ? item.variants?.find((v) => v.name === line.variant) : undefined
  if (line.variant && !variant) return null

  const extrasAreFree = getMaxExtras(item, variant) === 0
  const extras: Extra[] = []
  for (const savedExtra of line.extras ?? []) {
    if (!savedExtra || typeof savedExtra.name !== 'string') return null
    if (savedExtra.name === '') {
      extras.push({ name: '', price: 0, quantity })
      continue
    }
    const current = menuExtras.find((extra) => extra.name === savedExtra.name)
    if (!current) return null
    extras.push({ name: current.name, price: extrasAreFree ? 0 : current.price, quantity })
  }

  const choices = Array.isArray(line.choices)
    ? line.choices.filter((choice): choice is string => typeof choice === 'string')
    : undefined

  return {
    id: line.id,
    item,
    name: variant ? `${item.name} - ${variant.name}` : item.name,
    basePrice: variant?.price ?? item.price ?? 0,
    quantity,
    variant: variant?.name,
    extras,
    choices,
  }
}

export function loadOrder(): OrderLine[] {
  const raw = readRaw()
  if (!raw) return []

  try {
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.map(refreshLine).filter((line): line is OrderLine => line !== null)
  } catch {
    return []
  }
}
