// Page code for /showrooms.   Deep links:  /showrooms?s=brasov   (and  /showrooms#brasov via an anchor)
// Elements: #showroomsRepeater containing #container (Box), #city, #venue, #address, #hours, #contact (text),
//   #statusBadge (text/box), #statusMessage (text), #visitBtn, #directionsBtn (buttons), #socialStrip (group)
import wixData from 'wix-data';
import wixLocationFrontend from 'wix-location-frontend';
import wixWindowFrontend from 'wix-window-frontend';

const LABEL = { 'Open': 'Schedule a Visit', 'By appointment': 'Book an Appointment', 'Opening soon': 'Get notified', 'Unavailable': null };
const BADGE = { 'Open': '#146c43', 'By appointment': '#8a5a00', 'Opening soon': '#264fb0', 'Unavailable': '#5d6676' };

$w.onReady(async () => {
  const { items } = await wixData.query('Showrooms').ascending('sortOrder').find();

  $w('#showroomsRepeater').onItemReady(($item, s) => {
    $item('#city').text = s.city; $item('#venue').text = s.venue; $item('#address').text = s.address;
    s.hours ? ($item('#hours').text = s.hours, $item('#hours').show()) : $item('#hours').hide();
    $item('#contact').text = [s.contactName, s.phone].filter(Boolean).join(' · ');
    $item('#statusBadge').text = s.status.toUpperCase(); $item('#statusBadge').style.color = BADGE[s.status];
    s.statusMessage ? ($item('#statusMessage').text = s.statusMessage, $item('#statusMessage').show()) : $item('#statusMessage').hide();

    // status-driven button: unavailable showrooms get no booking button, only the message
    const label = LABEL[s.status];
    if (label) { $item('#visitBtn').label = label; $item('#visitBtn').show(); } else $item('#visitBtn').hide();
    $item('#visitBtn').onClick(() => wixWindowFrontend.openLightbox('ScheduleVisit', { showroom: s }));
    $item('#directionsBtn').link = s.mapsUrl; $item('#directionsBtn').target = '_blank';
  });
  $w('#showroomsRepeater').data = items;

  // scroll to + highlight the requested showroom
  const wanted = wixLocationFrontend.query.s || (wixLocationFrontend.url.split('#')[1] || '');
  if (wanted) {
    const target = items.find((s) => s.slug === wanted);
    if (target) {
      // wait until the repeater has rendered, then scroll to that item
      setTimeout(() => $w('#showroomsRepeater').forEachItem(($item, s) => {
        if (s._id !== target._id) return;
        $item('#container').scrollTo();
        $item('#container').style.borderColor = '#e4ac3f';
        setTimeout(() => ($item('#container').style.borderColor = '#e5e7eb'), 2600);
      }), 250);
    }
  }
});
