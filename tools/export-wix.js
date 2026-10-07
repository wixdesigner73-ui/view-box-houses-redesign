// Exports site/assets/js/data.js into Wix-CMS-shaped JSON seed files (wix/cms/seed/*.json)
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.resolve(__dirname, "..");
const ctx = { window: {}, console }; ctx.window.window = ctx.window; vm.createContext(ctx);
for (const f of ["manifest.js", "addons.js", "data.js"]) vm.runInContext(fs.readFileSync(path.join(ROOT, "site/assets/js", f), "utf8"), ctx, { filename: f });
const VB = ctx.window.VB;
const out = path.join(ROOT, "wix", "cms", "seed"); fs.mkdirSync(out, { recursive: true });
const w = (n, d) => fs.writeFileSync(path.join(out, n + ".json"), JSON.stringify(d, null, 2));
const img = (p) => (p ? "site/" + p : null); // path inside this repo → upload to Wix Media Manager, then paste the wix:image:// URL

w("Categories", VB.CATEGORIES.map((c, i) => ({ slug: c.slug, name: c.name, badge: c.badge, eyebrow: c.eyebrow, titleLine1: c.title[0], titleLine2: c.title[1], lead: c.lead, cardTagline: c.cardTagline, listTitle: c.listTitle, listLead: c.listLead, layout: c.layout, rating: c.rating, reviewCount: c.reviews, fromPerM2: c.perM2, heroImage: img(c.image.hero), cardImage: img(c.image.card), features: c.features.map(([icon, text]) => ({ icon, text })), strip: (c.strip || []).map(([icon, text]) => ({ icon, text })), sortOrder: i + 1 })));

const products = VB.PRODUCTS.map((p, i) => ({ slug: p.slug, name: p.name, category: p.category, kind: p.kind, area: p.area ?? null, areaLabel: p.areaLabel || null, bedrooms: p.bedrooms ?? null, layoutLabel: p.rooms || null, livingRooms: p.living ?? null, bathrooms: p.bathrooms ?? null, kitchens: p.kitchens ?? null, sleeps: p.sleeps || null, price: p.price ?? null, originalPrice: p.original ?? null, pricePerM2: p.perM2 ?? null, rating: p.rating ?? null, reviewCount: p.reviews, tagline: p.tagline || null, description: p.description || null, dimensions: p.dims || null, weight: p.weight || null, powerSupply: p.power || null, balcony: p.balcony ?? null, designNote: p.note || null, tourUrl: p.tour || null, defaultColor: p.defaultColor, listed: !!p.listed, inDevelopment: !!p.inDevelopment, specs: p.specs ? p.specs.map(([label, value]) => ({ label, value })) : null, feature: p.feature ? { icon: p.feature[0], title: p.feature[1], subtitle: p.feature[2] } : null, sortOrder: i + 1, todo: p.todo || null }));
w("Products", products);

const colors = [];
VB.PRODUCTS.forEach((p) => p.colors.forEach((c, k) => { const m = p.media[c]; colors.push({ product: p.slug, colorKey: c, colorName: VB.COLORS[c].name, swatchHex: VB.COLORS[c].hex, description: VB.COLORS[c].note || null, aiImages: m ? (m.ai || []).map(img) : [], studioImage: m && m.cut ? img(m.cut) : null, hasRender: !!m, sortOrder: k + 1 }); }));
w("ProductColors", colors);

const interiors = [];
VB.PRODUCTS.forEach((p) => { if (!p.interiors) return; Object.entries(p.interiors).forEach(([style, rooms]) => Object.entries(rooms).forEach(([room, list]) => list.forEach((src, k) => interiors.push({ product: p.slug, style, room, image: img(src), sortOrder: k + 1 })))); });
w("InteriorImages", interiors);

const plans = [];
VB.PRODUCTS.forEach((p) => p.plans.forEach((src, k) => plans.push({ product: p.slug, label: `Floor Plan ${k + 1}`, image: img(src), sortOrder: k + 1 })));
w("FloorPlans", plans);

const addons = [];
VB.PRODUCTS.forEach((p) => { if (!p.addons) return; p.addons.recommended.forEach((o, k) => addons.push({ product: p.slug, name: o.name, price: o.price, group: "recommended", defaultSelected: true, sortOrder: k + 1 })); p.addons.optional.forEach((o, k) => addons.push({ product: p.slug, name: o.name, price: o.price, group: "optional", defaultSelected: false, sortOrder: k + 1 })); });
w("AddOns", addons);

const STATUS = { open: "Open", appointment: "By appointment", soon: "Opening soon", unavailable: "Unavailable" };
w("Showrooms", VB.SHOWROOMS.map((s, i) => ({ slug: s.slug, city: s.city, country: s.country, venue: s.venue, address: s.address, status: STATUS[s.status], statusMessage: s.message || null, hours: s.hours || null, contactName: s.contact || null, phone: s.phone || null, latitude: s.lat, longitude: s.lng, mapsUrl: `https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lng}`, showOnHome: VB.HOME_PILLS.includes(s.slug), sortOrder: i + 1 })));

w("Deliveries", [...VB.FEATURED_PROJECTS.map((d, i) => ({ slug: d.slug, title: d.title, subtitle: d.sub, location: d.location, product: d.model, image: img(d.image), featured: true, imageIsPlaceholder: true, sortOrder: i + 1 })), ...VB.DELIVERIES.map((d, i) => ({ slug: d.slug, title: d.title, subtitle: null, location: d.location, category: d.category, product: d.model, image: img(d.image), featured: false, imageIsPlaceholder: true, sortOrder: 100 + i }))]);
w("BlogPosts_reference", VB.POSTS);
console.log({ products: products.length, colors: colors.length, interiors: interiors.length, plans: plans.length, addons: addons.length });
