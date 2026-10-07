// Homepage code.
// Elements: #pillsRepeater (repeater with #pillBtn button, #pillDot status dot), #findRepeater (category cards)
import wixData from 'wix-data';
import wixLocationFrontend from 'wix-location-frontend';

const DOT = { 'Open': '#3ecf8e', 'By appointment': '#e4ac3f', 'Opening soon': '#7aa7ff', 'Unavailable': '#98a1b0' };

$w.onReady(async () => {
  /* showroom pills → open the Showrooms page at THAT showroom (not just the top of the page) */
  const { items: showrooms } = await wixData.query('Showrooms').eq('showOnHome', true).ascending('sortOrder').find();
  $w('#pillsRepeater').onItemReady(($item, s) => {
    $item('#pillBtn').label = s.city;
    $item('#pillDot').style.backgroundColor = DOT[s.status];
    $item('#pillBtn').onClick(() => wixLocationFrontend.to(`/showrooms?s=${s.slug}#${s.slug}`));
  });
  $w('#pillsRepeater').data = showrooms;

  /* "Find your View Box": price figures are derived from the data, never typed in */
  const { items: cats } = await wixData.query('Categories').ascending('sortOrder').find();
  const { items: products } = await wixData.query('Products').eq('listed', true).limit(100).find();
  $w('#findRepeater').onItemReady(($item, c) => {
    const prices = products.filter((p) => p.category === c.slug && p.price).map((p) => p.price);
    $item('#catName').text = c.name; $item('#catTagline').text = c.cardTagline;
    $item('#catRating').text = c.reviewCount ? `★ ${c.rating}/5 (${c.reviewCount} reviews)` : 'No reviews yet';
    $item('#catPerM2').text = `From €${c.fromPerM2.toLocaleString('en-US')} + VAT/m²`;
    $item('#catFrom').text = `Homes from €${Math.min(...prices).toLocaleString('en-US')} + VAT`;
    $item('#catBtn').onClick(() => wixLocationFrontend.to(`/homes/${c.slug}`));
  });
  $w('#findRepeater').data = cats;
});
