# CMS collections (Wix Studio → CMS)

Create these collections, then import the matching file from `seed/` (CMS → collection → Import CSV/JSON; convert JSON to CSV if you prefer the importer).
Child collections join to their parent on the **text slug** (not a Wix reference field) — this keeps the import one-step and the Velo code simple.

| Collection | Field (type) | Notes |
|---|---|---|
| **Categories** | slug (text, unique), name, badge, eyebrow, titleLine1, titleLine2, lead, cardTagline, listTitle, listLead (text) · layout (text: grid / feature / columns / rows) · rating (number), reviewCount (number), fromPerM2 (number) · heroImage, cardImage (image) · features, strip (text/JSON or a multi-ref) · sortOrder (number) | Drives the homepage "Find your View Box" cards and every category hero. "Homes from €…" is **computed** from the cheapest listed product. |
| **Products** | slug (unique), name, category (text = category slug), kind (capsule/tiny/expandable/modular/floating/mobile) · area, bedrooms, livingRooms, bathrooms, kitchens (number) · layoutLabel, sleeps, areaLabel, tagline, description, dimensions, weight, powerSupply, designNote (text) · price, originalPrice, pricePerM2 (number) · rating, reviewCount · balcony (boolean) · tourUrl (URL) · defaultColor (text) · listed, inDevelopment (boolean) · specs (JSON/array of label+value) · sortOrder | Never invent values: leave a field empty and the Velo code hides the row. |
| **ProductColors** *(the colour → image feature)* | product (text = product slug) · colorKey (text) · colorName (text) · swatchHex (text, e.g. `#c68c58`) · description (text, optional) · aiImages (media gallery / multi-image) · studioImage (image) · sortOrder | One row per product × colour. **Clicking a swatch swaps the page image to `aiImages[0]`** (AI/lifestyle renders are always shown first, then `studioImage`). A row with no images means "render coming soon". |
| **InteriorImages** | product (text slug), style (family / luxury / quiet), room (living / kitchen / bedroom / bathroom), image, sortOrder | Maps to "Family Living / Expensive Luxury / Quiet Luxury" tabs. |
| **FloorPlans** | product (text slug), label (text, "Floor Plan 1"), image, sortOrder | Tabs appear automatically when a product has more than one row. Expandable-container plans are still **to be supplied**. |
| **AddOns** | product (text slug), name, price (number), group (recommended / optional), defaultSelected (boolean), sortOrder | Imported from the client's *Prețuri & Add-ons* sheet (EUR excl. VAT). |
| **Showrooms** | slug (unique), city, country, venue, address · **status** (Open / By appointment / Opening soon / Unavailable) · statusMessage, hours, contactName, phone · latitude, longitude, mapsUrl · showOnHome (boolean) · sortOrder | **Change `status` (and `statusMessage`) in the CMS and the showroom card, the homepage pill dot and the button label all update.** |
| **VisitRequests** | showroom (text slug), name, email, phone, preferredDate, preferredTime, model, message, createdAt | Written by the *Schedule a Visit* lightbox through `backend/visitRequests.web.js`. Permissions: Anyone can *insert* (via backend only), only admins read. |
| **Deliveries** | slug, title, subtitle, location, category (text slug), product (text slug), image, featured (boolean), sortOrder | `?model=` / `?cat=` filtering is done on the page. All current images are placeholders (`imageIsPlaceholder`). |
| *Blog* | use the **Wix Blog** app | `BlogPosts_reference.json` only holds the two existing posts for reference. |

**Dynamic pages**
- `Categories (Title)` → `/homes/{slug}` – category page
- `Products (Title)` → `/homes/{category}/{slug}` – product page
- `Showrooms` – a normal page with a repeater (so `/showrooms?s=brasov` works)
- `Deliveries` – a normal page with a repeater
