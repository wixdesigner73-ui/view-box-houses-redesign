/* Deliveries / Real Projects – ?model=london or ?cat=tiny-homes filters the list */
window.VBPage = function (UI) {
  const { $, $$, ico, img, params } = UI;
  const VB = window.VB;
  const dev = params.get("dev") === "1"; // ?dev=1 marks images that are still placeholders
  const flag = (t) => (dev && t ? `<span class="todo-flag">Placeholder</span>` : "");

  let model = params.get("model"), cat = params.get("cat");
  const modelName = model && (VB.productBySlug(model) || {}).name;
  const catName = cat && (VB.categoryBySlug(cat) || {}).name;

  const featured = VB.FEATURED_PROJECTS.filter((p) => !model || p.model === model);
  const list = VB.DELIVERIES.filter((d) => (!model || d.model === model) && (!cat || d.category === cat));

  const dcard = (d, feat) => `<article class="dcard ${feat ? "dcard--feature" : ""} reveal" ${feat ? `id="${d.slug}"` : ""}>${flag(true)}${img(d.image, d.title)}
    <div><small>${feat ? d.location : (VB.categoryBySlug(d.category) || {}).name}</small><h3>${d.title}</h3><p>${feat ? d.sub : d.location}</p></div></article>`;

  const chips = `<div class="chips"><a class="chip ${!cat && !model ? "on" : ""}" href="deliveries.html">All</a>${VB.CATEGORIES.map((c) => `<a class="chip ${cat === c.slug ? "on" : ""}" href="deliveries.html?cat=${c.slug}">${c.name}</a>`).join("")}</div>`;

  $("#main").innerHTML = `
    <section class="page-hero"><div class="page-hero__bg">${img(VB.BG.deliveries, "")}</div><div class="container reveal">
      <span class="eyebrow">Real projects. Real locations.</span><h1>Delivered Across Europe</h1>
      <p>Over 100 homes installed in more than 10 countries. From mountains to beaches, from cities to countryside.</p></div></section>
    <section class="section on-light"><div class="container">
      ${model ? `<div class="notice" style="margin:0 0 22px">Showing deliveries for <b>${modelName || model}</b>. <a href="deliveries.html" style="text-decoration:underline">Show all</a></div>` : chips}
      ${featured.length ? `<div class="sec-head"><span class="eyebrow eyebrow--ink">Featured projects</span></div><div class="dgrid dgrid--feature" style="margin-bottom:44px">${featured.map((d) => dcard(d, true)).join("")}</div>` : ""}
      ${list.length ? `<div class="sec-head"><span class="eyebrow eyebrow--ink">${catName ? catName : "All deliveries"}</span></div><div class="dgrid">${list.map((d) => dcard(d, false)).join("")}</div>` : (!featured.length ? `<p class="lead">No deliveries listed for this selection yet.</p>` : "")}
    </div></section>
    <section class="section on-dark" style="padding-block:40px"><div class="container"><div class="cta-box"><h2>Ready to find your perfect home?</h2><p>Get a personalized offer from our team.</p><a class="btn btn--dark" href="contact.html">Contact Us ${ico("arrow")}</a></div></div></section>`;

  window.VBHash = function () {
    const el = document.getElementById((location.hash || "").slice(1));
    el && el.scrollIntoView({ behavior: "smooth", block: "center" });
  };
};
