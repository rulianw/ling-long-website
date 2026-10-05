# Menu page: done and to do

## Done

### Data (`menu.json`)
- [x] Every item has `image` (empty string, fill in later) and `allowsExtras`
- [x] `allowsExtras: false` for soups and "Voor- en Bijgerechten"; `true` for everything else
- [x] Variants can have `maxExtras` (Rijsttafel for 2 = 2, for 4 = 4; combo menu A = 0, B = 1, C = 1, D = 2)
- [x] Variants use `name` (renamed from `label`) in both the JSON and `types.ts`
- [x] Extras list lives at `menuData.extras.items`

### Types (`types.ts`)
- [x] `Variant`, `Extra`, `MenuItem` (`price: number | null`), `OrderLine` (`extras?: Extra[]`)

### Logic in `Menu.tsx`
- [x] `order` is state; `totalPrice` is calculated from it with `reduce` (`price * quantity`)
- [x] `convertToEuro` with `Intl.NumberFormat('nl-NL', EUR)`
- [x] `addToOrder`: finds an existing line, otherwise adds a new one; always a new array
- [x] `increaseQuantity`: `map` for +/−, `.filter` removes a line at 0, all in one `setOrder`
- [x] Variants become their own order line (`id-name`)
- [x] `getMaxExtras(item, variant)`: variant `maxExtras` first, otherwise 1 if `allowsExtras`, otherwise -1
- [x] `handleAdd`: opens the popup when `getMaxExtras >= 0`, otherwise adds straight away
- [x] `pending` holds `{ item, variant }` while the popup is open
- [x] Popup shows the dish name, the variant name, one `<select>` per allowed extra (with prices), Cancel and Submit
- [x] `addToOrder` resets `pending` and `tempExtras`

## Rule for extras (current)
| `getMaxExtras` | Meaning |
|---|---|
| `-1` | No extras, no popup (soups, side dishes) |
| `0` | One free choice, no extra fee (combo menu variant A) |
| `1` or more | That many extras |

## To do (in this order)

1. **Dropdown count for `0`.** `Array.from({ length: getMaxExtras(...) })` gives 0 dropdowns for variant A. It needs 1 free dropdown there.
2. **Save the choices.** Each `<select>` needs an `onChange` that puts its choice into `tempExtras` without mutating it (one slot per dropdown, so choices don't replace each other).
3. **Submit passes the extras** to `addToOrder`, and the popup closes.
4. **Extra prices.** Add the price of chosen extras to the line, except the free choice for variant A. Decide which extras cost money.
5. **Line identity.** The same dish with different extras should not count as one line (the `id` has to include the extras).
6. **Show the extras** under the order line.
7. **`price` can be `null`** in the no-variants branch (`convertToEuro(item.price)`); TypeScript flags it.
8. **Add `key` to the `<option>` elements** inside the extras `map`.
9. **Clean up the popup:** there is a duplicate `{pending && (` wrapper, and the old commented-out block can go.

## Later / parked
- [ ] Combo menu `choices` (the 21 dishes to combine in variants A to D)
- [ ] Shared order state: the order will be shown in other places. Look at lifting state up or using React Context.
- [ ] Supervisor's comment on removing lines: `filter` already builds a new array. Ask what they meant, because `splice` would change the state in place.
- [ ] Category buttons first, then the items of the chosen category (your original `showCategories` / `showItemsInCategory` plan)
- [ ] Images from `item.image` (show only when it's not empty)
- [ ] Type the `Pending` type outside the component
- [ ] Tailwind styling for the popup and the list

---

# Day log

## last week

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
- Variants get their own order line (`id-name`).

**State of the code at the end of the day**
- Working: adding, +/−, removal at zero, variants as separate lines, the total.
- Open: popup not shown yet, `price` can be `null`, extras not saved, same dish with different extras counts as one line, combo `choices` unused.


- Understood what `pending` is for (the "sticky note" for the dish being decided on) and where each use of it sits.
- Decided how the extras flow works: temporary state `tempExtras` (`Extra[]`) until Submit, then `addToOrder(item, variant, extras)`; afterwards `pending` goes back to `null` and `tempExtras` to `[]`.
- Gave `addToOrder` a third optional parameter for the extras.
- Built the popup: one `<select>` per allowed extra via `Array.from({ length }).map`, with a "no choice" option and the extras with prices.
- Renamed variant `label` to `name` everywhere (JSON, type and code).
- Fixed the `pending.variant` errors: check `pending.variant &&` before reading `.name`, and pass the whole variant to `getMaxExtras`.
- Learned that `console.log('x' + object)` prints `[object Object]`; use `console.log('x', object)`.

## 5 October 2026
- Changed the rule: `-1` = no popup, `0` = one free choice (combo variant A), `1+` = extras. `handleAdd` checks `>= 0`.
- Wrote this overview.