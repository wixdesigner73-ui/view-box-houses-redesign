# View Box Houses – redesign

Mobile-first redesign built from the client mockups, the existing site content and the supplied renders/price sheet.

| Folder | What it is |
|---|---|
| `site/` | **Working front-end prototype** (static HTML/CSS/JS, no build step). Open via any local server, e.g. `node tools/serve.js site 5173` → http://localhost:5173, or VS Code Live Server on `site/index.html`. |
| `wix/` | **Hand-off for Wix Studio**: CMS collection schema (`cms/collections.md`), seed data exported from the same source (`cms/seed/*.json`), and Velo page/backend code (`velo/`). |
| `tools/` | Scripts used to produce the above (image optimisation, add-on extraction from the xlsm, page + CMS export). Re-run `build-images.js`, `extract-addons.js`, `export-wix.js` if source files change. |

> **Not published to Wix.** There is no Wix connection in this environment, so nothing was pushed to the Wix Studio site. `site/` is the pixel-level reference/prototype and `wix/` is what to build/paste in the editor.

## What is implemented (all verified in a browser at 390 px and 1440 px)
- Homepage: cinematic hero, editorial *Real Projects* slider (replaces the old deliveries block), *Find your View Box*, showrooms with pills, global presence, news, CTA, minimal footer, live-chat button.
- Header: overlay/transparent over dark heroes, solid on scroll; mobile utility bar + hamburger drawer; desktop nav with Homes mega-menu, language selector, *Talk to Sales*.
- 5 category pages from one template (capsule grid, tiny feature card, expandable columns, modular & floating rows).
- **Colour swatches really swap the image** (category cards and product pages); products without a render for a colour show a hatched swatch + "render coming soon" instead of faking it.
- Product pages: AI/lifestyle renders first, colour picker + colour gallery, configurator (recommended/optional add-ons and live total from the client's price sheet — totals reconcile with the sheet), 3 interior styles × rooms, 360° tour links, 3D floor plan (+tabs when >1 plan), specs, FAQ, *Real Projects — {model}* banner → `deliveries.html?model=…` (no showroom list on product pages).
- Showrooms: all 6 existing locations, status field (Open / By appointment / Opening soon / Unavailable), **home pill → `showrooms.html?s=slug#slug` scrolls to and highlights that showroom**, Schedule-a-Visit modal, Directions → Google Maps.
- Deliveries (filterable), About, Blog, Post, Contact.

## Needs input from the client / known gaps
1. **Images not in the data folder** (placeholders in use; `?dev=1` on `deliveries.html` marks them): per-colour renders for Floating homes; all Tiny / Expandable / Modular galleries, floor plans (2D/3D) and exterior series; delivery-project photography; the **crane/sunset image** for the Deliveries hero and product banner (only a WhatsApp screenshot was received — send the original file; slot = `BG.deliveries` / `BG.banner` in `site/assets/js/data.js`); two-storey house renders.
2. Brand video URL (*Watch Video* shows "coming soon"), social profile URLs (icons link to `#`), the logo file (text logo used), the unavailable-showroom message wording.
3. Per-model **technical files** (the *Download Technical File* button from the mockup is omitted until files exist), customer-review texts (only rating + count are shown; wire the Wix Reviews app), delivery-cost data (shipping shows "quoted by our team").
4. Product-page content that is only in the mockup (London weight/power, standard-features copy, insulation U-values, expandable 37 m² spec table) was taken from the mockup — please confirm.

## Data discrepancies found (resolved in favour of product data, please confirm)
- Mockup home card: Expandable "From €430/m²" vs product data €15,500 / 37 m² = **€419** → €419 used.
- Mockup home card: Mobile & Floating "Homes from €49,900" vs site price of Lightning McQueen **€29,900** → price is derived from the cheapest listed product.
- Mockup option prices (e.g. Nordic insulation +€1,750, inverter +€500) differ from the price sheet (€2,650 / €750) → **sheet used**.
- Antalya works out at €829/m² vs the €839 headline for the capsule range (headline kept as given).
- Oslo only has three exterior renders (Graphite, Light Grey, Forest Green); other capsules have White/Dark Brown/Light Grey/Wood/Forest Green. Render→colour matching was done by eye (numbering differs per house) – worth a quick check.
