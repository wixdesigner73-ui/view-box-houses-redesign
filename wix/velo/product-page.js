// Page code for the Products dynamic item page  (/homes/{category}/{slug}?c=wood)
// Elements: #heroGallery (Pro Gallery / Slider gallery), #colorRepeater (repeater: #swatch Box, #swatchName text),
//   #colorTitle (text), #colorGallery, #pendingNote (text), #styleRepeater/#roomTabs (or buttons), #viewer (gallery),
//   #planTabs (tabs/repeater), #planImage (image), #cfgRepeater (repeater: #optName, #optPrice, #optCheck checkbox),
//   #tabRecommended / #tabOptional (buttons), #baseText, #recText, #addText, #totalText, #offerBtn
import wixData from 'wix-data';
import wixLocationFrontend from 'wix-location-frontend';
import wixWindowFrontend from 'wix-window-frontend';

const fmt = (n) => '€' + Number(n).toLocaleString('en-US');
let product, colors = [], current;

$w.onReady(async () => {
  product = $w('#dynamicDataset').getCurrentItem();
  [colors, ] = await Promise.all([loadColors(), initConfigurator(), initInterior(), initPlans()]);
  const wanted = wixLocationFrontend.query.c;                          // ?c=green from a category card
  current = colors.find((c) => c.colorKey === wanted) || colors.find((c) => c.colorKey === product.defaultColor) || colors[0];
  initColorPicker();
  selectColor(current);
});

/* ---------- exterior colour → gallery ---------- */
async function loadColors() {
  const { items } = await wixData.query('ProductColors').eq('product', product.slug).ascending('sortOrder').find();
  return items;
}
function initColorPicker() {
  $w('#colorRepeater').onItemReady(($item, c) => {
    $item('#swatch').style.backgroundColor = c.swatchHex;
    $item('#swatchName').text = c.colorName;
    $item('#swatch').onClick(() => selectColor(c));
  });
  $w('#colorRepeater').data = colors;
}
function selectColor(c) {
  current = c;
  const hasRender = c.aiImages && c.aiImages.length || c.studioImage;
  $w('#pendingNote')[hasRender ? 'hide' : 'show']();
  if (!hasRender) return;
  // AI/lifestyle renders FIRST, then interior shots, then the studio render (client request)
  const toItem = (src, i) => ({ type: 'image', src, title: `${product.name} – ${c.colorName}`, slug: `img-${i}` });
  const exterior = [...(c.aiImages || []), ...(c.studioImage ? [c.studioImage] : [])];
  $w('#heroGallery').items = [...(c.aiImages || []), ...interiorPreview, ...(c.studioImage ? [c.studioImage] : [])].map(toItem);
  $w('#colorGallery').items = exterior.map(toItem);
  $w('#colorTitle').text = `See ${product.name} in ${c.colorName}`;
  wixLocationFrontend.queryParams.add({ c: c.colorKey });   // keeps the chosen colour shareable
}

/* ---------- interior styles ---------- */
let interiorPreview = [];
async function initInterior() {
  const { items } = await wixData.query('InteriorImages').eq('product', product.slug).ascending('sortOrder').limit(100).find();
  if (!items.length) return $w('#interiorSection').collapse();
  const family = items.filter((i) => i.style === 'family');
  interiorPreview = ['living', 'kitchen', 'bedroom', 'bathroom'].map((r) => (family.find((i) => i.room === r) || {}).image).filter(Boolean);
  let style = 'family', room = 'living';
  const render = () => { $w('#viewer').items = items.filter((i) => i.style === style && i.room === room).map((i) => ({ type: 'image', src: i.image })); };
  ['family', 'luxury', 'quiet'].forEach((s) => $w(`#style_${s}`).onClick(() => { style = s; render(); }));
  ['living', 'kitchen', 'bedroom', 'bathroom'].forEach((r) => $w(`#room_${r}`).onClick(() => { room = r; render(); }));
  render();
}

/* ---------- floor-plan tabs ("Floor Plan 1 | Floor Plan 2 …") ---------- */
async function initPlans() {
  const { items } = await wixData.query('FloorPlans').eq('product', product.slug).ascending('sortOrder').find();
  if (!items.length) return $w('#planSection').collapse();        // never show invented plans
  $w('#planImage').src = items[0].image;
  if (items.length === 1) return $w('#planTabs').collapse();
  $w('#planTabs').onItemReady(($item, p) => { $item('#planTabBtn').label = p.label; $item('#planTabBtn').onClick(() => ($w('#planImage').src = p.image)); });
  $w('#planTabs').data = items;
}

/* ---------- configurator (data from the client's add-ons sheet) ---------- */
async function initConfigurator() {
  const { items } = await wixData.query('AddOns').eq('product', product.slug).ascending('sortOrder').limit(100).find();
  if (!items.length) return $w('#configSection').collapse();
  const state = new Map(items.map((o) => [o._id, o.defaultSelected]));
  let tab = 'recommended';
  const total = () => {
    const sum = (g) => items.filter((o) => o.group === g && state.get(o._id)).reduce((s, o) => s + o.price, 0);
    $w('#baseText').text = fmt(product.price); $w('#recText').text = '+' + fmt(sum('recommended')); $w('#addText').text = '+' + fmt(sum('optional'));
    $w('#totalText').text = fmt(product.price + sum('recommended') + sum('optional')) + ' + VAT';
  };
  $w('#cfgRepeater').onItemReady(($item, o) => {
    $item('#optName').text = o.name; $item('#optPrice').text = '+' + fmt(o.price);
    $item('#optCheck').checked = state.get(o._id);
    $item('#optCheck').onChange((e) => { state.set(o._id, e.target.checked); total(); });
  });
  const show = () => { $w('#cfgRepeater').data = items.filter((o) => o.group === tab); };
  $w('#tabRecommended').onClick(() => { tab = 'recommended'; show(); });
  $w('#tabOptional').onClick(() => { tab = 'optional'; show(); });
  $w('#offerBtn').onClick(() => wixWindowFrontend.openLightbox('RequestOffer', { product, selected: items.filter((o) => state.get(o._id)) }));
  show(); total();
}
