/* About · Blog · Post · Contact */
window.VBPage = function (UI) {
  const { $, ico, img, params, fmtDate, setBg } = UI;
  const VB = window.VB;
  const page = document.body.dataset.page;
  if (page === "about") setBg(VB.BG.global);
  const ctaBox = `<section class="section on-dark" style="padding-block:40px"><div class="container"><div class="cta-box"><h2>Ready to find your perfect home?</h2><p>Get a personalized offer from our team.</p><a class="btn btn--dark" href="contact.html">Contact Us ${ico("arrow")}</a></div></div></section>`;

  if (page === "about") {
    $("#main").innerHTML = `
      <section class="page-hero page-hero--light"><div class="container reveal"><span class="eyebrow eyebrow--ink">About View Box Houses</span>
        <h1 style="color:var(--ink);font-weight:400">A house is a quiet act of engineering.</h1>
        <p>We create precisely manufactured, fully-equipped homes for permanent living and temporary stays. Design, manufacturing and delivery are handled by one integrated team.</p></div></section>
      <section class="section on-light"><div class="container"><div class="about-grid">
        <div class="about-card reveal"><h3>Our story</h3><p>Established in 2023, View Box Houses set out to make high-end quality housing accessible for both permanent residency and luxury accommodation.</p></div>
        <div class="about-card reveal" style="--d:.08s"><h3>Homes designed for every landscape</h3><p>Our homes transcend terrain limitations, delivering functional spaces to the places you want to live — and to connect with the landscape.</p></div>
        <div class="about-card reveal" style="--d:.16s"><h3>Designed, crafted and controlled in-house</h3><p>Most products and components are produced internally, ensuring quality control from structure to daily-use components.</p></div></div></div></section>
      <section class="gp"><div class="gp__bg">${img(VB.BG.global, "")}</div><div class="container reveal"><span class="eyebrow">Our reach</span><h2>Built in Brașov. Delivered across Europe.</h2>
        <div class="stats"><div class="stat"><b>100+</b><span>Homes installed</span></div><div class="stat"><b>10+</b><span>Countries</span></div><div class="stat"><b>1,000+</b><span>Annual production capacity</span></div><div class="stat"><b>2023</b><span>Established</span></div></div>
        <p class="lead on-dark" style="margin:36px auto 0">Our industrial assembly park combines automated and semi-automated equipment with experienced prefabrication specialists across Design, Manufacturing, Operations and Construction.</p></div></section>
      <section class="section on-white"><div class="container"><div class="contact-grid"><div><span class="eyebrow eyebrow--ink">Find us</span><h2 class="h-section" style="color:var(--ink);margin-top:10px">Showrooms in Romania, France and Ireland</h2><p class="lead" style="margin-top:12px">Our office is at ${VB.SITE.address}.</p>
        <div class="btn-row" style="margin-top:22px"><a class="btn btn--dark" href="showrooms.html">Visit a Showroom ${ico("arrow")}</a></div></div></div></div></section>${ctaBox}`;
  }

  if (page === "blog") {
    $("#main").innerHTML = `
      <section class="page-hero page-hero--light"><div class="container reveal"><span class="eyebrow eyebrow--ink">Latest news</span><h1 style="color:var(--ink);font-weight:400">Stay Updated</h1><p>Stories, insights and updates from the world of modular living.</p></div></section>
      <section class="section on-light" style="padding-top:8px"><div class="container"><div class="news__track" style="overflow:visible;margin:0;padding:0;display:grid;gap:18px">${VB.POSTS.map((p) => `<a class="news-card" style="max-width:none;flex:initial" href="post.html?s=${p.slug}">${img(p.image, "")}<div><time datetime="${p.date}">${fmtDate(p.date)}</time><h3>${p.title}</h3><p>${p.excerpt}</p><span class="link-arrow">Read More ${ico("arrow")}</span></div></a>`).join("")}</div></div></section>${ctaBox}`;
    const t = $(".news__track"); t.style.gridTemplateColumns = "repeat(auto-fill,minmax(300px,1fr))";
  }

  if (page === "post") {
    const p = VB.POSTS.find((x) => x.slug === params.get("s")) || VB.POSTS[0];
    document.title = `${p.title} – View Box Houses`;
    $("#main").innerHTML = `
      <article class="section on-white"><div class="container prose reveal" style="max-width:820px"><a class="link-arrow" href="blog.html">${ico("arrowLeft")} All news</a>
        <h1 class="h-section" style="color:var(--ink);margin-top:18px">${p.title}</h1><p style="margin-top:10px;font-size:13.5px;color:var(--muted)"><time datetime="${p.date}">${fmtDate(p.date)}</time> · ViewBoxHouses</p>
        <div class="post-hero">${img(p.image, "")}</div>${p.body.map((t) => `<p>${t}</p>`).join("")}
        <div class="btn-row" style="margin-top:32px"><a class="btn btn--dark" href="contact.html">Talk to Sales ${ico("arrow")}</a></div></div></article>`;
  }

  if (page === "contact") {
    const model = params.get("model");
    $("#main").innerHTML = `
      <section class="section on-white"><div class="container"><div class="contact-grid"><div class="reveal">
        <span class="eyebrow eyebrow--ink">Talk to sales</span><h1 class="h-section" style="color:var(--ink);margin:10px 0 12px">Ready to find your perfect home?</h1><p class="lead">Get a personalized offer from our team.</p>
        <div class="contact-list"><a href="tel:${VB.SITE.phoneHref}">${ico("phone")}<div><b>Phone</b><span>${VB.SITE.phone}</span></div></a>
          <a href="mailto:${VB.SITE.email}">${ico("mail")}<div><b>Email</b><span>${VB.SITE.email}</span></div></a>
          <a href="${VB.SITE.whatsapp}" target="_blank" rel="noopener">${ico("whatsapp")}<div><b>WhatsApp</b><span>Chat with our team</span></div></a>
          <div>${ico("pin")}<div><b>Office</b><span>${VB.SITE.address}</span></div></div></div>
        <p class="dev-note" style="margin-top:22px">${VB.SITE.company}</p></div>
        <div class="reveal" style="--d:.1s"><form class="form" id="contact-form" style="background:var(--paper);padding:24px;border-radius:24px">
          <div class="row"><label class="field">Full name<input required name="name" autocomplete="name"></label><label class="field">Phone<input type="tel" name="phone" autocomplete="tel"></label></div>
          <label class="field">Email<input required type="email" name="email" autocomplete="email"></label>
          <label class="field">I'm interested in<select name="model"><option value="">Not sure yet</option>${VB.CATEGORIES.map((c) => `<optgroup label="${c.name}">${VB.productsOf(c.slug, true).map((p) => `<option value="${p.slug}" ${p.slug === model ? "selected" : ""}>${p.name}</option>`).join("")}</optgroup>`).join("")}</select></label>
          <label class="field">Message<textarea name="msg" rows="4"></textarea></label>
          <button class="btn btn--dark btn--block" type="submit">Send message ${ico("arrow")}</button></form>
          <div class="form-ok" id="contact-ok">${ico("checkCircle")}<h3 style="font-size:24px;color:var(--ink)">Thank you!</h3><p class="lead">We'll get back to you shortly.</p></div></div></div></div></section>`;
    $("#contact-form").addEventListener("submit", (e) => { e.preventDefault(); e.target.style.display = "none"; $("#contact-ok").classList.add("show"); /* Wix: wire to Wix Forms / CRM */ });
  }
};
