// Page code for the Categories dynamic item page  (/homes/{slug})
// Elements expected on the page (IDs): #productsRepeater (repeater) containing
//   #cardImage (image), #cardName, #cardWas, #cardPrice, #cardRating (text), #cardLink (button/arrow),
//   #sw1 … #sw5 (five small Box elements = colour swatches; unused ones are hidden), #finishLabel (text)
import wixData from 'wix-data';
import wixLocationFrontend from 'wix-location-frontend';

const MAX_SWATCHES = 5;

$w.onReady(async () => {
  const category = $w('#dynamicDataset').getCurrentItem();            // Categories item (child collections join on the text slug)
  const { items: products } = await wixData.query('Products')
    .eq('category', category.slug).eq('listed', true).ascending('sortOrder').find();

  // one query for every colour of every product on the page
  const { items: colors } = await wixData.query('ProductColors')
    .hasSome('product', products.map((p) => p.slug)).ascending('sortOrder').limit(200).find();
  const colorsByProduct = {};
  colors.forEach((c) => (colorsByProduct[c.product] ||= []).push(c));

  $w('#productsRepeater').onItemReady(($item, p) => {
    const list = colorsByProduct[p.slug] || [];
    const first = list.find((c) => c.colorKey === p.defaultColor) || list[0];

    $item('#cardName').text = p.name;
    $item('#cardPrice').text = p.price ? `From €${p.price.toLocaleString('en-US')} + VAT` : '';
    if (p.originalPrice) { $item('#cardWas').text = `€${p.originalPrice.toLocaleString('en-US')}`; $item('#cardWas').show(); } else $item('#cardWas').hide();
    $item('#cardRating').text = p.reviewCount ? `★ ${p.rating}/5 (${p.reviewCount} reviews)` : 'No reviews yet';
    showColor($item, p, first);

    // swatches – each one really swaps the picture
    for (let i = 1; i <= MAX_SWATCHES; i++) {
      const sw = $item(`#sw${i}`), c = list[i - 1];
      if (!c) { sw.hide(); continue; }
      sw.show();
      sw.style.backgroundColor = c.swatchHex;
      sw.onClick(() => showColor($item, p, c));
    }
  });
  $w('#productsRepeater').data = products;
});

function showColor($item, p, c) {
  const src = c && c.aiImages && c.aiImages.length ? c.aiImages[0] : c && c.studioImage;
  if (src) $item('#cardImage').src = src;                    // AI/lifestyle render first
  if ($item('#finishLabel')) $item('#finishLabel').text = c ? c.colorName + (c.description ? ' – ' + c.description : '') + (src ? '' : ' (render coming soon)') : '';
  // the card button/arrow opens the product page with the same colour selected
  $item('#cardLink').link = `/homes/${p.category}/${p.slug}?c=${c ? c.colorKey : ''}`;
}
