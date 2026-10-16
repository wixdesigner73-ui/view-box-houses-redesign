// Page code for the Deliveries dynamic item page  (/deliveries-1/{title})
// Dataset: "Deliveries" (connected to the page as #dynamicDataset). Redesign in site/delivery.html.
//
// Elements expected on the page (IDs):
//   #heading (H1, ← title)            #subheading (text, ← subtitle)       #eyebrow (text)
//   #bodyText (Rich text / "Paragraph text" field – connect to `body`, keep its headings and bullet lists)
//   #heroGallery (Pro Gallery or Slideshow, ← gallery)      #photoGrid (Pro Gallery, Masonry layout, ← gallery)
//   #detailLocation, #detailModel (text)   #detailModelLink (button → product page)   #offerBtn (button → /contact)
//   #moreRepeater (repeater) containing #moreImage, #moreTitle, #moreLocation, #moreLink
//
// Styling (do once in the editor, matches the prototype): dark page background with the first gallery image
// as a full-bleed strip + 85 % navy overlay; H1 Outfit Light 64/60/36 px; body text 17 px / 1.75, colour #FFFFFF @ 82 %;
// the rich-text h2 gets a 44 px gold (#E4AC3F) rule above it; bullets use a gold check icon.
import wixData from 'wix-data';
import wixLocationFrontend from 'wix-location-frontend';

$w.onReady(async () => {
  const d = $w('#dynamicDataset').getCurrentItem();            // Deliveries item (CMS)

  // heading / sub heading / paragraph text are bound to the dataset in the editor; set here only as a fallback
  if ($w('#eyebrow').rendered) $w('#eyebrow').text = `Real project · ${d.location || ''}`;
  $w('#detailLocation').text = d.location || '';

  // gallery → hero slideshow + masonry grid (same images)
  const items = (d.gallery || []).map((g) => ({ type: 'image', src: g.src, title: g.title || d.title, alt: g.alt || d.title }));
  $w('#heroGallery').items = items;
  $w('#photoGrid').items = items;                               // click opens Wix's built-in lightbox (expand mode)

  // linked model (text slug → Products)
  if (d.product) {
    const { items: found } = await wixData.query('Products').eq('slug', d.product).limit(1).find();
    const p = found[0];
    if (p) {
      $w('#detailModel').text = p.name;
      $w('#detailModelLink').label = `View the ${p.name}`;
      $w('#detailModelLink').link = `/homes/${p.category}/${p.slug}`;
      $w('#offerBtn').link = `/contact?model=${p.slug}`;
    }
  }

  // "More real projects": three other deliveries
  const { items: more } = await wixData.query('Deliveries')
    .ne('slug', d.slug).descending('featured').ascending('sortOrder').limit(3).find();
  $w('#moreRepeater').onItemReady(($item, m) => {
    $item('#moreImage').src = m.image;
    $item('#moreTitle').text = m.title;
    $item('#moreLocation').text = m.location || '';
    $item('#moreLink').link = m['link-deliveries-1-title'];       // auto-generated dynamic-page link field
  });
  $w('#moreRepeater').data = more;
});
