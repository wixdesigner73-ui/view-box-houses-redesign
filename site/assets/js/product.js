/* Product page: ?p=london[&c=wood]
   Section order follows the client's product-page mockups:
   gallery + intro → exterior colour → standard features → configurator → why we recommend → (closing hero)
   → interior → 3D floor plan → specs → reviews → deliveries banner → FAQ → CTA */
window.VBPage = function (UI) {
  const { $, $$, ico, img, params, stars5, openModal, deliveriesBanner, setBg } = UI;
  const VB = window.VB;
  const p = VB.productBySlug(params.get("p")) || VB.productBySlug("london");
  const cat = VB.categoryBySlug(p.category);
  setBg(cat.image.hero);
  const isCapsule = p.kind === "capsule";
  const money = VB.money;
  document.title = `${p.title || p.name} – ${cat.name} – View Box Houses`;
  let color = p.colors.includes(params.get("c")) ? params.get("c") : p.defaultColor;
  const colorLabel = (c) => VB.COLORS[c].name;
  const short = p.name.split(" ")[0];

  const ADDON_ICON = { glazing: "layers", heating: "gear", insulation: "layers", inverter: "gear", projector: "maximize", kitchen: "kitchen", wardrobes: "home", bed: "bed", sofa: "sofa", stairs: "layers", fridge: "kitchen", washer: "gear", dishwasher: "gear", microwave: "kitchen", oven: "kitchen", door: "door", bidet: "bath", minifridge: "kitchen", mirror: "layers", finish: "home", pergola: "leaf", coffee: "kitchen", soundbar: "gear", wheels: "wheel", balcony: "building" };

  /* ================= gallery ================= */
  function makeGallery(root, { trust = null } = {}) {
    root.innerHTML = `<div class="gal__stage"><span class="gal__count">${ico("orbit")}<span class="n">1/1</span></span>
      <button class="arrow prev" aria-label="Previous image">${ico("arrowLeft")}</button><button class="arrow next" aria-label="Next image">${ico("arrow")}</button>
      ${trust ? `<ul class="gal__trust">${trust.map(([i, t]) => `<li>${ico(i)}<span>${t}</span></li>`).join("")}</ul>` : ""}</div>
      <div class="gal__thumbs" role="tablist"></div>`;
    const stage = $(".gal__stage", root), thumbs = $(".gal__thumbs", root), counter = $(".n", root);
    let list = [], i = 0, imgs = [];
    function go(n) {
      if (!list.length) return;
      i = (n + list.length) % list.length;
      imgs.forEach((im, k) => im.classList.toggle("on", k === i));
      $$("button", thumbs).forEach((b, k) => b.classList.toggle("on", k === i));
      counter.textContent = `${i + 1}/${list.length}`;
      const t = $$("button", thumbs)[i];
      if (t) thumbs.scrollTo({ left: t.offsetLeft - thumbs.clientWidth / 2 + t.clientWidth / 2, behavior: "smooth" });
    }
    function set(images) {
      list = images; i = 0;
      $$("img", stage).forEach((x) => x.remove());
      imgs = images.map((src, k) => { const im = new Image(); im.src = src; im.alt = `${p.name} – image ${k + 1}`; im.decoding = "async"; if (k > 0) im.loading = "lazy"; stage.appendChild(im); return im; });
      thumbs.innerHTML = images.map((src, k) => `<button aria-label="Show image ${k + 1}"><img src="${src}" alt="" loading="lazy"></button>`).join("");
      $$("button", thumbs).forEach((b, k) => b.addEventListener("click", () => go(k)));
      $$(".arrow", stage).forEach((el) => (el.style.display = images.length > 1 ? "" : "none"));
      thumbs.style.display = images.length > 1 ? "" : "none";
      go(0);
    }
    $(".prev", root).addEventListener("click", () => go(i - 1));
    $(".next", root).addEventListener("click", () => go(i + 1));
    let x0 = null;
    stage.addEventListener("pointerdown", (e) => { x0 = e.clientX; });
    stage.addEventListener("pointerup", (e) => { if (x0 !== null && Math.abs(e.clientX - x0) > 40) go(i + (e.clientX < x0 ? 1 : -1)); x0 = null; });
    root.tabIndex = 0;
    root.addEventListener("keydown", (e) => { if (e.key === "ArrowRight") go(i + 1); if (e.key === "ArrowLeft") go(i - 1); });
    return { set };
  }

  /* hero gallery: AI/lifestyle renders of the chosen colour FIRST, then interior, then studio render */
  function heroImages() {
    const m = VB.imagesFor(p, color);
    const out = [...m.ai];
    if (p.interiors) {
      const style = p.interiors.family || Object.values(p.interiors)[0];
      ["living", "kitchen", "bedroom", "bathroom"].forEach((r) => style[r] && out.push(style[r][0]));
    }
    if (m.cut) out.push(m.cut);
    return out;
  }
  const colorImages = () => { const m = VB.imagesFor(p, color); return [...m.ai, ...(m.cut ? [m.cut] : [])]; };

  /* ================= intro ================= */
  const trust = p.trust || [["shield", "50 years<br>structure warranty"], ["truck", "100+ houses<br>delivered"], ["globe", "10+ countries<br>shipped"]];
  const quickItems = p.quick || (() => {
    const q = [];
    if (p.area) q.push(["home", `${p.area} m²`, p.areaLabel || "Total area"]);
    if (p.rooms && !p.bedrooms) q.push(["bed", p.rooms, "Layout"]);
    if (p.bedrooms) q.push(["bed", p.bedrooms, p.bedrooms === 1 ? "Bedroom" : "Bedrooms"]);
    if (p.sleeps) q.push(["users", p.sleeps, "Sleeps"]);
    return q;
  })();
  const quick = quickItems.map(([i, b, s]) => `<div class="spec">${ico(i)}<div><b>${b}</b><small>${s}</small></div></div>`).join("");

  const perM2 = p.perM2 || (p.area && p.price ? Math.round(p.price / p.area) : null);
  let priceBlock;
  if (p.kind === "floating") priceBlock = `<div class="pp__from"><small>From</small><div class="big">${money(p.perM2)}/m²<span>+ VAT</span></div><small>Home from ${money(p.price)} + VAT</small></div>`;
  else if (p.price) priceBlock = `<div class="pp__from"><small>From</small><div class="big">${money(p.price)}<span>+ VAT</span>${p.original ? `<span class="was">${money(p.original)}</span>` : ""}</div>${p.priceNote ? "" : perM2 ? `<small>or from ${money(perM2)} + VAT/m²</small>` : ""}</div>`;
  else priceBlock = `<div class="pp__from"><small>From</small><div class="big">${money(p.perM2)}/m²<span>+ VAT</span></div></div>`;
  if (p.priceNote) priceBlock += `<p class="dev-note" style="margin-top:6px;font-size:13px">${p.priceNote}</p>`;

  const primary = p.addons
    ? `<a class="btn btn--gold btn--block" href="#configure">Configure Your ${isCapsule ? short : p.name.replace(/\s*Container$/, "")} ${ico("arrow")}</a>`
    : `<a class="btn btn--gold btn--block" href="contact.html?model=${p.slug}">Request an Offer ${ico("arrow")}</a>`;
  const ctas = `<div class="cta-stack">${primary}<div class="two"><a class="btn btn--outline" href="tel:${VB.SITE.phoneHref}">${ico("phone")} Talk to Sales</a>
      <a class="btn btn--outline btn--wa" href="${VB.SITE.whatsapp}" target="_blank" rel="noopener">${ico("whatsapp")} WhatsApp</a></div></div>`;

  const ratingLine = p.reviews
    ? `<span class="rate" style="font-size:15px">${stars5()}<b>${p.rating}/5</b><span>(${p.reviews} ${p.reviews === 1 ? "review" : "reviews"})</span></span>`
    : `<span class="rate" style="font-size:15px">${stars5().replace("stars", "stars stars--empty")}<span>${p.inDevelopment ? "" : "No reviews yet"}</span></span>`;

  const intro = `
    <div class="pp__intro">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Home</a>/<a href="category.html?c=${cat.slug}">${cat.name}</a>/<span>${p.name}</span></nav>
      <span class="tagpill">${cat.name.replace(/s$/i, "")}</span>
      <h1>${p.title || p.name}</h1>
      <p class="pp__tag">${p.tagline || cat.lead}</p>
      ${ratingLine}
      ${quick ? `<div class="quick">${quick}</div>` : ""}
      ${priceBlock}${ctas}
    </div>`;

  /* ================= exterior colour ================= */
  const multi = p.colors.length > 1;
  const exteriorSection = `
  <section class="psec" id="colors"><div class="container">
    <h2>${p.exteriorTitle || "Choose your exterior color"}</h2><p class="sub">${p.exteriorSub || "Same exceptional quality. A style that fits your vision."}</p>
    <div class="colorpick">${multi
      ? `<div class="colorpick__row" role="radiogroup" aria-label="Exterior colour">${p.colors.map((c) => `<button type="button" class="colorpick__opt" role="radio" data-c="${c}" aria-checked="${c === color}"><span class="sw ${p.media[c] ? "" : "is-pending"}" style="--c:${VB.COLORS[c].hex}"></span>${VB.COLORS[c].name.replace(" ", "<br>")}</button>`).join("")}</div>`
      : `<div class="finish-one"><span class="sw sw--lg" style="--c:${VB.COLORS[color].hex}"></span><div><b>${colorLabel(color)}</b><small>${VB.COLORS[color].note || "Only option"}</small></div></div>`}
    <div class="notice" id="pending-note" hidden>The render for this finish is coming soon.</div></div>
    ${multi ? `<h3 id="colors-title" class="h3">See ${p.name} in ${colorLabel(color)}</h3>` : `<h3 class="h3">Gallery</h3>`}
    <div class="gal" id="gal-color" style="border-radius:18px;overflow:hidden"></div>
  </div></section>`;

  /* ================= standard features ================= */
  const stdList = isCapsule ? VB.CAPSULE_STANDARD.map(([t, d], k) => [["sofa", "bath", "gear", "home", "layers", "building"][k], t, d]) : p.standard;
  const standard = stdList ? `
  <section class="psec"><div class="container"><div class="two-col"><div>
    <h2>A lot comes standard.</h2><p class="sub">Your View Box comes equipped with what you need and lets you add what you want.</p>
    <a class="btn btn--outline btn--block" style="margin-top:18px;max-width:340px" href="mailto:${VB.SITE.email}?subject=Technical%20file%20-%20${encodeURIComponent(p.name)}">${ico("download")} Download Technical File</a></div>
    <ul class="std">${stdList.map(([i, t, d]) => `<li>${ico(i)}<div><b>${t}</b><span>${d}</span></div></li>`).join("")}</ul></div></div></section>` : "";

  const kit = p.kit ? `<section class="container" style="padding-block:6px 30px"><div class="kit">${ico("box")}<div><h3>${p.kit.title}</h3><p>${p.kit.text}</p></div></div></section>` : "";

  const nordic = p.addons && isCapsule && p.addons.recommended.find((o) => /Nordic/.test(o.name));
  const insulation = isCapsule ? `
  <section class="psec psec--tint"><div class="container"><h2>Insulation options</h2><p class="sub">Better insulation. Greater comfort. Lower energy costs.</p>
    <div class="insul">${VB.INSULATION.map((o) => `<div class="${o.recommended ? "rec" : ""}">${ico("layers")}<span><b>${o.name}${o.recommended && nordic ? ` (+${money(nordic.price)})` : ""}</b><small>${o.detail}</small><small>${o.u}</small></span>${o.recommended ? '<span class="rec-tag">Recommended</span>' : ""}</div>`).join("")}</div></div></section>` : "";

  /* ================= configurator ================= */
  const A = p.addons;
  const configurator = A ? `
  <section class="psec" id="configure"><div class="container"><div class="two-col"><div>
    <h2>${A.title || `Configure your ${p.name}`}</h2><p class="sub">${A.sub || "Choose the recommended configuration or customize further. Prices exclude VAT."}</p>
    <div class="seg" role="tablist"><button class="on" data-tab="rec">Recommended</button><button data-tab="opt">${A.optLabel || "Customize Further"}</button></div>
    <h3 class="h3 h3--sm" id="cfg-head"></h3><p class="sub" id="cfg-sub"></p>
    <div id="cfg-list"></div></div>
    <div><div class="total" id="cfg-total"></div>
    <button class="btn btn--gold btn--block" id="cfg-offer" style="margin-top:14px">Request an Offer ${ico("arrow")}</button>
    <p class="dev-note" style="margin-top:10px">Shipping is quoted by our team based on your delivery location.</p></div></div></div></section>` : "";

  const why = p.why ? `
  <section class="psec psec--tint"><div class="container" style="max-width:860px"><h2>${p.why.title}</h2><p class="sub">${p.why.intro}</p>
    <ol class="why">${p.why.items.map(([t, d], k) => `<li><span class="why__n">${k + 1}</span><div><b>${t}</b><span>${d}</span></div></li>`).join("")}</ol>
    <div class="cta-stack" style="max-width:420px;margin-top:22px"><a class="btn btn--outline" href="contact.html?model=${p.slug}">${ico("phone")} Talk to Sales Team</a><a class="btn btn--outline btn--wa" href="${VB.SITE.whatsapp}" target="_blank" rel="noopener">${ico("whatsapp")} Chat on WhatsApp</a></div></div></section>` : "";

  const closing = p.closing ? `<section class="closing"><div class="closing__bg">${img(cat.image.hero, "")}</div><div class="container"><h2>${p.closing.title}</h2><p>${p.closing.text}</p></div></section>` : "";

  /* ================= interior ================= */
  const STYLE_META = { family: ["Family Living", "Practical. Warm. For everyday life.", true], luxury: ["Expensive Luxury", "Bold. Elegant. Statement design."], quiet: ["Quiet Luxury", "Refined. Minimalist. Timeless."] };
  const ROOMS = { living: "Living Room", kitchen: "Kitchen", bedroom: "Bedroom", bathroom: "Bathroom" };
  const interiorSection = p.interiors ? `
  <section class="psec psec--tint" id="interior"><div class="container"><h2>Choose your interior style</h2><p class="sub">Same ${p.name}. Three different ways to make it yours.</p>
    <div class="style-tabs" id="style-tabs">${Object.keys(STYLE_META).filter((s) => p.interiors[s]).map((s) => { const r = p.interiors[s]; const first = (r.living || r.bedroom || Object.values(r)[0])[0];
      return `<button data-s="${s}" class="${s === "family" ? "on" : ""}"><img src="${first}" alt="" loading="lazy"><span>${STYLE_META[s][0]}<small>${STYLE_META[s][1].split(".")[0]}.</small></span></button>`; }).join("")}</div>
    <div class="two-col" style="margin-top:22px"><div><h3 id="style-name" class="h3" style="margin-top:0"></h3><p class="sub" id="style-desc"></p>
      <div class="tabs" id="room-tabs"></div></div><div class="viewer" id="viewer" style="margin-top:14px"><button class="arrow prev" aria-label="Previous">${ico("arrowLeft")}</button><button class="arrow next" aria-label="Next">${ico("arrow")}</button></div></div>
    ${p.tour ? `<div class="tour">${ico("orbit")}<div><b>Explore ${p.name} in 360°</b><span>Take a virtual tour and experience it from every angle.</span><a class="btn btn--outline btn--sm" href="${p.tour}" target="_blank" rel="noopener">Open 360° Tour ${ico("arrow")}</a></div></div>` : ""}
  </div></section>` : "";

  const planSection = p.plans.length ? `
  <section class="psec"><div class="container"><h2>3D floor plan</h2><p class="sub">Explore the layout of the ${p.name}${p.area ? ` — ${p.area} m²` : ""}.</p>
    ${p.plans.length > 1 ? `<div class="tabs" id="plan-tabs">${p.plans.map((_, k) => `<button class="${k ? "" : "on"}" data-k="${k}">Floor Plan ${k + 1}</button>`).join("")}</div>` : ""}
    <div class="plan3d" style="max-width:920px">${img(p.plans[0], p.name + " 3D floor plan", 'id="plan-img"')}</div></div></section>` : "";

  /* ================= specs ================= */
  const specRows = [];
  if (p.specs) specRows.push(...p.specs);
  else {
    if (p.dims) specRows.push(["Dimensions", p.dims]);
    if (p.area) specRows.push(["Total area", `${p.area} m²`]);
    if (p.rooms) specRows.push([p.bedrooms ? "Bedrooms" : "Layout", p.bedrooms || p.rooms]);
    if (p.sleeps) specRows.push(["Sleeps", p.sleeps]);
    if (p.balcony !== undefined) specRows.push(["Balcony", p.balcony ? "Yes" : "No"]);
    if (p.note) specRows.push(["Design", p.note]);
    if (p.weight) specRows.push(["Weight", p.weight]);
    if (p.power) specRows.push(["Power supply", p.power]);
    if (!isCapsule) {
      if (p.bedrooms) specRows.push(["Bedrooms", p.bedrooms]);
      if (p.bathrooms) specRows.push(["Bathrooms", p.bathrooms]);
    }
  }
  const specSection = specRows.length ? `<section class="psec ${isCapsule ? "psec--tint" : ""}"><div class="container" style="max-width:820px"><h2>Technical specifications</h2><dl class="spec-table">${specRows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>${p.specNote ? `<div class="notice">${p.specNote}</div>` : ""}</div></section>` : "";

  const reviewSection = !p.inDevelopment ? `<section class="psec"><div class="container"><h2>Customer reviews</h2>${p.reviews
    ? `<div class="rating-box"><span class="num">${p.rating}</span><div>${stars5()}<div class="dev-note" style="font-size:13.5px;margin-top:4px">${p.rating}/5 · ${p.reviews} ${p.reviews === 1 ? "review" : "reviews"}</div></div></div>`
    : `<div class="rating-box"><div>${stars5().replace("stars", "stars stars--empty")}<div class="dev-note" style="font-size:13.5px;margin-top:4px">Be the first to review our ${p.name}!</div></div></div>`}</div></section>` : "";

  /* ================= FAQ ================= */
  const base = isCapsule ? [
    ["What is the warranty?", "Every View Box Houses structure comes with a 50-year structural warranty."],
    ["How long does a capsule house last?", "The estimated lifespan is over 50 years, thanks to the quality of the metal construction, A-class insulation and the fact that every house is produced in a controlled environment and checked before delivery."],
  ] : [];
  const faqItems = [...(p.faq || []), ...base,
    ["Are there discounts for multiple units?", "Yes. Volume discounts apply in principle from 5 units up and are negotiated based on the scale of the project."],
    ["Can I see a model in person?", 'Yes — visit one of our showrooms. See the <a href="showrooms.html" style="text-decoration:underline">Showrooms</a> page for locations and opening status.']];
  const faq = `<section class="psec"><div class="container" style="max-width:820px"><h2>Quick questions</h2><div class="faq" style="margin-top:12px">${faqItems.map(([q, a]) => `<details><summary>${q} ${ico("plus")}</summary><p>${a}</p></details>`).join("")}</div></div></section>`;

  const ctaT = (p.cta && p.cta.title) || "Want to learn more or get a personalized recommendation?";
  const cta = `<section class="section on-dark" style="padding-block:40px"><div class="container"><div class="cta-box"><h2>${ctaT}</h2>${p.cta && p.cta.text ? `<p>${p.cta.text}</p>` : ""}
    <div class="btn-row" style="justify-content:center"><a class="btn btn--dark" href="contact.html?model=${p.slug}">${ico("phone")} Talk to Sales Team</a><a class="btn btn--outline" href="${VB.SITE.whatsapp}" target="_blank" rel="noopener">${ico("whatsapp")} Chat on WhatsApp</a><a class="btn btn--outline" href="contact.html?model=${p.slug}">${ico("mail")} Request an Offer</a></div></div></div></section>`;

  const banner = deliveriesBanner({ copy: "See our deliveries across Europe.", model: p.slug, label: `REAL PROJECTS — ${p.name.toUpperCase()}` });

  /* ================= "currently in development" layout (e.g. Base 70 m²) ================= */
  const devPage = () => {
    const g = p.media[color].ai;
    return `<section class="psec" style="border:0"><div class="container"><div class="devbox"><div class="devbox__ico">${ico("gear")}</div><div><h3>Currently in development</h3><p class="lead" style="margin-top:6px">We are finalizing the specifications, layouts and configuration options for this model. More details, floor plans and technical information will be available soon.</p></div>
        <div class="cta-stack" style="margin:0"><a class="btn btn--gold" href="tel:${VB.SITE.phoneHref}">${ico("phone")} Talk to Sales</a><a class="btn btn--outline btn--wa" href="${VB.SITE.whatsapp}" target="_blank" rel="noopener">${ico("whatsapp")} Chat on WhatsApp</a></div></div></div></section>
      <section class="psec" style="border:0;padding-top:0"><div class="container"><h2>Gallery</h2><p class="sub">Explore the design, materials and interior spaces of the ${p.name}.</p>
        <div class="ggrid">${g.map((s, k) => `<img class="${k === 0 ? "ggrid__wide" : ""}" src="${s}" alt="${p.name} – ${k + 1}" loading="lazy">`).join("")}</div></div></section>
      <section class="container" style="padding-block:10px 40px"><div class="devbox"><div class="devbox__ico">${ico("mail")}</div><div><h3>Interested in this model?</h3><p class="lead" style="margin-top:6px">Get notified when full specifications, floor plans and pricing are available.</p></div>
        <div class="cta-stack" style="margin:0"><a class="btn btn--gold" href="contact.html?model=${p.slug}">${ico("phone")} Talk to Sales</a><a class="btn btn--outline btn--wa" href="${VB.SITE.whatsapp}" target="_blank" rel="noopener">${ico("whatsapp")} Chat on WhatsApp</a></div></div></section>`;
  };

  /* ================= assemble ================= */
  const body = p.inDevelopment ? devPage()
    : exteriorSection + standard + kit + insulation + configurator + why + closing + interiorSection + planSection + specSection + reviewSection;
  $("#main").innerHTML = `<div class="pp">
    <div class="container pp__layout"><div class="pp__gallery"><div class="gal" id="gal-hero"></div></div>
      <aside class="pp__aside">${intro}</aside></div>
    ${body}
  </div>${p.inDevelopment ? "" : banner + faq}${p.inDevelopment ? "" : cta}`;

  const heroGal = makeGallery($("#gal-hero"), { trust });
  heroGal.set(heroImages());
  let colorGal = null;
  if ($("#gal-color")) { colorGal = makeGallery($("#gal-color")); colorGal.set(colorImages()); }

  /* ================= colour switching ================= */
  function pickColor(c) {
    color = c;
    $$(".colorpick__opt").forEach((b) => b.setAttribute("aria-checked", b.dataset.c === c));
    const has = !!p.media[c];
    const note = $("#pending-note"); if (note) note.hidden = has;
    if (has) { heroGal.set(heroImages()); colorGal && colorGal.set(colorImages()); }
    const t = $("#colors-title"); if (t) t.textContent = `See ${p.name} in ${colorLabel(c)}`;
    const u = new URL(location.href); u.searchParams.set("c", c); history.replaceState(null, "", u);
  }
  $$(".colorpick__opt").forEach((b) => b.addEventListener("click", () => pickColor(b.dataset.c)));
  if (color !== p.defaultColor) pickColor(color);

  /* ================= configurator ================= */
  if (A) {
    const rec = A.recommended.map((o, k) => ({ ...o, id: "r" + k, on: true }));
    const opt = A.optional.map((o, k) => ({ ...o, id: "o" + k, on: false }));
    let tab = "rec", expanded = false;
    const list = $("#cfg-list");
    const tile = (o) => `<span class="opt__ico">${ico(ADDON_ICON[o.icon] || o.icon || "plus")}</span>`;
    function renderList() {
      const items = tab === "rec" ? rec : opt;
      const shown = tab === "rec" && !expanded ? items.slice(0, 6) : items;
      $("#cfg-head").textContent = tab === "rec" ? (A.recTitle || "View Box Recommended") : (A.optTitle || "Customize Further");
      $("#cfg-sub").textContent = tab === "rec" ? (A.recSub || "The configuration we recommend for comfort, efficiency and year-round living.") : (A.optSub || "Additional features you can add based on how you plan to use your home.");
      list.innerHTML = `<div class="opt-list">${shown.map((o) => `<div class="opt-wrap"><label class="opt"><input type="checkbox" data-id="${o.id}" ${o.on ? "checked" : ""}>${tile(o)}<span>${o.name}</span><b>+${money(o.price)}</b></label>
        ${o.details ? `<ul class="opt__details">${o.details.map((d) => `<li>${d}</li>`).join("")}</ul>` : ""}${o.note ? `<div class="notice opt__note">${o.note}</div>` : ""}</div>`).join("")}</div>
        ${tab === "rec" && items.length > 6 ? `<button class="link-arrow" id="cfg-more" style="background:none;border:0;padding:14px 0;cursor:pointer">${expanded ? "Show fewer" : `View all recommended (${items.length})`} ${ico("arrow")}</button>` : ""}`;
      $$("input", list).forEach((i) => i.addEventListener("change", () => { [...rec, ...opt].find((o) => o.id === i.dataset.id).on = i.checked; renderTotal(); }));
      const more = $("#cfg-more"); more && more.addEventListener("click", () => { expanded = !expanded; renderList(); });
    }
    const sum = (arr) => arr.filter((o) => o.on).reduce((s, o) => s + o.price, 0);
    function renderTotal() {
      const r = sum(rec), o = sum(opt);
      $("#cfg-total").innerHTML = `<div><span>Base price</span><b>${money(A.base)}</b></div><div><span>Recommended options</span><b>+${money(r)}</b></div>${o ? `<div><span>${A.optLabel ? "Selected extras" : "Additional options"}</span><b>+${money(o)}</b></div>` : ""}<div><span>Shipping</span><b>Quoted by our team</b></div>
        <div class="sum"><span>Total price</span><b>${money(A.base + r + o)} <small>+ VAT</small></b></div>`;
    }
    $$(".seg button").forEach((b) => b.addEventListener("click", () => { tab = b.dataset.tab; $$(".seg button").forEach((x) => x.classList.toggle("on", x === b)); renderList(); }));
    renderList(); renderTotal();

    $("#cfg-offer").addEventListener("click", () => {
      const chosen = [...rec, ...opt].filter((o) => o.on);
      const total = A.base + sum(rec) + sum(opt);
      openModal(`<div class="modal__head"><div><h3>Request an offer</h3><p>${p.name} · ${colorLabel(color)} · ${money(total)} + VAT (${chosen.length} options)</p></div><button class="round-btn round-btn--ghost" data-close aria-label="Close">${ico("close")}</button></div>
        <form class="form" id="offer-form"><div class="row"><label class="field">Name<input required name="name" autocomplete="name"></label><label class="field">Phone<input name="phone" type="tel" autocomplete="tel"></label></div>
        <label class="field">Email<input required type="email" name="email" autocomplete="email"></label><label class="field">Delivery location<input name="location" placeholder="Country / city"></label>
        <label class="field">Message<textarea name="msg" rows="3"></textarea></label><button class="btn btn--dark btn--block" type="submit">Send request ${ico("arrow")}</button></form>
        <div class="form-ok" id="offer-ok">${ico("checkCircle")}<h3 style="font-size:24px;color:var(--ink)">Thank you!</h3><p class="lead">Our team will send your personalised offer shortly.</p><button class="btn btn--outline" data-close>Close</button></div>`,
        (m) => $("#offer-form", m).addEventListener("submit", (e) => { e.preventDefault(); e.target.style.display = "none"; $("#offer-ok", m).classList.add("show"); /* Wix: wire to backend/offerRequest.web.js */ }));
    });
  }

  /* ================= interior viewer ================= */
  if (p.interiors) {
    let style = "family", room = null, k = 0;
    const viewer = $("#viewer");
    function renderStyle() {
      const rooms = p.interiors[style];
      $("#style-name").innerHTML = `${STYLE_META[style][0]} ${STYLE_META[style][2] ? '<span class="tagpill" style="background:#fdf1d6;color:#8a5a00;vertical-align:middle;margin-left:6px">Recommended</span>' : ""}`;
      $("#style-desc").textContent = STYLE_META[style][1];
      const keys = Object.keys(ROOMS).filter((r) => rooms[r]);
      if (!rooms[room]) room = keys[0];
      $("#room-tabs").innerHTML = keys.map((r) => `<button data-r="${r}" class="${r === room ? "on" : ""}">${ROOMS[r]}</button>`).join("");
      $$("#room-tabs button").forEach((b) => b.addEventListener("click", () => { room = b.dataset.r; renderStyle(); }));
      $$("img", viewer).forEach((x) => x.remove());
      rooms[room].forEach((src, n) => { const im = new Image(); im.src = src; im.alt = `${p.name} – ${STYLE_META[style][0]} – ${ROOMS[room]}`; im.loading = n ? "lazy" : "eager"; if (!n) im.className = "on"; viewer.appendChild(im); });
      k = 0;
      $$(".arrow", viewer).forEach((a) => (a.style.display = rooms[room].length > 1 ? "" : "none"));
    }
    const step = (d) => { const ims = $$("img", viewer); k = (k + d + ims.length) % ims.length; ims.forEach((im, n) => im.classList.toggle("on", n === k)); };
    $(".prev", viewer).addEventListener("click", () => step(-1)); $(".next", viewer).addEventListener("click", () => step(1));
    $$("#style-tabs button").forEach((b) => b.addEventListener("click", () => { style = b.dataset.s; $$("#style-tabs button").forEach((x) => x.classList.toggle("on", x === b)); renderStyle(); }));
    renderStyle();
  }

  /* ================= floor-plan tabs ================= */
  const pt = $("#plan-tabs");
  if (pt) pt.addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; $$("button", pt).forEach((x) => x.classList.toggle("on", x === b)); $("#plan-img").src = p.plans[b.dataset.k]; });
};
