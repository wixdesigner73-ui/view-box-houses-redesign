/* Homepage */
window.VBPage = function (UI) {
  const { $, $$, ico, img, productUrl, categoryUrl, fmtDate, rate, openModal } = UI;
  const VB = window.VB;

  /* 1. hero */
  const hero = `
  <section class="hero hero--home" aria-label="Welcome">
    <div class="hero__bg">${img(VB.BG.hero, "A View Box home in the mountains at sunset").replace('loading="lazy"', 'fetchpriority="high"')}</div>
    <div class="container hero__inner">
      <div class="hero__copy">
        <span class="eyebrow">A smarter way to live</span>
        <h1 class="h-display">Modern Homes for a Brighter Tomorrow</h1>
        <p>Design. Quality. Freedom.<br>Delivered across Europe.</p>
        <div class="btn-row">
          <a class="btn btn--light" href="${categoryUrl(VB.CATEGORIES[0])}">See Prices ${ico("arrow")}</a>
          <button class="btn btn--ghost" id="watch-video">${ico("play")} Watch Video</button>
        </div>
      </div>
      <div>
        <ul class="features">
          <li>${ico("truck")}<span>Delivered across Europe</span></li>
          <li>${ico("shield")}<span>50 years warranty</span></li>
          <li>${ico("leaf")}<span>Sustainable living</span></li>
          <li>${ico("users")}<span>Thousands of happy customers</span></li>
        </ul>
        <a class="scroll-hint" href="#homes">${ico("scroll")}<span>Scroll to explore</span></a>
      </div>
    </div>
  </section>`;

  /* 2. full-screen slider linking to the category pages (client request: right after the hero) */
  const cc = VB.CATEGORIES;
  const fs = `
  <section class="fs" id="homes" aria-roledescription="carousel" aria-label="Our homes">
    ${cc.map((c, i) => `<article class="fs__slide" aria-label="${c.name}">${img(c.image.hero, c.name)}
      <a class="fs__link" href="${categoryUrl(c)}" aria-label="Explore ${c.name}" tabindex="-1"></a>
      <div class="fs__copy"><div class="container">
        <span class="fs__badge">${c.badge}</span>
        <h2>${c.name}</h2><p>${c.lead}</p>
        <div class="fs__meta">${rate(c.rating, c.reviews)}<span>From <b>${VB.money(VB.fromPrice(c.slug))}</b> + VAT</span></div>
        <a class="btn btn--light" href="${categoryUrl(c)}">Explore ${c.name} ${ico("arrow")}</a>
      </div></div></article>`).join("")}
    <div class="fs__arrows"><button class="round-btn" data-prev aria-label="Previous">${ico("arrowLeft")}</button><button class="round-btn" data-next aria-label="Next">${ico("arrow")}</button></div>
    <div class="fs__bar"><div class="container"><div class="fs__tabs">${cc.map((c, i) => `<button aria-label="${c.name}"><i>0${i + 1}</i><span>${c.name}</span></button>`).join("")}</div></div></div>
  </section>`;

  /* 3. real projects – editorial slider (sits further down the page) */
  const rp = VB.FEATURED_PROJECTS;
  const projects = `
  <section class="rp rp--panel" id="deliveries">
    <div class="container"><div class="panel">
      <div class="sec-head center reveal"><span class="eyebrow eyebrow--ink">Real projects</span>
        <h2 class="h-section" style="margin-top:12px">Delivered Across Europe</h2>
        <p class="lead">From mountains to beaches, from cities to countryside. View Box Houses are already changing lives.</p></div>
      <div class="reveal"><div class="rp__stage" id="rp-stage">
        ${rp.map((p) => `<article class="rp__slide">${img(p.image, p.title)}<a class="rp__link" href="deliveries.html#${p.slug}" aria-label="${p.title}"></a>
          <div class="rp__cap"><h3>${p.title}</h3><small>${p.location}</small></div></article>`).join("")}
        <div class="rp__nav"><button class="round-btn" data-prev aria-label="Previous project">${ico("arrowLeft")}</button><button class="round-btn" data-next aria-label="Next project">${ico("arrow")}</button><span class="rp__count">1 / ${rp.length}</span></div>
      </div>
      <div class="dots">${rp.map((_, i) => `<button aria-label="Project ${i + 1}"></button>`).join("")}</div></div>
      <div class="rp__foot reveal"><a class="btn btn--outline" href="deliveries.html">See All Deliveries ${ico("arrow")}</a></div>
    </div></div>
  </section>`;

  /* 4. find your view box */
  const cats = `
  <section class="rp rp--panel" id="find">
    <div class="container"><div class="panel">
      <div class="sec-head center reveal"><span class="eyebrow eyebrow--ink">Find your View Box</span>
        <h2 class="h-section" style="margin-top:12px">Choose Your Type of Home</h2>
        <p class="lead">Five unique ways to live, invest or create unforgettable experiences. Which one is right for you?</p></div>
      <div class="cat-grid">${VB.CATEGORIES.map((c, i) => {
        const from = VB.fromPrice(c.slug);
        return `<article class="cat-card reveal" style="--d:${i * 0.06}s"><a class="stretch" href="${categoryUrl(c)}" aria-label="${c.name}"></a>
          <div class="cat-card__img"><span class="badge">${c.badge}</span>${img(c.image.card, c.name)}</div>
          <div class="cat-card__body"><h3>${c.name}</h3><p class="tag">${c.cardTagline}</p>
            <div class="cat-card__rate">${rate(c.rating, c.reviews)}</div>
            <div class="cat-card__price"><strong>From ${VB.money(c.perM2)} + VAT/m²</strong><small>Homes from ${VB.money(from)} + VAT</small></div></div>
          <span class="round-btn">${ico("arrowUpRight")}</span></article>`;
      }).join("")}</div>
      <div class="reveal" style="margin-top:22px"><a class="btn btn--outline btn--block" href="${categoryUrl(VB.CATEGORIES[0])}">${ico("chart")} Compare All Models ${ico("arrow")}</a></div>
    </div></div>
  </section>`;

  /* 5. showrooms */
  const order = VB.HOME_PILLS.map((s) => VB.SHOWROOMS.find((x) => x.slug === s)).filter(Boolean);
  const showrooms = `
  <section class="sr" id="showrooms">
    <div class="sr__bg">${img(VB.BG.showrooms, "")}</div>
    <div class="container"><div class="sr__in reveal">
      <span class="eyebrow">Visit our showrooms</span>
      <h2>Experience View Box in Person</h2>
      <p>Step inside. Feel the quality. Meet our team.</p>
      <div class="btn-row" style="margin-top:24px"><a class="btn btn--light" href="showrooms.html">Visit a Showroom ${ico("arrow")}</a></div>
      <div class="pills">${order.map((s) => `<a class="pill" href="showrooms.html?s=${s.slug}#${s.slug}" title="${s.venue} – ${VB.STATUS_LABEL[s.status]}">${ico("pin")}${s.city}</a>`).join("")}</div>
    </div></div>
  </section>`;

  /* 6. global presence */
  const st = VB.SITE.stats;
  const global = `
  <section class="gp"><div class="gp__bg">${img(VB.BG.global, "")}</div>
    <div class="container reveal"><span class="eyebrow">A global presence</span><h2>View Box Around the World</h2>
      <div class="stats"><div class="stat"><b>${st.homes}</b><span>Homes delivered</span></div><div class="stat"><b>${st.countries}</b><span>Countries shipped</span></div>
      <div class="stat"><b>${st.rating}</b><span>Average customer rating</span></div><div class="stat"><b>${st.showrooms}</b><span>European showrooms</span></div></div></div></section>`;

  /* 7. news */
  const news = `
  <section class="section on-dark news" id="news"><div class="container">
    <div class="sec-head center reveal"><span class="eyebrow">Latest news</span><h2 class="h-section" style="margin-top:12px">Stay Updated</h2>
      <p class="lead">Stories, insights and updates from the world of modular living.</p></div>
    <div class="news__track reveal">${VB.POSTS.map((p) => `<a class="news-card" href="post.html?s=${p.slug}">${img(p.image, "")}<div><time datetime="${p.date}">${fmtDate(p.date)}</time><h3>${p.title}</h3><p>${p.excerpt}</p><span class="link-arrow">Read More ${ico("arrow")}</span></div></a>`).join("")}</div>
    <div class="reveal" style="display:flex;justify-content:center;margin-top:26px"><a class="btn btn--light" href="blog.html">View All News ${ico("arrow")}</a></div>
  </div></section>`;

  /* 8. final CTA */
  const cta = `
  <section class="section on-dark" style="padding-top:0"><div class="container"><div class="cta-box reveal">
    <h2>Ready to find your perfect home?</h2><p>Get a personalized offer from our team.</p>
    <a class="btn btn--dark" href="contact.html">Contact Us ${ico("arrow")}</a></div></div></section>`;

  $("#main").innerHTML = hero + fs + projects + cats + showrooms + global + news + cta;
  UI.slider($("#rp-stage"), { auto: 7000 });
  const fsEl = $(".fs");
  UI.slider(fsEl, { auto: 7000, slide: ".fs__slide", dots: ".fs__tabs button", scope: fsEl });

  $("#watch-video").addEventListener("click", () => {
    const v = VB.SITE.video;
    openModal(`<div class="modal__head"><div><h3>View Box Houses</h3><p>${v ? "" : "Brand film coming soon."}</p></div><button class="round-btn round-btn--ghost" data-close aria-label="Close">${ico("close")}</button></div>
      ${v ? `<div style="aspect-ratio:16/9"><iframe src="${v}" style="width:100%;height:100%;border:0;border-radius:14px" allow="autoplay;fullscreen" title="View Box Houses film"></iframe></div>` : `<p class="lead">Add the brand video URL in the CMS (SITE → video) and it will play here.</p>`}`);
  });
};
