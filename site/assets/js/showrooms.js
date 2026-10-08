/* Showrooms page – deep-linkable (showrooms.html?s=brasov#brasov), status-driven, Schedule-a-Visit modal, Google Maps directions */
window.VBPage = function (UI) {
  const { $, $$, ico, img, params, openModal, setBg } = UI;
  const VB = window.VB;
  const S = VB.SITE.social;
  setBg(VB.BG.showrooms);

  const mapsUrl = (s) => `https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lng}`;
  const statusPill = (s) => `<span class="status status--${s.status}"><i></i>${VB.STATUS_LABEL[s.status]}</span>`;

  function card(s) {
    const visitable = s.status !== "unavailable";
    const visitLabel = s.status === "soon" ? "Get notified" : s.status === "appointment" ? "Book an Appointment" : "Schedule a Visit";
    return `<article class="srcard reveal" id="${s.slug}" data-slug="${s.slug}">
      <div class="srcard__top"><h3>${s.city}<small>${s.venue}</small></h3>${statusPill(s)}</div>
      ${s.status === "unavailable" ? `<p class="msg">${s.message || "This showroom is currently unavailable."}</p>` : s.message ? `<p class="msg">“${s.message}”</p>` : ""}
      <dl>
        <div>${ico("pin")}<dd style="margin:0">${s.address}</dd></div>
        ${s.hours ? `<div>${ico("clock")}<dd style="margin:0">${s.hours}</dd></div>` : s.status === "appointment" ? `<div>${ico("clock")}<dd style="margin:0">Visits by appointment</dd></div>` : ""}
        ${s.phone ? `<div>${ico("phone")}<dd style="margin:0">${s.contact ? s.contact + " · " : ""}<a href="tel:${s.phone.replace(/\s/g, "")}" style="text-decoration:underline">${s.phone}</a></dd></div>` : ""}
      </dl>
      <div class="srcard__actions">
        ${visitable ? `<button class="btn btn--dark btn--sm" data-visit="${s.slug}">${ico("calendar")} ${visitLabel}</button>` : ""}
        <a class="btn btn--outline btn--sm" href="${mapsUrl(s)}" target="_blank" rel="noopener">${ico("pin")} Directions</a>
      </div>
      <div class="srcard__social"><span>Follow us</span>
        <a href="${S.instagram}" aria-label="Instagram">${ico("instagram")}</a><a href="${S.facebook}" aria-label="Facebook">${ico("facebook")}</a><a href="${S.youtube}" aria-label="YouTube">${ico("youtube")}</a></div>
    </article>`;
  }

  const countries = [...new Set(VB.SHOWROOMS.map((s) => s.country))];
  const groups = countries.map((c) => `<div class="srgroup"><h2>${c}</h2><div class="srlist">${VB.SHOWROOMS.filter((s) => s.country === c).map(card).join("")}</div></div>`).join("");

  $("#main").innerHTML = `
    <section class="page-hero"><div class="page-hero__bg">${img(VB.BG.showrooms, "")}</div><div class="container reveal">
      <span class="eyebrow">Visit our showrooms</span><h1>Experience View Box in Person</h1><p>Step inside. Feel the quality. Meet our team.</p></div></section>
    <section class="section on-light"><div class="container"><div class="srlist" style="display:block">${groups}</div></div></section>`;

  /* schedule a visit */
  function visitModal(s) {
    const today = new Date().toISOString().slice(0, 10);
    openModal(`<div class="modal__head"><div><h3>${s.status === "soon" ? "Get notified" : "Schedule a visit"}</h3><p>${s.city} — ${s.venue}${s.hours ? `<br>${s.hours}` : ""}</p></div><button class="round-btn round-btn--ghost" data-close aria-label="Close">${ico("close")}</button></div>
      <form class="form" id="visit-form"><input type="hidden" name="showroom" value="${s.slug}">
        <div class="row"><label class="field">Full name<input required name="name" autocomplete="name"></label><label class="field">Phone<input required type="tel" name="phone" autocomplete="tel"></label></div>
        <label class="field">Email<input required type="email" name="email" autocomplete="email"></label>
        ${s.status === "soon" ? "" : `<div class="row"><label class="field">Preferred date<input type="date" name="date" min="${today}"></label>
          <label class="field">Preferred time<select name="time"><option>Morning</option><option>Midday</option><option>Afternoon</option></select></label></div>`}
        <label class="field">Which model would you like to see?<select name="model"><option value="">Not sure yet</option>${VB.PRODUCTS.filter((p) => p.listed && p.price).map((p) => `<option>${p.name}</option>`).join("")}</select></label>
        <label class="field">Message (optional)<textarea name="msg" rows="2"></textarea></label>
        <button class="btn btn--dark btn--block" type="submit">${s.status === "soon" ? "Notify me" : "Request visit"} ${ico("arrow")}</button></form>
      <div class="form-ok" id="visit-ok">${ico("checkCircle")}<h3 style="font-size:24px;color:var(--ink)">Request received</h3><p class="lead">We'll confirm your visit to ${s.city} shortly.</p><button class="btn btn--outline" data-close>Close</button></div>`,
      (m) => $("#visit-form", m).addEventListener("submit", (e) => { e.preventDefault(); e.target.style.display = "none"; $("#visit-ok", m).classList.add("show"); /* Wix: backend/visitRequest.web.js */ }));
  }
  $$("[data-visit]").forEach((b) => b.addEventListener("click", () => visitModal(VB.SHOWROOMS.find((s) => s.slug === b.dataset.visit))));

  /* deep link: scroll to + highlight the requested showroom */
  window.VBHash = function () {
    const slug = (location.hash || "").slice(1) || params.get("s");
    const el = slug && document.getElementById(slug);
    if (!el || !el.classList.contains("srcard")) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.add("flash"); setTimeout(() => el.classList.remove("flash"), 2600);
  };
  if (params.get("s") && !location.hash) setTimeout(window.VBHash, 80);
};
