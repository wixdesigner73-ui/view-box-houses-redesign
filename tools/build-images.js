// Optimises the client-supplied renders into web-ready JPGs and writes a manifest.
// Usage: node build-images.js   (run with `sharp` installed in NODE_PATH or node_modules)
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "Capsule Homes");
const CAT_SRC = path.join(ROOT, "Poze categorii");
const OUT = path.join(ROOT, "site", "assets", "img");

// slug -> source folder name / file prefix
const HOUSES = {
  amalfi: "Amalfi", antalya: "Antalya", barcelona: "Barcelona", brasov: "Brasov",
  london: "London", madeira: "Madeira", oslo: "Oslo", prague: "Prague", santorini: "Santorini",
};

// Which render belongs to which exterior colour. Identified by eye from the supplied
// renders (the numbering differs between houses). ai = lifestyle renders, cut = studio render.
const COLORS = {
  amalfi: {
    white: { ai: ["AI Amalfi white.JPG"], cut: "Amalfi.png" },
    green: { ai: ["AI Amalfi1.JPG", "AI Amalfi1.1.JPG"], cut: "Amalfi2.jpg" },
    wood: { ai: ["AI Amalfi2.JPG", "AI Amalfi2.1.JPG"], cut: "Amalfi1.jpg" },
    brown: { ai: ["AI Amalfi3.JPG", "AI Amalfi3.1.JPG"], cut: "Amalfi3.jpg" },
    grey: { ai: ["AI Amalfi4.JPG", "AI Amalfi4.1.JPG"], cut: "Amalfi4.jpg" },
  },
  antalya: {
    white: { ai: ["AI Antalya white.JPG"], cut: "Antalya.png" },
    grey: { ai: ["AI Antalya1.JPG", "AI Antalya1.1.JPG"], cut: "Antalya1.jpg" },
    wood: { ai: ["AI Antalya2.jpg", "AI Antalya2.1.JPG"], cut: "Antalya2.jpg" },
    green: { ai: ["AI Antalya3.JPG", "AI Antalya3.1.JPG"], cut: "Antalya3.jpg" },
    brown: { ai: ["AI Antalya4.jpg", "AI Antalya4.1.JPG"], cut: "Antalya4.jpg" },
  },
  barcelona: {
    white: { ai: ["AI Barcelona white.JPG"], cut: "Barcelona.png" },
    wood: { ai: ["AI Barcelona1.JPG", "AI Barcelona1.1.JPG"], cut: "Barcelona1.jpg" },
    green: { ai: ["AI Barcelona2.JPG", "AI Barcelona2.1.JPG"], cut: "Barcelona2.jpg" },
    brown: { ai: ["AI Barcelona3.JPG", "AI Barcelona3.1.JPG"], cut: "Barcelona3.jpg" },
    grey: { ai: ["AI Barcelona4.JPG", "AI Barcelona4.1.JPG"], cut: "Barcelona4.jpg" },
  },
  brasov: {
    white: { ai: ["AI Brasov alb.JPG"], cut: "Brasov.png" },
    wood: { ai: ["AI Brasov1.JPG", "AI Brasov1.1.JPG"], cut: "Brasov1.png" },
    grey: { ai: ["AI Brasov2.JPG", "AI Brasov2.1.JPG"], cut: "Brasov2.png" },
    brown: { ai: ["AI Brasov3.jpg", "AI Brasov3.1.JPG"], cut: "Brasov3.png" },
    green: { ai: ["AI Brasov4.JPG", "AI Brasov4.1.JPG"], cut: "Brasov4.png" },
  },
  london: {
    white: { ai: ["AI London white.JPG"], cut: "Londra.png" },
    wood: { ai: ["AI London1.JPG"], cut: "London1.png" },
    grey: { ai: ["AI London2.JPG"], cut: "London2.png" },
    brown: { ai: ["AI London3.JPG"], cut: "London3.png" },
    green: { ai: ["AI London4.JPG"], cut: "London4.png" },
  },
  madeira: {
    white: { ai: ["AI Madeira white.JPG"], cut: "Madeira.png" },
    wood: { ai: ["AI Madeira1.JPG"], cut: "Madeira1.jpg" },
    green: { ai: ["AI Madeira2.JPG"], cut: "Madeira2.jpg" },
    brown: { ai: ["AI Madeira3.JPG"], cut: "Madeira3.jpg" },
    grey: { ai: ["AI Madeira4.JPG"], cut: "Madeira4.jpg" },
  },
  oslo: {
    // Only three exterior renders were supplied for Oslo.
    graphite: { ai: ["AI Oslo1 (1).JPG"] },
    grey: { ai: ["AI Oslo2.JPG"] },
    green: { ai: ["AI Oslo5.JPG"] },
  },
  prague: {
    white: { ai: ["AI Prague white.JPG"], cut: "Praga.png" },
    wood: { ai: ["AI Prague1.JPG"], cut: "Prague1.png" },
    grey: { ai: ["AI Prague2.JPG"], cut: "Prague2.png" },
    brown: { ai: ["AI Prague3.JPG"], cut: "Prague3.png" },
    green: { ai: ["AI Prague4.JPG"], cut: "Prague4.png" },
  },
  santorini: {
    white: { ai: ["AI Santorini white.JPG"], cut: "Santorini.png" },
    wood: { ai: ["AI Santorini1.JPG"], cut: "Santorini1.jpg" },
    green: { ai: ["AI Santorini2.JPG"], cut: "Santorini2.jpg" },
    brown: { ai: ["AI Santorini3.JPG"], cut: "Santorini3.jpg" },
    grey: { ai: ["AI Santorini4.JPG"], cut: "Santorini4.jpg" },
  },
};

const CATEGORY_PHOTOS = {
  "floating-homes": "2522A0FB-9630-4462-9A2E-7A5B38B9D7F5.PNG",
  "expandable-containers": "4E16CA94-694B-4D84-AF99-205F72410FD9.PNG",
  "tiny-homes": "5F53BCDB-099A-486E-A808-70B7B8DDFD86.PNG",
  "capsule-homes": "9D19F518-839B-495B-B3BB-2C069E57DF92.PNG",
  "modular-homes": "D538A633-71C3-4ABA-873E-3BE762B90D6F.PNG",
};

const STYLE_MAP = { fam: "family", premium: "luxury", quite: "quiet", quiet: "quiet" };
const ROOM_MAP = { living: "living", area: "living", "l+k": "living", kitchen: "kitchen", bedroom: "bedroom", bed: "bedroom", bathroom: "bathroom" };

const manifest = { houses: {}, interiors: {}, plans: {}, categories: {} };
const rel = (p) => path.relative(path.join(ROOT, "site"), p).replace(/\\/g, "/");

async function out(src, dest, width, quality = 76) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  await sharp(src).rotate().resize({ width, withoutEnlargement: true })
    .flatten({ background: "#ffffff" }).jpeg({ quality, mozjpeg: true }).toFile(dest);
  return rel(dest);
}

const slugify = (f) => f.toLowerCase().replace(/\.[a-z]+$/, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

(async () => {
  // ---- exterior colours
  for (const [slug, colors] of Object.entries(COLORS)) {
    const dir = path.join(SRC, "Exterior", HOUSES[slug]);
    manifest.houses[slug] = {};
    for (const [color, f] of Object.entries(colors)) {
      const entry = { ai: [], cut: null };
      for (const file of f.ai) {
        entry.ai.push(await out(path.join(dir, file), path.join(OUT, "houses", slug, `${color}-${slugify(file)}.jpg`), 1600, 74));
      }
      if (f.cut) entry.cut = await out(path.join(dir, f.cut), path.join(OUT, "houses", slug, `${color}-render.jpg`), 1200, 80);
      manifest.houses[slug][color] = entry;
    }
    console.log("exterior", slug);
  }

  // ---- interiors  (fam = Family Living, premium = Expensive Luxury, quiet = Quiet Luxury)
  for (const [slug, folder] of Object.entries(HOUSES)) {
    const dir = path.join(SRC, "Interior", folder);
    if (!fs.existsSync(dir)) continue;
    manifest.interiors[slug] = {};
    const seen = new Set();
    for (const file of fs.readdirSync(dir).sort()) {
      const m = file.replace(/\.[a-z]+$/i, "").toLowerCase().split(/\s+/);
      const style = STYLE_MAP[(m[1] || "").replace(/\d+$/, "")];
      const roomKey = (m[2] || "").replace(/\d+$/, "");
      const room = ROOM_MAP[roomKey];
      if (!style || !room) { console.warn("skip interior", file); continue; }
      const size = fs.statSync(path.join(dir, file)).size;
      const dupKey = `${style}-${room}-${size}`; // some files are byte-identical copies
      if (seen.has(dupKey)) continue;
      seen.add(dupKey);
      const list = ((manifest.interiors[slug][style] ||= {})[room] ||= []);
      list.push(await out(path.join(dir, file), path.join(OUT, "interiors", slug, `${style}-${room}-${list.length + 1}.jpg`), 1400, 72));
    }
    console.log("interior", slug);
  }

  // ---- 3D floor plans
  const planDir = path.join(SRC, "3d floor plans");
  for (const file of fs.readdirSync(planDir)) {
    const slug = file.replace(/\.[a-z]+$/i, "").toLowerCase();
    manifest.plans[slug] = [await out(path.join(planDir, file), path.join(OUT, "plans", `${slug}.jpg`), 1400, 78)];
  }

  // ---- category photos (hero + card)
  for (const [cat, file] of Object.entries(CATEGORY_PHOTOS)) {
    const src = path.join(CAT_SRC, file);
    manifest.categories[cat] = {
      hero: await out(src, path.join(OUT, "categories", `${cat}-hero.jpg`), 2000, 78),
      card: await out(src, path.join(OUT, "categories", `${cat}-card.jpg`), 900, 76),
    };
  }

  const dest = path.join(ROOT, "site", "assets", "js", "manifest.js");
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, "window.VB_MANIFEST = " + JSON.stringify(manifest, null, 1) + ";\n");
  console.log("done");
})().catch((e) => { console.error(e); process.exit(1); });
