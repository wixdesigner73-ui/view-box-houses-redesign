// Crops product imagery that only exists inside the client mockups (used as stand-ins until final renders arrive).
// Output: site/assets/img/mockup/*.jpg  +  site/assets/js/mockup.js (window.VB_MOCKUP)
const sharp = require("sharp"), fs = require("fs"), path = require("path");
const ROOT = path.resolve(__dirname, ".."), M = path.join(ROOT, "mockups", "Categories pages");
const F = {
  mobile: path.join(M, "file_000000001c44821197c6eb2548a36f11.png"),
  modular: path.join(M, "file_000000004cac81fab6c8350e72e0c29e.png"),
  tiny: path.join(M, "file_000000006b10820abb35c6dfa00725be.png"),
  expandable: path.join(M, "file_00000000f748820ea8ce1020e32ec926.png"),
  base70: path.join(M, "Product pages", "Modular Homes", "file_0000000060c482109b2926d79502a1ff.png"),
  exp37: path.join(M, "Product pages", "Expandable container", "file_000000005de88210be5e956f3460ab2a.png"),
  exp74: path.join(M, "Product pages", "Expandable container", "file_00000000df9481f49adce94a34dc18fc.png"),
  float: path.join(M, "Product pages", "Mobile homes", "Screenshot_2026-09-28-13-45-07-983_com.openai.chatgpt-edit.jpg"),
};
// name: [file, left, top, width, height]
const C = {
  "modular-m1": ["modular", 30, 643, 385, 270], "modular-m2": ["modular", 30, 932, 385, 264], "saint-tropez": ["modular", 30, 1213, 385, 308],
  "london-floating": ["mobile", 36, 672, 346, 274], "barcelona-floating": ["mobile", 36, 961, 346, 265], "lightning-mcqueen": ["mobile", 36, 1242, 346, 251],
  "expandable-37": ["expandable", 34, 502, 344, 190], "expandable-74": ["expandable", 395, 502, 339, 192],
  "tiny-home": ["tiny", 30, 563, 427, 380],
  "base70-2": ["base70", 18, 1176, 437, 206], "base70-3": ["base70", 463, 1176, 327, 206],
  "base70-4": ["base70", 18, 1392, 385, 194], "base70-5": ["base70", 412, 1392, 378, 194], "base70-6": ["base70", 18, 1596, 384, 188], "base70-7": ["base70", 411, 1596, 379, 188],
};
(async () => {
  const out = path.join(ROOT, "site", "assets", "img", "mockup"); fs.mkdirSync(out, { recursive: true });
  const map = {};
  for (const [name, [f, l, t, w, h]] of Object.entries(C)) {
    await sharp(F[f]).extract({ left: l, top: t, width: w, height: h })
      .resize({ width: Math.max(w * 2, 800), kernel: "lanczos3" }).sharpen({ sigma: 0.7 })
      .jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(out, name + ".jpg"));
    map[name] = "assets/img/mockup/" + name + ".jpg";
  }
  fs.writeFileSync(path.join(ROOT, "site", "assets", "js", "mockup.js"), "window.VB_MOCKUP = " + JSON.stringify(map, null, 1) + ";\n");
  console.log(Object.keys(map).length, "crops");
})();
