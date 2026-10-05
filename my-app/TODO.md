# Menu page: done and to do

## Done

### Data (`menu.json`)
- [x] Every item has `image` (empty string, fill in later) and `allowsExtras`
- [x] `allowsExtras: false` for soups and "Voor- en Bijgerechten"; `true` for everything else
- [x] Variants can have `maxExtras` (Rijsttafel for 2 = 2, for 4 = 4; combo menu A = 0, B = 1, C = 1, D = 2)
- [x] Variants use `name` (renamed from `label`) in the JSON, `types.ts` and the code
- [x] Extras list lives at `menuData.extras.items`

### Types (`types.ts`)
- [x] `Variant`, `Extra`, `MenuItem` (`price: number | null`)
- [x] `OrderLine` has `basePrice` and `extrasPrice` (instead of one `price`) and `extras?: Extra[]`

### Logic in `Menu.tsx`
- [x] `order` is state; `totalPrice` is calculated with `reduce` (`(basePrice + extrasPrice) * quantity`)
- [x] `convertToEuro` with `Intl.NumberFormat('nl-NL', EUR)`
- [x] `addToOrder(item, variant?, extras?)`: finds an existing line, otherwise adds a new one; always a new array
- [x] Price split into `basePrice` (variant or dish) and `extrasPrice` (sum of the extras)
- [x] `increaseQuantity`: `map` for +/−, `.filter` removes a line at 0, all in one `setOrder`
- [x] Variants become their own order line
- [x] `getMaxExtras(item, variant)`: variant `maxExtras` first, otherwise 1 if `allowsExtras`, otherwise -1
- [x] `handleAdd`: opens the popup when `getMaxExtras >= 0`, otherwise adds straight away
- [x] `pending` holds `{ item, variant }` while the popup is open
- [x] Popup: dish name, variant name, one `<select>` per allowed extra (with prices), Cancel and Submit
- [x] `onChange` on each dropdown puts the chosen extra into `tempExtras`
- [x] `addToOrder` resets `pending` and `tempExtras`
- [x] Extras shown as a list under the order line
- [x] Line identity: the `id` includes the chosen extras, so each combination is its own line

## Rule for extras (current)
| `getMaxExtras` | Meaning |
|---|---|
| `-1` | No extras, no popup (soups, side dishes) |
| `0` | One free choice, no extra fee (combo menu variant A) |
| `1` or more | That many extras |

## To do (in this order)

1. **"Geen Keuze" must not add anything.** Right now it puts a dummy extra `{ name: "Geen Keuze", price: 0 }` into `tempExtras`, which ends up in the `id` and in the order list.
2. **One slot per dropdown.** Changing a dropdown (Bami, then Nasi) should replace its choice, not add a second extra. Think of `tempExtras` as one position per dropdown.
3. **Dropdown count for `0`.** `Array.from({ length: getMaxExtras(...) })` gives 0 dropdowns for variant A. It needs 1 free dropdown there.
4. **Free choice for variant A.** When `getMaxExtras === 0`, the chosen extra gets no fee (`extrasPrice` is 0).
5. **Test again** after steps 1 to 4: Babi Pangang with Bami, then with Nasi, and Daging Roedjak with Bami and with Grote Mihoen (total should be €38,60).
6. **Edit button** on an order line to change the extras (reuse the popup, starting from the extras that are already chosen).
7. **Check the data:** "Grote Nasi" costs €1,50 in the JSON while "Grote Bami" costs €3,20.
8. **`price` can be `null`** in the no-variants branch (`convertToEuro(item.price)`); TypeScript flags it.
9. **Add `key` to the `<option>` elements** inside the extras `map`.
10. **Clean up** the popup JSX and unused code.

## Later / parked
- [ ] Combo menu `choices` (the 21 dishes to combine in variants A to D)
- [ ] Shared order state: your supervisor said the order will be shown in other places. Look at lifting state up or using React Context.
- [ ] Supervisor's comment on removing lines: `filter` already builds a new array. Ask what they meant, because `splice` would change the state in place.
- [ ] Category buttons first, then the items of the chosen category (your original `showCategories` / `showItemsInCategory` plan)
- [ ] Images from `item.image` (show only when it's not empty)
- [ ] Tailwind styling for the popup and the list

---

# Day log

## Last week

**Concepts**
- Never change state directly (`push`, `quantity++`, `splice`). Give `setOrder` a new array (spread, `map`, `filter`).
- Call the setter once per action. Chain `.map(...).filter(...)` inside one `setOrder`.
- `order` doesn't update right after `setOrder`. The new value only exists on the next render.
- `totalPrice` is not state; it is calculated from `order` on each render.
- `map` has to `return` for every element and can't make an array shorter. `filter` keeps what returns `true`. `reduce` boils an array down to one value.
- In `useState<Type>(value)`, the first slot is a type and the second is a value.
- `??` only falls back on `null`/`undefined`, so `0` is kept.

**Menu decisions**
- Each item has `image` and `allowsExtras`; variants can have `maxExtras`.
- Number of extras comes from `getMaxExtras`.
- Flow: "Add item" → `handleAdd` → popup for extras (through `pending`) or straight into the order.
- Variants get their own order line.

**State of the code at the end of the day**
- Working: adding, +/−, removal at zero, variants as separate lines, the total.
- Open: popup not shown yet, `price` can be `null`, extras not saved, same dish with different extras counts as one line, combo `choices` unused.

## 5 October 2026

- Understood what `pending` is for (the "sticky note" for the dish being decided on) and where each use of it sits.
- Decided how the extras flow works: temporary state `tempExtras` (`Extra[]`) until Submit, then `addToOrder(item, variant, extras)`; afterwards `pending` goes back to `null` and `tempExtras` to `[]`.
- Built the popup: one `<select>` per allowed extra via `Array.from({ length }).map`, with a "no choice" option and the extras with prices.
- Renamed variant `label` to `name` everywhere (JSON, type and code).
- Fixed the `pending.variant` errors: check `pending.variant &&` before reading `.name`, and pass the whole variant to `getMaxExtras`.
- Learned that `console.log('x' + object)` prints `[object Object]`; use `console.log('x', object)`.
- Changed the rule: `-1` = no popup, `0` = one free choice (combo variant A), `1+` = extras.
- Learned `onChange` (not `onClick`) for a `<select>`, and that `find` returns `undefined` when nothing matches (so no `!`).
- Fixed the price: `basePrice` + `extrasPrice` in three small steps instead of a nested ternary.
- Learned that a NaN after a code change can come from old state in the page (reload with F5).
- Split `OrderLine` into `basePrice` and `extrasPrice` and updated the total and the order list.
- Found out that merging extras into an existing line gives wrong prices and a confusing order, and went for a different `id` per combination of dish, variant and extras.