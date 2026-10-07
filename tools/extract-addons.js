// Reads View_Box_Houses_Preturi_Addons.xlsm and writes site/assets/js/addons.js
// (English option names, EUR excl. VAT). Prices are copied from the sheet, never recalculated.
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const wb = XLSX.readFile(path.join(ROOT, "Capsule Homes", "View_Box_Houses_Preturi_Addons.xlsm"));

const SHEET_TO_SLUG = { Londra: "london", Oslo: "oslo", Antalya: "antalya", Madeira: "madeira", Barcelona: "barcelona", Amalfi: "amalfi", Santorini: "santorini", Praga: "prague", "Brașov": "brasov" };

const norm = (s) => String(s).replace(/\s+/g, " ").trim();
const rules = [
  [/geam tripan/i, "Triple glazing upgrade", "glazing"],
  [/înc[ăa]lzire în pardoseal[ăa]/i, "Underfloor heating + pipe freeze protection", "heating"],
  [/izola[țt]ie nordic/i, "Nordic insulation package (20/15 cm)", "insulation"],
  [/inverter/i, (m) => "Upgrade inverter (" + m + ")", "inverter"],
  [/proiector/i, "Projector + screen", "projector"],
  [/buc[ăa]t[ăa]rie premium/i, "Premium kitchen", "kitchen"],
  [/buc[ăa]t[ăa]rie standard/i, "Standard kitchen", "kitchen"],
  [/dulapuri/i, "Wardrobes (2 pcs)", "wardrobes"],
  [/pat \+ saltea/i, "Premium bed + mattress", "bed"],
  [/canapea premium/i, "Sofa (Premium)", "sofa"],
  [/canapea standard/i, "Sofa (Standard)", "sofa"],
  [/sc[ăa]r[ăa] intrare/i, "Entrance stairs", "stairs"],
  [/frigider incorporabil beko/i, "Built-in fridge (Beko)", "fridge"],
  [/frigider incorporabil miele/i, "Built-in fridge (Miele)", "fridge"],
  [/ma[șs]in[ăa] de sp[ăa]lat rufe \+ uscător beko/i, "Washer-dryer (Beko)", "washer"],
  [/ma[șs]in[ăa] de sp[ăa]lat rufe \+ uscător miele/i, "Washer-dryer (Miele)", "washer"],
  [/ma[șs]in[ăa] de sp[ăa]lat vase/i, "Dishwasher (Beko)", "dishwasher"],
  [/cuptor cu microunde/i, "Microwave (Beko)", "microwave"],
  [/cuptor incorporabil/i, "Built-in oven (Beko)", "oven"],
  [/u[șs][ăa] suplimentar[ăa]/i, "Extra glass door (living)", "door"],
  [/bideu/i, "Toilet with integrated bidet", "bidet"],
  [/mini frigider/i, "Mini fridge", "minifridge"],
  [/geamuri oglind/i, "Mirror glass", "mirror"],
  [/finisaj exterior/i, "Wood-effect exterior finish", "finish"],
  [/pergol/i, "Pergola with LED lighting", "pergola"],
  [/aparat cafea/i, "Jura coffee machine", "coffee"],
  [/soundbar/i, "JBL soundbar", "soundbar"],
  [/adaug[ăa] (\d) ro[țt]i/i, (m) => "Add " + m + " wheels", "wheels"],
  [/set balcon/i, "Balcony set", "balcony"],
];

function translate(ro) {
  const name = norm(ro);
  for (const [re, en, icon] of rules) {
    const m = name.match(re);
    if (!m) continue;
    if (typeof en === "function") {
      const btu = name.match(/(\d+\.?\d*)\s*(?:→|->)\s*(\d+\.?\d*)\s*BTU/i);
      const arg = re.source.includes("inverter") ? (btu ? `${btu[1].replace(".", ",")} → ${btu[2].replace(".", ",")} BTU` : "") : m[1];
      return { name: en(arg), icon };
    }
    return { name: en, icon };
  }
  throw new Error("No translation for: " + ro);
}

const out = {};
for (const sheet of wb.SheetNames) {
  const slug = SHEET_TO_SLUG[sheet];
  if (!slug) continue;
  const rows = XLSX.utils.sheet_to_json(wb.Sheets[sheet], { header: 1, defval: "" });
  const head = rows.findIndex((r) => /Op[țt]iuni recomandate/i.test(r[0]));
  const end = rows.findIndex((r, i) => i > head && /Pre[țt] baz[ăa] \+ recomandate/i.test(r[0]));
  const base = Number(rows.find((r) => /^Pre[țt] de baz[ăa]/i.test(r[0]))[1]);
  const rec = [], more = [];
  for (let i = head + 1; i <= end; i++) {
    const r = rows[i];
    if (r[0] && typeof r[1] === "number" && !/^Total|^Pre[țt] baz/i.test(r[0])) rec.push({ ...translate(r[0]), price: r[1] });
    if (r[3] && typeof r[4] === "number") more.push({ ...translate(r[3]), price: r[4] });
  }
  const total = rec.reduce((s, o) => s + o.price, 0);
  const sheetTotal = Number(rows[rows.findIndex((r, i) => i > head && /^Total recomandate/i.test(r[0]))][1]);
  if (total !== sheetTotal) console.warn(`! ${slug}: parsed recommended total ${total} != sheet ${sheetTotal}`);
  out[slug] = { base, recommended: rec, optional: more, recommendedTotalFromSheet: sheetTotal };
  console.log(slug, base, "rec", rec.length, "opt", more.length, "total", total, "sheet", sheetTotal);
}

const dest = path.join(ROOT, "site", "assets", "js", "addons.js");
fs.writeFileSync(dest, "window.VB_ADDONS = " + JSON.stringify(out, null, 1) + ";\n");
