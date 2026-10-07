// Publishes the client mockups (optimised) + site/mockups.html comparing each mockup with its live page
const sharp = require("sharp"), fs = require("fs"), path = require("path");
const ROOT = path.resolve(__dirname, ".."), M = path.join(ROOT, "mockups"), CP = path.join(M, "Categories pages"), PP = path.join(CP, "Product pages");
const items = [
  ["Homepage (mobile)", path.join(M, "file_00000000bb7c8211b1d19310193f1db6.png"), "home", [["Live homepage", "index.html"], ["Capsule home card → category", "category.html?c=capsule-homes"]]],
  ["Capsule Homes – category (desktop + mobile)", path.join(CP, "file_0000000053b4820bab1635c21ee10616.png"), "cat-capsule", [["Live Capsule Homes", "category.html?c=capsule-homes"]]],
  ["Tiny Homes – category (desktop + mobile)", path.join(CP, "file_000000006b10820abb35c6dfa00725be.png"), "cat-tiny", [["Live Tiny Homes", "category.html?c=tiny-homes"]]],
  ["Expandable Containers – category (desktop + mobile)", path.join(CP, "file_00000000f748820ea8ce1020e32ec926.png"), "cat-expandable", [["Live Expandable Containers", "category.html?c=expandable-containers"]]],
  ["Modular Homes – category", path.join(CP, "file_000000004cac81fab6c8350e72e0c29e.png"), "cat-modular", [["Live Modular Homes", "category.html?c=modular-homes"]]],
  ["Mobile & Floating Homes – category", path.join(CP, "file_000000001c44821197c6eb2548a36f11.png"), "cat-floating", [["Live Mobile & Floating Homes", "category.html?c=mobile-and-floating-homes"]]],
  ["Capsule – product page (London)", path.join(PP, "Capsule - model product page", "file_0000000028d4821188de8874c7105d4f.png"), "prod-capsule", [["Live London", "product.html?p=london"], ["Live Amalfi", "product.html?p=amalfi"]]],
  ["Tiny Home – product page", path.join(PP, "Tiny home product page", "file_00000000da90824688183a6ef618d446.png"), "prod-tiny", [["Live Tiny Home", "product.html?p=tiny-home"]]],
  ["Expandable 37 m² – product page", path.join(PP, "Expandable container", "file_000000005de88210be5e956f3460ab2a.png"), "prod-exp37", [["Live Expandable 37 m²", "product.html?p=expandable-37"]]],
  ["Expandable 74 m² – product page", path.join(PP, "Expandable container", "file_00000000df9481f49adce94a34dc18fc.png"), "prod-exp74", [["Live Expandable 74 m²", "product.html?p=expandable-74"]]],
  ["London Floating – product page", path.join(PP, "Mobile homes", "Screenshot_2026-09-28-13-45-07-983_com.openai.chatgpt-edit.jpg"), "prod-floating", [["Live London Floating", "product.html?p=london-floating"]]],
  ["Base 70 m² Modular – product page", path.join(PP, "Modular Homes", "file_0000000060c482109b2926d79502a1ff.png"), "prod-base70", [["Live Base 70 m²", "product.html?p=base-70"], ["Live Modular M1", "product.html?p=modular-m1"]]],
];
(async () => {
  const out = path.join(ROOT, "site", "mockups"); fs.mkdirSync(out, { recursive: true });
  let cards = "";
  for (const [title, file, id, links] of items) {
    await sharp(file).jpeg({ quality: 86, mozjpeg: true }).toFile(path.join(out, id + ".jpg"));
    cards += `<article class="mk"><h2>${title}</h2><a href="mockups/${id}.jpg" target="_blank" rel="noopener"><img src="mockups/${id}.jpg" alt="${title} – client mockup" loading="lazy"></a>
      <div class="mk__links">${links.map(([t, h]) => `<a class="btn btn--dark btn--sm" href="${h}">${t} →</a>`).join("")}</div></article>\n`;
  }
  fs.writeFileSync(path.join(ROOT, "site", "mockups.html"), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Design mockups – View Box Houses</title><meta name="robots" content="noindex">
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700&family=Outfit:wght@300;400;500&display=swap" rel="stylesheet"><link rel="stylesheet" href="assets/css/style.css">
<style>body{background:var(--paper);color:var(--text)}.mkp{max-width:1280px;margin:auto;padding:32px var(--gutter) 64px}.mkp h1{font-size:clamp(30px,6vw,48px);color:var(--ink);margin:10px 0}.mkp>p{color:var(--muted);max-width:60ch}
.mkg{display:grid;gap:28px;margin-top:28px}@media(min-width:900px){.mkg{grid-template-columns:repeat(2,1fr)}}.mk{background:#fff;border:1px solid var(--line);border-radius:20px;padding:18px}.mk h2{font-family:var(--font-body);font-size:16px;font-weight:700;color:var(--ink);margin-bottom:12px}
.mk img{width:100%;border-radius:12px;border:1px solid var(--line)}.mk__links{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}</style></head>
<body><div class="mkp"><a class="logo" href="index.html" style="color:var(--ink)">VIEW BOX<small>HOUSES</small></a>
<h1>Design mockups → live pages</h1><p>The client mockups, each with a link to the live page built from it. Tap a mockup to open it full size.</p>
<div class="mkg">${cards}</div></div></body></html>`);
  console.log("done", items.length);
})();
