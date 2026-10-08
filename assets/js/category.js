/* Category pages: ?c=capsule-homes | tiny-homes | expandable-containers | modular-homes | mobile-and-floating-homes */
window.VBPage = function (UI) {
  const { $, ico, img, params, setBg, productCard, modelCard, bindProductCards, bindModelCards, deliveriesBanner, statsBar, featureList } = UI;
  const VB = window.VB;
  const c = VB.categoryBySlug(params.get("c")) || VB.CATEGORIES[0];
  document.title = `${c.name} – View Box Houses`;
  const products = VB.productsOf(c.slug);
  setBg(c.image.hero);

  const hero = `
  <section class="hero hero--cat" aria-label="${c.name}">
    <div class="hero__bg">${img(c.image.hero, c.name).replace('loading="lazy"', 'fetchpriority="high"')}</div>
    <div class="container hero__inner">
      <div class="hero__copy">
        <span class="eyebrow">${c.eyebrow}</span>
        <h1 class="h-display" style="margin-top:0">${c.title.join("<br>")}</h1>
        <p>${c.lead}</p>
        <div class="btn-row"><a class="btn btn--light" href="#models">Explore Models ${ico("arrow")}</a></div>
      </div>
      ${featureList(c.features, "features--dividers")}
    </div>
  </section>`;

  let list;
  if (c.layout === "grid") list = `<div class="grid-cards" id="list">${products.map(productCard).join("")}</div>`;
  else list = `<div class="mlist mlist--${c.layout}" id="list">${products.map(modelCard).join("")}</div>`;

  const strip = c.strip ? `<ul class="strip reveal">${c.strip.map(([i, t]) => `<li>${ico(i)}<span>${t}</span></li>`).join("")}</ul>` : `<ul class="strip reveal">${c.features.map(([i, t]) => `<li>${ico(i)}<span>${t}</span></li>`).join("")}</ul>`;

  const models = `
  <section class="models" id="models"><div class="container">
    <div class="models__head reveal">${c.layout !== "grid" ? `<span class="eyebrow">${c.eyebrowList}</span>` : ""}<h2>${c.listTitle}</h2><p>${c.listLead}</p></div>
    ${list}${strip}
  </div></section>`;

  $("#main").innerHTML = hero + models + deliveriesBanner({ copy: c.bannerCopy, cat: c.slug }) + statsBar();
  const root = $("#list");
  c.layout === "grid" ? bindProductCards(root) : bindModelCards(root);
};
