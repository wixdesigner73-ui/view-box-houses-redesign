// Page code for the Deliveries dynamic item page  (/deliveries-1/{slug})
// Dataset: "Deliveries" (the page's #dynamicDataset). Redesign reference: site/delivery.html
//
// ── CMS fields used (names as shown in the collection; check each *field key* in the CMS field settings
//    and edit the FIELD map below if a key differs) ───────────────────────────────────────────────────
//   Sub-page Heading → H1 · Sub-page Subheading → sub heading · Sub-page Body (rich text) → article
//   Sub-page Photos (media gallery) → carousel + photo grid · City / Location + Country → eyebrow & details
//   House Model / House Tags → "Model" row · Card Image → fallback when there are no photos
//   Card Title / Card Summary / Card Video / Layout / Sort Order → used by the Deliveries list page cards
//
// ── Elements expected on the page (IDs) ────────────────────────────────────────────────────────────────
//   #eyebrow (text) · #heading (H1) · #subheading (text) · #bodyText (rich text, connect to Sub-page Body)
//   #heroGallery (slideshow/gallery) · #photoGrid (Pro Gallery, masonry, expand mode on) · #gallerySection (strip/section holding #photoGrid)
//   #detailLocation, #detailModel (text) · #detailModelLink, #offerBtn (buttons) · #photosBtn (button → #gallerySection)
//   #moreRepeater (repeater) containing #moreImage, #moreTitle, #moreLocation, #moreLink
//
// ── Look (set once in the editor; matches the prototype) ───────────────────────────────────────────────
//   Dark page, first photo as a fixed full-page background with an 85 % navy overlay (#060B15).
//   H1 Outfit Light 64/60/36 px, Title Case · body 17 px / 1.75, white at 82 % · first paragraph 28 px Outfit Light,
//   white · rich-text H2 34 px with a 44 px gold (#E4AC3F) rule above · bullets with a gold check icon.
import wixData from 'wix-data';

const FIELD = {
  heading: 'subPageHeading', subheading: 'subPageSubheading', body: 'subPageBody', photos: 'subPagePhotos',
  city: 'cityLocation', country: 'country', model: 'houseModel', cardImage: 'cardImage',
  cardTitle: 'cardTitle', sortOrder: 'sortOrder', slug: 'pageSlug',
};

// CMS stores the titles in capitals; show them in Title Case
const SMALL = new Set(['to', 'of', 'at', 'in', 'on', 'the', 'a', 'and']);
const titleCase = (t = '') => t.toLowerCase().split(' ')
  .map((w, i) => (i && SMALL.has(w) ? w : w.replace(/(^|-)(\S)/g, (m, sep, c) => sep + c.toUpperCase()))).join(' ');

$w.onReady(async () => {
  const d = $w('#dynamicDataset').getCurrentItem();                       // Deliveries item

  const place = [d[FIELD.city], d[FIELD.country]].filter(Boolean).join(', ');
  $w('#eyebrow').text = `Real project · ${place}`;
  $w('#heading').text = titleCase(d[FIELD.heading]);
  $w('#subheading').text = d[FIELD.subheading] || '';
  $w('#bodyText').html = d[FIELD.body] || '';                              // keeps h2, paragraphs and bullet lists
  $w('#detailLocation').text = place;

  // photos → hero carousel + masonry grid; no photos yet → one hero image (Card Image), grid hidden
  const photos = (d[FIELD.photos] || []).map((p) => ({ type: 'image', src: p.src, title: p.title || d[FIELD.heading], alt: p.alt || p.description || d[FIELD.heading] }));
  const items = photos.length ? photos : (d[FIELD.cardImage] ? [{ type: 'image', src: d[FIELD.cardImage], alt: d[FIELD.heading] }] : []);
  $w('#heroGallery').items = items;
  if (photos.length) {
    $w('#photoGrid').items = photos;                                       // click = Wix expand mode (lightbox)
    $w('#photosBtn').onClick(() => $w('#gallerySection').scrollTo());
  } else {
    $w('#gallerySection').collapse();
    $w('#photosBtn').collapse();
  }

  // linked model: "House Model" (e.g. Antalya) → Products.name
  if (d[FIELD.model]) {
    const { items: found } = await wixData.query('Products').eq('name', d[FIELD.model]).limit(1).find();
    const p = found[0];
    $w('#detailModel').text = d[FIELD.model];
    if (p) {
      $w('#detailModelLink').label = `View the ${p.name}`;
      $w('#detailModelLink').link = `/homes/${p.category}/${p.slug}`;
      $w('#offerBtn').link = `/contact?model=${p.slug}`;
    } else { $w('#detailModelLink').collapse(); }
  }

  // "More real projects": three other deliveries
  const { items: more } = await wixData.query('Deliveries').ne('_id', d._id).ascending(FIELD.sortOrder).limit(3).find();
  $w('#moreRepeater').onItemReady(($item, m) => {
    $item('#moreImage').src = m[FIELD.cardImage];
    $item('#moreTitle').text = titleCase(m[FIELD.cardTitle]);
    $item('#moreLocation').text = [m[FIELD.city], m[FIELD.country]].filter(Boolean).join(', ');
    $item('#moreLink').link = m['link-deliveries-1-title'] || m['link-deliveries-1-all'];  // auto dynamic-page link field (name depends on the page's URL pattern)
  });
  $w('#moreRepeater').data = more;
});
