/* View Box Houses – shared shell: icons, header, footer, helpers, reusable components */
(function () {
  const VB = window.VB;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ---------- icons ---------- */
  const P = {
    arrow: "M5 12h14M13 6l6 6-6 6", arrowLeft: "M19 12H5M11 6l-6 6 6 6", arrowUpRight: "M7 17L17 7M8 7h9v9",
    chev: "M6 9l6 6 6-6", menu: "M4 7h16M4 12h16M4 17h16", close: "M6 6l12 12M18 6L6 18", plus: "M12 5v14M5 12h14",
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3.2 3.2 3.2 14.8 0 18M12 3c-3.2 3.2-3.2 14.8 0 18"/>',
    phone: "M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z",
    truck: '<path d="M2.5 6.5h11v9.5h-11zM13.5 9.5h4l3 3.2V16h-7"/><circle cx="7" cy="17.5" r="1.7"/><circle cx="17" cy="17.5" r="1.7"/>',
    shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM8.5 12l2.5 2.5 4.5-5",
    leaf: "M5 19C5 10 10 5 20 5c0 10-5 15-14 15M5 19l8-8",
    users: '<circle cx="9" cy="8" r="3"/><path d="M3 19c0-3 2.7-5 6-5s6 2 6 5"/><circle cx="17.2" cy="9" r="2.2"/><path d="M16.5 14c2.8 0 4.7 1.7 4.7 4.5"/>',
    home: "M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10",
    diamond: "M6.5 4h11L22 9.5 12 21 2 9.5zM2 9.5h20M9 4l3 5.5L15 4M12 21L8.5 9.5M12 21l3.5-11.5",
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>',
    waves: "M3 8c2-2 4-2 6 0s4 2 6 0 4-2 6 0M3 13c2-2 4-2 6 0s4 2 6 0 4-2 6 0M3 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0",
    building: "M5 21V4h9v17M14 9h5v12M8 8h3M8 12h3M8 16h3M3 21h18",
    layers: "M12 3l9 5-9 5-9-5zM3 12.5l9 5 9-5M3 17l9 5 9-5",
    pin: '<path d="M12 21s7-6 7-11.5a7 7 0 00-14 0C5 15 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    star: "M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4L2.8 9.5l6.4-.8z",
    bed: "M3 19V6M3 15h18v4M21 15v-2.5A3 3 0 0018 9.5h-8V15M7 12.5a1.6 1.6 0 100-3.2 1.6 1.6 0 000 3.2z",
    sofa: "M5 11V8a3 3 0 013-3h8a3 3 0 013 3v3M3 13.5a2 2 0 014 0V15h10v-1.5a2 2 0 014 0V19H3zM5.5 19v1.5M18.5 19v1.5",
    bath: "M4 12h16v3a4 4 0 01-4 4H8a4 4 0 01-4-4zM6 12V6.5A2 2 0 019.6 5.3M7.5 19L6.5 21M16.5 19l1 2",
    kitchen: "M4 3h16v18H4zM4 10h16M8 6.5h2M14 6.5h2M8 14v3",
    wheel: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.6"/><path d="M12 3v6.4M12 14.6V21M3 12h6.4M14.6 12H21M5.6 5.6l4.5 4.5M13.9 13.9l4.5 4.5M18.4 5.6l-4.5 4.5M10.1 13.9l-4.5 4.5"/>',
    play: "M8 5l11 7-11 7z", chat: "M4 5h16v11H10l-5 4v-4H4zM8 9h8M8 12h5",
    whatsapp: "M3 21l1.6-4.8A8.5 8.5 0 1112 20.5a8.4 8.4 0 01-4-1zM9 8.5c0 3 3.5 6.5 6.5 6.5l1-1.7-2-1-1 .7a5 5 0 01-2-2l.7-1-1-2z",
    download: "M12 4v11M7 11l5 5 5-5M5 20h14", check: "M5 12l5 5L20 7",
    checkCircle: '<circle cx="12" cy="12" r="9.5"/><path d="M7.5 12.3l3 3 6-6.3"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".7"/>',
    facebook: "M13.5 21v-8h2.7l.5-3.2h-3.2V7.9c0-.9.4-1.7 1.8-1.7h1.5V3.4S15.1 3.2 14 3.2c-2.3 0-3.8 1.4-3.8 3.9v2.7H7.5V13h2.7v8z",
    youtube: '<rect x="2.5" y="6" width="19" height="12" rx="3.5"/><path d="M10 9.5v5l4.5-2.5z"/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10.5V17M8 7.2v.1M12 17v-3.8a2.4 2.4 0 014.8 0V17M12 10.5V17"/>',
    orbit: '<ellipse cx="12" cy="12" rx="10" ry="4.2"/><circle cx="12" cy="12" r="1.5"/><path d="M12 3a9 9 0 00-4 8M12 21a9 9 0 004-8"/>',
    scroll: "M12 4v15M6 13.5l6 6 6-6", calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    chart: "M5 20v-9M12 20V4M19 20v-6", mail: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 7.5L12 13l8.5-5.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5"/>',
    maximize: "M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5",
    box: "M12 3l8 4.5v9L12 21l-8-4.5v-9zM4 7.5l8 4.5 8-4.5M12 12v9",
    bolt: "M13 2.5L5 14h6l-1 7.5L19 10h-6.2z",
    door: "M7 3h10v18H7zM14 12v.01M3 21h18",
  };
  const FILLED = new Set(["play", "star", "facebook"]);
  function ico(name, cls = "") {
    const d = P[name] || P.arrow;
    const inner = d.startsWith("<") ? d : `<path d="${d}"/>`;
    return `<svg class="ico ${FILLED.has(name) ? "ico--fill" : ""} ${cls}" viewBox="0 0 24 24" aria-hidden="true">${inner}</svg>`;
  }

  /* ---------- small helpers ---------- */
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const fmtDate = (iso) => new Date(iso + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  const params = new URLSearchParams(location.search);
  const safe = (fn) => { try { return fn(); } catch (e) { return null; } };

  function rate(r, n, opts = {}) {
    if (!n) return `<span class="rate"><span class="stars stars--empty">${ico("star")}</span><span>No reviews yet</span></span>`;
    return `<span class="rate"><span class="stars">${ico("star")}</span><b>${r}/5</b><span>(${n} ${n === 1 ? "review" : "reviews"})</span></span>`;
  }
  function stars5(r) {
    return `<span class="stars">${[1, 2, 3, 4, 5].map((i) => ico("star")).join("")}</span>`;
  }
  function featureList(list, cls = "") {
    return `<ul class="features ${cls}">${list.map(([i, t]) => `<li>${ico(i)}<span>${t}</span></li>`).join("")}</ul>`;
  }
  function productUrl(p, color) { return `product.html?p=${p.slug}${color ? "&c=" + color : ""}`; }
  function categoryUrl(c) { return `category.html?c=${c.slug}`; }
  function img(src, alt = "", extra = "") { return `<img src="${src}" alt="${esc(alt)}" loading="lazy" decoding="async" ${extra}>`; }

  /* ---------- reveal on scroll ---------- */
  function reveal() {
    const els = $$(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) return els.forEach((e) => e.classList.add("in"));
    const io = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { threshold: .12, rootMargin: "0px 0px -6% 0px" });
    els.forEach((e) => io.observe(e));
  }

  /* ---------- modal ---------- */
  function openModal(html, onOpen) {
    closeModal();
    const m = document.createElement("div");
    m.className = "modal open"; m.id = "modal";
    m.innerHTML = `<div class="modal__box" role="dialog" aria-modal="true">${html}</div>`;
    document.body.appendChild(m);
    document.body.style.overflow = "hidden";
    m.addEventListener("click", (e) => { if (e.target === m || e.target.closest("[data-close]")) closeModal(); });
    document.addEventListener("keydown", escClose);
    const first = $("input,select,textarea,button", m); first && first.focus();
    onOpen && onOpen(m);
    return m;
  }
  function escClose(e) { if (e.key === "Escape") closeModal(); }
  function closeModal() { const m = $("#modal"); if (m) m.remove(); document.body.style.overflow = ""; document.removeEventListener("keydown", escClose); }

  /* ---------- image crossfade ---------- */
  function swapImage(imgEl, src) {
    if (!imgEl || imgEl.getAttribute("src") === src) return;
    const pre = new Image();
    imgEl.classList.add("fade-out");
    pre.onload = pre.onerror = () => { setTimeout(() => { imgEl.src = src; imgEl.classList.remove("fade-out"); }, 120); };
    pre.src = src;
  }

  /* ---------- colour swatches ----------
     Every swatch is driven by product.media — clicking swaps the real render. */
  function swatches(p, selected, size = "") {
    return `<div class="swatches" role="radiogroup" aria-label="Exterior colour">${p.colors.map((c) => {
      const col = VB.COLORS[c];
      const has = !!p.media[c];
      return `<button type="button" class="sw ${size} ${has ? "" : "is-pending"}" role="radio" aria-checked="${c === selected}" aria-label="${col.name}" title="${col.name}" data-c="${c}" style="--c:${col.hex}"></button>`;
    }).join("")}</div>`;
  }
  /* wires swatches inside `root`; calls onPick(color, hasRender) */
  function bindSwatches(root, onPick) {
    root.addEventListener("click", (e) => {
      const b = e.target.closest(".sw");
      if (!b) return;
      e.preventDefault(); e.stopPropagation();
      $$(".sw", root).forEach((s) => s.setAttribute("aria-checked", s === b));
      onPick(b.dataset.c, !b.classList.contains("is-pending"));
    });
  }

  /* ---------- product card: compact (capsule grid) ---------- */
  function productCard(p) {
    const color = p.defaultColor;
    return `<article class="pcard reveal" data-slug="${p.slug}">
      <a class="stretch" href="${productUrl(p)}" aria-label="${esc(p.name)} – view details"></a>
      <div class="pcard__img">${img(VB.cardImage(p, color), p.name + " exterior")}</div>
      <div class="pcard__body">
        <h3>${p.name}</h3>
        ${p.original ? `<div class="was">${VB.money(p.original)}</div>` : ""}
        <div class="now">From ${VB.money(p.price)} + VAT</div>
        ${rate(p.rating, p.reviews)}
        <div class="pcard__foot">${swatches(p, color)}<a class="round-btn" href="${productUrl(p)}" aria-label="View ${esc(p.name)}">${ico("arrow")}</a></div>
      </div></article>`;
  }
  function bindProductCards(root) {
    $$(".pcard", root).forEach((card) => {
      const p = VB.productBySlug(card.dataset.slug);
      const im = $(".pcard__img img", card), link = $(".round-btn", card), stretch = $(".stretch", card);
      bindSwatches(card, (c) => {
        swapImage(im, VB.cardImage(p, c));
        link.href = stretch.href = productUrl(p, c);
      });
    });
  }

  /* ---------- product card: detailed ---------- */
  function specItem(icon, big, small) { return `<div class="spec">${ico(icon)}<div><b>${big}</b><small>${small}</small></div></div>`; }
  function modelCard(p) {
    const color = p.defaultColor, col = VB.COLORS[color];
    const specs = [];
    if (p.area) specs.push(specItem("home", `${p.area} m²`, p.areaLabel || "total area"));
    if (p.feature) specs.push(specItem(p.feature[0], p.feature[1], p.feature[2]));
    if (p.bedrooms) specs.push(specItem("bed", p.bedrooms, p.bedrooms === 1 ? "Bedroom" : "Bedrooms"));
    if (p.living) specs.push(specItem("sofa", p.living, "Living room"));
    if (p.bathrooms) specs.push(specItem("bath", p.bathrooms, p.bathrooms === 1 ? "Bathroom" : "Bathrooms"));
    if (p.kitchens) specs.push(specItem("kitchen", p.kitchens, "Kitchen"));
    const single = p.colors.length === 1;
    const priceLines = [];
    if (p.kind === "floating") priceLines.push(`<div class="price-line">From <b>${VB.money(p.perM2)}</b> + VAT/m²</div>`, `<div class="price-line">Home from <b>${VB.money(p.price)}</b> + VAT</div>`);
    else if (p.kind === "mobile") priceLines.push(`<div class="price-line">From <b>${VB.money(p.price)}</b> + VAT</div>`);
    else if (p.kind === "tiny") priceLines.push(`<div class="price-line was">${VB.money(p.original)}</div>`, `<div class="price-line price-line--sale"><b>From ${VB.money(p.price)} + VAT</b></div>`);
    else priceLines.push(`<div class="price-line">From <b>${VB.money(p.perM2)}</b> + VAT/m²</div>`, `<div class="price-line">Home from <b>${VB.money(p.price)}</b> + VAT</div>`);
    const thumbs = (VB.imagesFor(p, color).ai || []).length > 1;
    return `<article class="mcard reveal" data-slug="${p.slug}">
      <div class="mcard__media"><a class="mcard__main" href="${productUrl(p)}" aria-label="${esc(p.name)}">${img(VB.cardImage(p, color), p.name)}</a></div>
      <div class="mcard__body">
        <h3>${p.name}</h3>
        ${priceLines.join("")}
        ${rate(p.rating, p.reviews)}
        ${p.description ? `<p class="lead" style="margin-top:6px">${p.description}</p>` : ""}
        ${specs.length ? `<div class="specs">${specs.join("")}</div>` : ""}
        ${p.plans && p.plans.length ? `<div class="plan"><div class="finish__label">Floor plan${p.area ? ` (${p.area} m²)` : ""}</div>${img(p.plans[0], p.name + " floor plan")}</div>` : ""}
        <div class="finish">
          <div class="finish__label">${p.kind === "tiny" ? "Exterior color" : "Exterior finish"} <span>${single ? "(only option)" : "(standard)"}</span></div>
          <div class="finish__row">${swatches(p, color, "sw--lg")}
            <div class="finish__name">${col.name}${col.note ? `<small>${col.note}</small>` : ""}</div></div>
          <div class="finish__note" aria-live="polite"></div>
        </div>
        <a class="btn btn--dark btn--block mcard__cta" href="${productUrl(p)}">View Details ${ico("arrow")}</a>
      </div></article>`;
  }
  function bindModelCards(root) {
    $$(".mcard", root).forEach((card) => {
      const p = VB.productBySlug(card.dataset.slug);
      const im = $(".mcard__main img", card), nameEl = $(".finish__name", card), note = $(".finish__note", card);
      const links = $$("a[href^='product.html']", card);
      bindSwatches(card, (c, has) => {
        const col = VB.COLORS[c];
        nameEl.innerHTML = `${col.name}${col.note ? `<small>${col.note}</small>` : ""}`;
        if (has) swapImage(im, VB.cardImage(p, c));
        note.textContent = has ? "" : "Render for this finish coming soon";
        links.forEach((a) => (a.href = productUrl(p, c)));
      });
    });
  }

  /* ---------- deliveries banner ---------- */
  function deliveriesBanner(opts = {}) {
    const { copy = "See our deliveries across Europe.", model = "", label = "REAL HOMES. REAL LOCATIONS.", cat = "" } = opts;
    const href = "deliveries.html" + (model ? `?model=${model}` : cat ? `?cat=${cat}` : "");
    return `<section class="banner" aria-label="Deliveries"><div class="banner__bg">${img(VB.BG.banner, "")}</div>
      <div class="container reveal"><div><span class="eyebrow">${label}</span><h2 style="margin-top:12px">${copy}</h2></div>
      <a class="btn btn--light" href="${href}">View Deliveries ${ico("arrow")}</a></div></section>`;
  }
  function statsBar() {
    return `<section class="stats-bar"><div class="container"><ul>
      <li>${ico("home")}<b>${VB.SITE.stats.homes}</b><span>Homes delivered</span></li>
      <li>${ico("globe")}<b>${VB.SITE.stats.countries}</b><span>Countries</span></li>
      <li>${ico("building")}<b>${VB.SITE.stats.showrooms}</b><span>Showrooms</span></li>
      <li>${ico("star")}<b>${VB.SITE.stats.rating}</b><span>Customer rating</span></li></ul></div></section>`;
  }

  /* ---------- header / footer ---------- */
  const LANGS = [["EN", "English"], ["RO", "Română"], ["FR", "Français"]];
  function header(page, mode) {
    const cur = (n) => (page === n ? 'aria-current="page"' : "");
    const lang = safe(() => localStorage.getItem("vb-lang")) || "EN";
    const homesMenu = VB.CATEGORIES.map((c) => `<a href="${categoryUrl(c)}">${img(c.image.card, "")}<span><strong>${c.name}</strong><span>${c.cardTagline}</span></span></a>`).join("");
    const langHtml = `<div class="lang"><button class="lang__btn" aria-haspopup="listbox" aria-expanded="false">${ico("globe")}<span class="lang__cur">${lang}</span>${ico("chev", "chev")}</button>
      <div class="lang__menu" role="listbox">${LANGS.map(([c, n]) => `<button role="option" data-l="${c}" aria-current="${c === lang}">${n}<span>${c}</span></button>`).join("")}</div></div>`;
    return `<header class="hdr hdr--${mode}" id="hdr">
      <div class="hdr__top"><a href="tel:${VB.SITE.phoneHref}">${ico("phone")} ${VB.SITE.phone}</a><span class="sep"></span><a href="contact.html">Talk to Sales ${ico("arrow")}</a></div>
      <div class="container hdr__bar">
        <a class="logo" href="index.html" aria-label="View Box Houses – home">VIEW BOX<small>HOUSES</small></a>
        <nav class="hdr__nav" aria-label="Main">
          <div class="has-menu"><button type="button" aria-haspopup="true" ${page === "category" || page === "product" ? 'aria-current="page"' : ""}>Homes ${ico("chev", "chev")}</button><div class="mega">${homesMenu}</div></div>
          <a href="about.html" ${cur("about")}>About</a><a href="deliveries.html" ${cur("deliveries")}>Deliveries</a><a href="showrooms.html" ${cur("showrooms")}>Showrooms</a><a href="blog.html" ${cur("blog")}>Blog</a><a href="contact.html" ${cur("contact")}>Contact</a>
        </nav>
        <div class="hdr__tools">${langHtml}
          <a class="btn btn--sm hdr__cta btn--light" href="contact.html">${ico("phone")} Talk to Sales</a>
          <button class="burger" id="burger" aria-label="Open menu" aria-controls="drawer">${ico("menu")}</button></div>
      </div></header>
      <div class="drawer" id="drawer" aria-hidden="true"><div class="drawer__head"><a class="logo" href="index.html">VIEW BOX<small>HOUSES</small></a><button class="burger" id="burger-x" aria-label="Close menu">${ico("close")}</button></div>
        <nav class="drawer__nav"><details><summary>Homes ${ico("chev", "chev")}</summary><div class="drawer__sub">${VB.CATEGORIES.map((c) => `<a href="${categoryUrl(c)}">${c.name} ${ico("arrow")}</a>`).join("")}</div></details>
        <a href="about.html">About</a><a href="deliveries.html">Deliveries</a><a href="showrooms.html">Showrooms</a><a href="blog.html">Blog</a><a href="contact.html">Contact</a></nav>
        <div class="drawer__foot"><a class="btn btn--light" href="contact.html">${ico("phone")} Talk to Sales</a><a class="btn btn--ghost" href="tel:${VB.SITE.phoneHref}">${VB.SITE.phone}</a></div></div>`;
  }
  function footer() {
    const s = VB.SITE.social;
    return `<footer class="ftr"><div class="container"><div class="ftr__row">
      <div class="ftr__top"><a class="logo" href="index.html">VIEW BOX<small>HOUSES</small></a>
        <div class="social"><a href="${s.instagram}" aria-label="Instagram">${ico("instagram")}</a><a href="${s.facebook}" aria-label="Facebook">${ico("facebook")}</a><a href="${s.youtube}" aria-label="YouTube">${ico("youtube")}</a><a href="${s.linkedin}" aria-label="LinkedIn">${ico("linkedin")}</a></div></div>
      <nav class="ftr__nav" aria-label="Footer"><a href="category.html?c=capsule-homes">Homes</a><a href="about.html">About</a><a href="deliveries.html">Deliveries</a><a href="blog.html">Blog</a><a href="contact.html">Contact</a></nav></div>
      <p class="ftr__copy">© 2026 View Box Houses. All rights reserved.</p></div></footer>
      <div class="chat-fab"><button class="chat-fab__btn" id="chat-btn" aria-label="Open live chat" aria-expanded="false">${ico("chat")}</button><small>Live Chat</small></div>
      <div class="chat-panel" id="chat-panel"><h4>Chat with our team</h4><p>We usually reply within a few minutes during showroom hours.</p>
        <a class="btn btn--dark btn--sm" href="${VB.SITE.whatsapp}" target="_blank" rel="noopener">${ico("whatsapp")} WhatsApp</a>
        <a class="btn btn--outline btn--sm" href="tel:${VB.SITE.phoneHref}">${ico("phone")} ${VB.SITE.phone}</a>
        <a class="btn btn--outline btn--sm" href="mailto:${VB.SITE.email}">${ico("mail")} Email us</a></div>`;
  }

  /* fixed full-page image + dark overlay behind every page (pages may swap the image with setBg) */
  function setBg(src) {
    let el = $(".page-bg");
    if (!el) { el = document.createElement("div"); el.className = "page-bg"; el.setAttribute("aria-hidden", "true"); document.body.prepend(el); }
    el.innerHTML = `<img src="${src}" alt="" decoding="async">`;
  }

  function shell() {
    const body = document.body, page = body.dataset.page, mode = body.dataset.header || "light";
    setBg(VB.BG.hero);
    const main = $("#main");
    main.insertAdjacentHTML("beforebegin", header(page, mode));
    main.insertAdjacentHTML("afterend", footer());
    const hdr = $("#hdr");
    const onScroll = () => hdr.classList.toggle("is-scrolled", scrollY > 24);
    onScroll(); addEventListener("scroll", onScroll, { passive: true });

    const drawer = $("#drawer");
    const toggle = (open) => { drawer.classList.toggle("open", open); drawer.setAttribute("aria-hidden", !open); document.body.style.overflow = open ? "hidden" : ""; };
    $("#burger").addEventListener("click", () => toggle(true));
    $("#burger-x").addEventListener("click", () => toggle(false));
    $$("a", drawer).forEach((a) => a.addEventListener("click", () => toggle(false)));

    const lang = $(".lang"), lb = $(".lang__btn", lang);
    lb.addEventListener("click", (e) => { e.stopPropagation(); const o = lang.classList.toggle("open"); lb.setAttribute("aria-expanded", o); });
    document.addEventListener("click", () => lang.classList.remove("open"));
    $$(".lang__menu button", lang).forEach((b) => b.addEventListener("click", () => {
      safe(() => localStorage.setItem("vb-lang", b.dataset.l));
      $(".lang__cur").textContent = b.dataset.l;
      $$(".lang__menu button", lang).forEach((x) => x.setAttribute("aria-current", x === b));
    })); // UI only – real translation is handled by Wix Multilingual

    const cb = $("#chat-btn"), cp = $("#chat-panel");
    cb.addEventListener("click", () => { const o = cp.classList.toggle("open"); cb.setAttribute("aria-expanded", o); });
  }

  /* ---------- generic slider with dots + swipe (used for editorial slides) ---------- */
  function slider(root, { auto = 0, slide = ".rp__slide", dots: dotsSel = ".dots button", scope = root.parentElement } = {}) {
    const slides = $$(slide, root), dots = $$(dotsSel, scope), count = $(".rp__count", root);
    let i = 0, timer;
    const go = (n) => {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle("is-active", k === i));
      dots.forEach((d, k) => d.classList.toggle("on", k === i));
      if (count) count.textContent = `${i + 1} / ${slides.length}`;
    };
    const restart = () => { clearInterval(timer); if (auto) timer = setInterval(() => go(i + 1), auto); };
    $("[data-prev]", root).addEventListener("click", () => { go(i - 1); restart(); });
    $("[data-next]", root).addEventListener("click", () => { go(i + 1); restart(); });
    dots.forEach((d, k) => d.addEventListener("click", () => { go(k); restart(); }));
    let x0 = null, swiped = false;
    root.addEventListener("pointerdown", (e) => { x0 = e.clientX; swiped = false; });
    root.addEventListener("pointerup", (e) => { if (x0 !== null && Math.abs(e.clientX - x0) > 40) { swiped = true; go(i + (e.clientX < x0 ? 1 : -1)); restart(); } x0 = null; });
    root.addEventListener("click", (e) => { if (swiped) { e.preventDefault(); swiped = false; } }, true); // a swipe must not open the linked page
    go(0); restart();
  }

  window.VBUI = { $, $$, ico, esc, fmtDate, params, rate, stars5, featureList, productUrl, categoryUrl, img, reveal, openModal, closeModal, swapImage, swatches, bindSwatches, productCard, bindProductCards, modelCard, bindModelCards, deliveriesBanner, statsBar, slider, setBg, safe };

  document.addEventListener("DOMContentLoaded", () => {
    shell();
    window.VBPage && window.VBPage(window.VBUI);
    reveal();
    // honour deep links to anchors rendered by the page script (e.g. showrooms.html#brasov)
    if (location.hash) setTimeout(() => window.VBHash && window.VBHash(), 60);
  });
})();
