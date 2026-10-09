# Menu page overview

## Today's plan (7 October 2026)
1. **Fix first:** adding the same dish twice breaks. The `map` in `addToOrder` has `{ }` but no `return`.
2. **"+" and "−" on an order line:** "+" should open the popup again (to choose extras for the new portion); "−" should remove the extras of the last portion. Decide exactly what "−" does.
3. **Dishes with two variations:** make the menu handle these as well (which dishes? see the question below).
4. **Edit function** to change the extras of an order line.

## To do after today
- [ ] `MenuItem.price` can be `null` (`formatPrice(item.price)` is flagged by TypeScript)
- [ ] Shared order state: the order will be shown on other pages (lift state up or React Context)
- [ ] Category buttons first, then the items of the chosen category
- [ ] Tailwind styling

## Done

**Data and types**
- [x] `menu.json`: every item has `image` and `allowsExtras` (false for soups and "Voor- en Bijgerechten"); variants use `name` and can have `maxExtras`
- [x] Extras list at `menuData.extras.items`
- [x] `OrderLine` has `basePrice`, `extrasPrice`, `quantity`, `extras?`

**Order**
- [x] `order` is state, `totalPrice` is calculated from it (`(basePrice + extrasPrice) * quantity`)
- [x] `addToOrder(item, variant?, extras?)`: the `id` includes variant and extras, so each combination is its own line
- [x] `changeQuantity(id, delta)`: one function for +1 and −1, removes a line at 0
- [x] `formatPrice` with `Intl.NumberFormat('nl-NL', EUR)`
- [x] Extras shown as a list under each order line
- [x] One-dish discount menu: the combo menu `choices` (21 dishes), where the chosen dish adds no price

**Extras popup**
- [x] `handleAdd` opens the popup through `pendingItem` or adds straight away
- [x] One `<select>` per allowed extra, each with its own position in `selectedExtras`
- [x] "Geen Keuze" clears its position; empty entries are filtered out on Submit
- [x] Variant A gets 1 free dropdown with only Witte Rijst, Nasi and Bami, without prices
- [x] Cancel and Submit reset `pendingItem` and `selectedExtras`
- [x] Code cleaned up into sections with clearer names

## Rule for extras
| `getMaxExtras` | Meaning |
|---|---|
| `-1` | No extras, no popup (soups, side dishes) |
| `0` | One free choice, no fee (combo menu variant A) |
| `1` or more | That many paid extras |

---

# Day log

## Week before 5 October
- State is never changed directly: always give `setOrder` a new array (spread, `map`, `filter`), and call the setter once per action.
- `totalPrice` is calculated from `order`, not stored. `map` must return every element, `filter` keeps what returns `true`, `reduce` makes one value.
- Built the order: add, +/−, removal at zero, variants as their own lines, the total.
- Decided the menu rules: `allowsExtras` on items, `maxExtras` on variants, `getMaxExtras` for the number.

## 5 October 2026
- Understood `pending` (the "sticky note" for the dish being decided on) and the flow: `handleAdd` → popup → `addToOrder`.
- Built the popup with one `<select>` per extra (`Array.from({ length }).map`), with prices.
- Renamed variant `label` to `name`, fixed the `pending.variant` errors, learned `console.log('x', object)`.
- Learned `onChange` for a `<select>`, and that `find` can return `undefined`.
- Fixed the price (`basePrice` + `extrasPrice`), split `OrderLine`, and learned that NaN after a change can be old state (reload with F5).
- Switched from merging extras into one line to a different `id` per combination.

## 6 October 2026
- Cancel now also clears the chosen extras (two statements in braces, not `&&`).
- One position per dropdown: copy the array, change position `i`, set the copy.
- Empty entries are removed on Submit with `x != null && x.name != ''` (check `x` before `x.name`).
- Variant A: minimum of 1 dropdown (`Math.max(1, ...)`), free price (`price: 0`), no prices shown, only the first three extras (`slice(0, 3)`).
- Learned that variables used in the JSX go above `return`, not inside a handler.
- Cleaned up `Menu.tsx`: sections, clearer names, a controlled `<select>`, one `changeQuantity`.

## 7 October 2026
- When deleting the extra will get deleted with the main dish
- When adding the popup will appear again when it's a main dish to choose the extra
- If it's the same extra dish it will add to the existing one, otherwise a new line will appear
- Fixed the error that made dishes appear x2 when choosing the same extra
- Fixed the error that extra dishes would not get deleted when deleting main dish.
- Fixed showing the pricing of the extra dish