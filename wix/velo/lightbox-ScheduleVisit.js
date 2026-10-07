// Lightbox "ScheduleVisit" — opened from the Showrooms page.
// Elements: #lbTitle, #lbSub (text), #nameInput, #emailInput, #phoneInput, #dateInput (date picker), #timeDropdown,
//   #modelDropdown, #msgInput, #submitBtn, #formBox, #successBox
import wixWindowFrontend from 'wix-window-frontend';
import { submitVisitRequest } from 'backend/visitRequests.web';

$w.onReady(() => {
  const { showroom } = wixWindowFrontend.lightbox.getContext();
  $w('#lbTitle').text = showroom.status === 'Opening soon' ? 'Get notified' : 'Schedule a visit';
  $w('#lbSub').text = `${showroom.city} — ${showroom.venue}` + (showroom.hours ? `\n${showroom.hours}` : '');
  if (showroom.status === 'Opening soon') { $w('#dateInput').collapse(); $w('#timeDropdown').collapse(); }

  $w('#submitBtn').onClick(async () => {
    if (![$w('#nameInput'), $w('#emailInput'), $w('#phoneInput')].every((i) => i.valid)) return;
    $w('#submitBtn').disable();
    try {
      await submitVisitRequest({
        showroom: showroom.slug, name: $w('#nameInput').value, email: $w('#emailInput').value, phone: $w('#phoneInput').value,
        preferredDate: $w('#dateInput').value, preferredTime: $w('#timeDropdown').value, model: $w('#modelDropdown').value, message: $w('#msgInput').value,
      });
      $w('#formBox').collapse(); $w('#successBox').expand();
    } catch (e) { $w('#submitBtn').enable(); }
  });
});
