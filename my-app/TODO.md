# Menu page overview

## Plan (27 October 2026)
1. **Split `Menu.tsx` into three components:** category/card list, order summary, popup (no new features)
2. **`useOrder`:** keep "change quantity" and "choose extras again" as two separate things
3. **Chinese names on the cards** (add a `zh` field per dish in `menu.json`, same idea as the categories)
4. **Style the order section:** add the girl illustration and the "你的命令" title (box and total are done)
5. **Edit function** to change the extras of an order line
6. **Catering card:** add the fade-in (`reveal` class + ref) on Over Ons

## To do after today
- [ ] Shared order state: the order will be shown on other pages (lift state up or React Context)
- [ ] Tailwind styling
- [ ] Check the pages on small screens (nav, home image, Tijd & Locatie panels)
- [ ] Substitute all the visuals with self-made images

## Done

**Data and types**
- [x] `menu.json`: every item has `image` and `allowsExtras` (false for soups and "Voor- en Bijgerechten"); variants use `name` and can have `maxExtras`
- [x] Extras list at `menuData.extras.items`
- [x] `OrderLine` has `basePrice`, `extrasPrice`, `quantity`, `extras?`
- [x] `categories` block in `menu.json` with `name`, `zh` and `matches` (groups the old categories)
- [x] `Card` type in `types.ts` (one card per dish or per variant)
- [x] `MenuItem.price` can be `null`: handled in the cards (`price !== null`)

**Order**
- [x] `order` is state, `totalPrice` is calculated from it
- [x] `addToOrder(item, variant?, extras?)`: the `id` includes variant and extras, so each combination is its own line
- [x] `changeQuantity(id, delta)`: one function for +1 and −1, removes a line at 0
- [x] `formatPrice` with `Intl.NumberFormat('nl-NL', EUR)`
- [x] `getLineTotal(line)` in `price.ts` is the only place with the price sum; `getOrderTotal` and the order lines both use it
- [x] Extras shown as a list under each order line
- [x] One-dish discount menu: the combo menu `choices` (21 dishes), where the chosen dish adds no price
- [x] Adding the same dish twice no longer breaks
- [x] "+" on an order line opens the popup again for main dishes
- [x] Deleting a main dish also deletes its extras
- [x] Same extra adds to the existing line, a different extra makes a new line
- [x] Price of the extra dish is shown correctly

**Extras popup**
- [x] `handleAdd` opens the popup through `pendingItem` or adds straight away
- [x] One `<select>` per allowed extra, each with its own position in `selectedExtras`
- [x] "Geen Keuze" clears its position; empty entries are filtered out on Submit
- [x] Variant A gets 1 free dropdown with only Witte Rijst, Nasi and Bami, without prices
- [x] Cancel and Submit reset `pendingItem` and `selectedExtras`
- [x] The `onChange` branches moved into one helper, `updateExtraAt` in `utils/extras.ts` (returns a new array, no `setState` inside)
- [x] Popup is an overlay (`pop-up-overlay` + `pop-up-box`) with a semi-transparent dark background (`color-mix`), white box, yellow offset shadow, centered buttons and styled dropdowns

**Menu page design**
- [x] Category grid with bowl icon, Dutch and Chinese name
- [x] Open category: round header (click = back to categories), cards fade in one after another
- [x] Every variant has its own card
- [x] Hover shows photo and description (only on cards that have one)
- [x] Counter on the card matches the amount in the order (matches on item id + variant)
- [x] Colors: cream card, dark red name, green price, black circle and counter, yellow only as shadow
- [x] Price and counter stuck to the bottom of the card (`margin-top: auto`)
- [x] Cards with a description show a red "ⓘ meer info" pill (and "✕ sluiten" when open)
- [x] Order section restyled as `bestelling` card: white box, yellow shadow, `+`/`−` counter like the cards, one price per line, phone number as a `tel:` link
- [x] Allergy note (yellow box) and preparation-time sentence next to the phone number added to the order card
- [x] Plastic bag note (bag with "per tasje" text) on the right side of the order card
- [x] Black strip under a tall order fixed (bottom margin moved into `.menu` padding)

**Other pages**
- [x] Over Ons: `@media` block closed, duplicate rules merged, whole CSS cleaned up
- [x] Over Ons: gallery of 9 images in 3 columns, one full-width rectangle with different heights per picture, darkened with hover reveal (no dark layer on touch screens)
- [x] Over Ons: catering card between story and gallery
- [x] Over Ons: refs typed with `useRef<HTMLDivElement>(null)` and a type guard, so the `observe` error is gone
- [x] Tijd & Locatie: `#fff` replaced by `var(--white)`, red right panel covers the full height, more top padding
- [x] Tijd & Locatie: today's opening hours row is highlighted (`openingstijden-rij--vandaag`)
- [x] Nav logo is a red circle on the Tijd & Locatie page (`navigatie--donker`)
- [x] Home page: image dims/slides off-screen on narrow windows with a gradient so the text stays readable

**Animations**
- [x] Router changed from `BrowserRouter` to `createBrowserRouter` + `RouterProvider` (`App.tsx` is the layout with `<Outlet />`, routes live in `main.tsx`)
- [x] Shared-element transition: nav logo letters morph into the home title (and back), without the fade (`::view-transition-old` hidden)
- [x] Nav morph between home and other pages (`view-transition-name: nav-links`)
- [x] Bowl (kom) morphs into the round category header with `document.startViewTransition` + `flushSync`, only the clicked kom gets the name


## Rule for extras
| `getMaxExtras` | Meaning |
|---|---|
| `-1` | No extras, no popup (soups, side dishes) |
| `0` | One free choice, no fee (combo menu variant A) |
| `1` or more | That many paid extras |

---

# Day log

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

## 20-21 October 2026
- Styled the menu page from the design: categories with Chinese names, header, cards, fade-in animations.
- Categories now come from one `categories` block in `menu.json` (`matches` groups the old categories).
- Learned that `flatMap` needs one explicit type (`Card[]`) when two branches return different shapes.
- Cards: variants as their own card, hover info only if there is an image or description (`kaart--info`).
- Counter matches the order by item id + variant name, because the order line name is "dish - variant".
- Colors: each color gets one job. Learned `margin-top: auto` pushes an element to the bottom of a flex column.

## 26 October 2026
- Popup: the overlay covers the screen and the box sizes itself to its content. `opacity` fades everything inside, so transparency goes on the background color only.
- Learned `color-mix(in srgb, COLOR 90%, transparent)`: a `var()` can't take a comma and an alpha value.
- Class names in CSS and JSX must match exactly (`.select` vs `selection-section`).
- Over Ons: an unclosed `@media` block made later rules apply only on mobile. A fixed `height` with `overflow: hidden` crops an image.
- Collage: flex columns with `flex: N 1 0` per picture give different heights that still add up to one rectangle; `object-fit: cover` fills each tile.
- Margin collapsing: the bottom margin of the last child can land outside the parent and show the body background.
- View transitions: React Router's `viewTransition` prop only works with a data router (`createBrowserRouter`), not `<BrowserRouter>`. A `view-transition-name` may exist only once at a time.
- For state changes (not page changes) start the transition yourself with `document.startViewTransition` and `flushSync`.
- `min-height: 100%` doesn't resolve in a grid item without a fixed parent height; grid items already stretch.

## 27 October 2026
- Highlight today: `if` isn't allowed inside JSX, so put a condition in the `className` instead. Don't reuse a variable name inside `map` (it hides the outer one), and `day[2]` reads a letter of a string, not the third item of the row.
- `useRef(null)` needs a type (`useRef<HTMLDivElement>(null)`), and `.filter(Boolean)` doesn't narrow types: use a type guard (`el is HTMLDivElement`).
- Price: one function per order line (`getLineTotal`), used inside `getOrderTotal` and in the line itself, so the sum exists once.
- `??` is calculated after `+`, so it needs parentheses: `a + (b ?? 0)`.
- `?.` is for reading a property, not for a plain number.
- A helper that returns a new array must not use `(prev) => ...` (that only works inside a state setter) and must not change the old array: `const next = [...selectedExtras]`, never `= selectedExtras`.
- Every branch of a function must `return` something, and a ternary is `a ? b : c` (not `??`).
- With one dropdown `i` is always 0, so "return `[chosen]`" and "copy and replace position `i`" are the same: one branch less.