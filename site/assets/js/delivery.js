/* Delivery detail page: delivery.html?s=<slug>
   One template for every delivery. Wix CMS fields it needs: title (heading), subtitle (sub heading),
   gallery (images), body (rich text), location, product (text slug), category (text slug). */
window.VBPage = function (UI) {
  const { $, $$, ico, img, params, setBg, productUrl, categoryUrl } = UI;
  const VB = window.VB;
  const d = VB.DELIVERY_PAGES.find((x) => x.slug === params.get("s")) || VB.DELIVERY_PAGES[0];
  const product = VB.productBySlug(d.model), cat = VB.categoryBySlug(d.category);
  const alt = (i) => (d.alts && d.alts[i]) || `${d.title} – photo ${i + 1}`;
  const offer = `contact.html${product ? "?model=" + product.slug : ""}`;
  document.title = `${d.title} – View Box Houses`;
  setBg(d.gallery[0]);

  const more = VB.DELIVERY_PAGES.filter((x) => x.slug !== d.slug).concat(VB.FEATURED_PROJECTS);

  $("#main").innerHTML = `
  <section class="dhero"><div class="container dhero__in">
    <div class="dhero__copy reveal">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="deliveries.html">Deliveries</a><span>/</span><span>${d.location.split(",")[0]}</span></nav>
      <span class="eyebrow">Real project · ${d.location}</span>
      <h1>${d.title}</h1>
      <p class="dhero__sub">${d.subtitle}</p>
      <div class="btn-row"><a class="btn btn--light" href="#gallery">View all ${d.gallery.length} photos ${ico("arrow")}</a><a class="btn btn--ghost" href="${offer}">Talk to Sales</a></div>
    </div>
    <div class="dhero__media reveal" id="dh-stage" style="--d:.1s">
      ${d.gallery.map((s, i) => `<button class="dh__slide" data-i="${i}" aria-label="Open photo ${i + 1}">${img(s, alt(i))}</button>`).join("")}
      <div class="dh__nav"><button class="round-btn" data-prev aria-label="Previous photo">${ico("arrowLeft")}</button><button class="round-btn" data-next aria-label="Next photo">${ico("arrow")}</button></div>
      <span class="dh__count">1 / ${d.gallery.length}</span>
    </div>
  </div></section>

  <section class="dbody"><div class="container dbody__in">
    <article class="rich reveal">${d.body}</article>
    <aside class="dside reveal" style="--d:.08s"><div class="dside__card">
      <span class="eyebrow">Project details</span>
      <dl>
        <div><dt>Location</dt><dd>${d.location}</dd></div>
        ${product ? `<div><dt>Model</dt><dd><a href="${productUrl(product)}">${product.name}${product.area ? ` · ${product.area} m²` : ""}</a></dd></div>` : ""}
        ${cat ? `<div><dt>Range</dt><dd><a href="${categoryUrl(cat)}">${cat.name}</a></dd></div>` : ""}
      </dl>
      ${product ? `<a class="btn btn--light btn--block" href="${productUrl(product)}">View the ${product.name} ${ico("arrow")}</a>` : ""}
      <a class="btn btn--ghost btn--block" href="${offer}">Get a personalised offer</a>
    </div></aside>
  </div></section>

  <section class="dgal" id="gallery"><div class="container">
    <div class="sec-head reveal"><span class="eyebrow">Photo gallery</span><h2 class="h-section" style="margin-top:12px">See it for yourself</h2></div>
    <div class="masonry">${d.gallery.map((s, i) => `<button class="masonry__item reveal" data-i="${i}" aria-label="Open photo ${i + 1}">${img(s, alt(i))}</button>`).join("")}</div>
  </div></section>

  <section class="section on-dark" style="padding-top:0"><div class="container"><div class="cta-box reveal">
    <h2>Modern homes, delivered across Europe.</h2>
    <div class="btn-row" style="justify-content:center"><a class="btn btn--dark" href="deliveries.html">See all deliveries ${ico("arrow")}</a><a class="btn btn--outline" href="contact.html">Talk to Sales</a></div></div></div></section>

  <section class="section on-dark dmore"><div class="container">
    <div class="sec-head"><span class="eyebrow">More real projects</span></div>
    <div class="dgrid">${more.slice(0, 3).map((x) => {
      const page = VB.DELIVERY_PAGES.includes(x);
      const inner = `${img(page ? x.gallery[1] : x.image, x.title)}<div><small>${x.location}</small><h3>${x.title}</h3></div>`;
      return page ? `<a class="dcard" href="delivery.html?s=${x.slug}">${inner}</a>` : `<a class="dcard" href="deliveries.html#${x.slug}">${inner}</a>`;
    }).join("")}</div>
  </div></section>`;

  /* hero carousel */
  const stage = $("#dh-stage"), slides = $$(".dh__slide", stage), count = $(".dh__count", stage);
  let i = 0;
  const go = (n) => { i = (n + slides.length) % slides.length; slides.forEach((s, k) => s.classList.toggle("is-active", k === i)); count.textContent = `${i + 1} / ${slides.length}`; };
  $("[data-prev]", stage).addEventListener("click", (e) => { e.stopPropagation(); go(i - 1); });
  $("[data-next]", stage).addEventListener("click", (e) => { e.stopPropagation(); go(i + 1); });
  go(0);

  /* lightbox (a hero slide or any gallery tile opens it) */
  function openLightbox(start) {
    let n = start;
    const lb = document.createElement("div");
    lb.className = "lb"; lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true"); lb.setAttribute("aria-label", "Photo viewer");
    lb.innerHTML = `<button class="lb__close round-btn round-btn--ghost" aria-label="Close">${ico("close")}</button>
      <img alt=""><button class="lb__prev round-btn" aria-label="Previous">${ico("arrowLeft")}</button><button class="lb__next round-btn" aria-label="Next">${ico("arrow")}</button><span class="lb__count"></span>`;
    document.body.appendChild(lb); document.body.style.overflow = "hidden";
    const im = $("img", lb);
    const show = (k) => { n = (k + d.gallery.length) % d.gallery.length; im.src = d.gallery[n]; im.alt = alt(n); $(".lb__count", lb).textContent = `${n + 1} / ${d.gallery.length}`; };
    const close = () => { lb.remove(); document.body.style.overflow = ""; document.removeEventListener("keydown", key); };
    const key = (e) => { if (e.key === "Escape") close(); if (e.key === "ArrowRight") show(n + 1); if (e.key === "ArrowLeft") show(n - 1); };
    document.addEventListener("keydown", key);
    $(".lb__close", lb).addEventListener("click", close);
    $(".lb__prev", lb).addEventListener("click", () => show(n - 1));
    $(".lb__next", lb).addEventListener("click", () => show(n + 1));
    lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
    let x0 = null;
    lb.addEventListener("pointerdown", (e) => (x0 = e.clientX));
    lb.addEventListener("pointerup", (e) => { if (x0 !== null && Math.abs(e.clientX - x0) > 50) show(n + (e.clientX < x0 ? 1 : -1)); x0 = null; });
    show(n);
  }
  $$("[data-i]").forEach((b) => b.addEventListener("click", () => openLightbox(+b.dataset.i)));
};
