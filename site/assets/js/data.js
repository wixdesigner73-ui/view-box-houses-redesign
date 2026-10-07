/* View Box Houses – site data.
   Mirrors the proposed Wix CMS collections (see /wix/README.md).
   Sources: existing site (webloomstudio.wixstudio.com/view-box), the client's price spreadsheet,
   and the client mockups. Anything flagged `todo` is awaiting an asset or confirmation from the client. */
(function () {
  const M = window.VB_MANIFEST;

  /* ---------- exterior colour palette ---------- */
  const COLORS = {
    white: { name: "White", hex: "#f4f4f1", note: "Standard white finish" },
    brown: { name: "Dark Brown", hex: "#3a2a22", note: "" },
    grey: { name: "Light Grey", hex: "#c3c7ca", note: "" },
    wood: { name: "Wood", hex: "#c68c58", note: "Wood-effect finish" },
    green: { name: "Forest Green", hex: "#1e3a28", note: "" },
    graphite: { name: "Graphite", hex: "#2b2f33", note: "As shown in render" },
    chestnut: { name: "Chestnut", hex: "#7a4a2b", note: "Wood finish" },
    woodblack: { name: "Wood & Black", hex: "#6a3f24", note: "As shown" },
  };
  const COLOR_ORDER = ["white", "brown", "grey", "wood", "green"];

  /* ---------- global facts ---------- */
  const SITE = {
    phone: "+40 724 657 990",
    phoneHref: "+40724657990",
    email: "sales@viewboxhouses.com",
    whatsapp: "https://wa.me/40724657990",
    address: "Str. Ciobanului 9A, Brașov 500163, Romania",
    company: "VIEW HOUSES SRL · RO51641409 · J2025027519007",
    social: { instagram: "#", facebook: "#", youtube: "#", linkedin: "#" }, // todo: client to supply profile URLs
    stats: { homes: "100+", countries: "10+", rating: "4.9/5", showrooms: "5+" },
  };

  /* ---------- categories ---------- */
  const CATEGORIES = [
    {
      slug: "capsule-homes", name: "Capsule Homes", badge: "Luxury", eyebrow: "CAPSULE HOMES",
      title: ["Iconic Design.", "A New Way to Live."],
      lead: "Modern, versatile and fully equipped homes for any destination.",
      cardTagline: "Iconic design. A new way to live.",
      listTitle: "Capsule Homes", listLead: "9 unique models. Same premium quality. Different styles for different lifestyles.",
      eyebrowList: "OUR MODELS", layout: "grid", rating: 4.9, reviews: 72, perM2: 839,
      features: [["diamond", "Premium design"], ["leaf", "Energy efficient"], ["shield", "50-year structural warranty"], ["truck", "Delivered across Europe"]],
      bannerCopy: "See our deliveries across Europe.",
    },
    {
      slug: "tiny-homes", name: "Tiny Homes", badge: "Comfort", eyebrow: "TINY HOMES",
      title: ["Big Living.", "A Smaller Footprint."],
      lead: "Smart, stylish homes designed for a simpler, more flexible lifestyle.",
      cardTagline: "Compact living, big possibilities.",
      listTitle: "Tiny Homes", listLead: "1 unique model. Premium quality. A smarter way to live.",
      eyebrowList: "OUR MODEL", layout: "feature", rating: 4.8, reviews: 6, perM2: 514,
      features: [["leaf", "Energy efficient"], ["home", "Modern design"], ["shield", "50-year structural warranty"], ["truck", "Delivered across Europe"]],
      bannerCopy: "See our deliveries across Europe.",
    },
    {
      slug: "expandable-containers", name: "Expandable Containers", badge: "Best value", eyebrow: "EXPANDABLE CONTAINERS",
      title: ["More Space.", "More Possibilities."],
      lead: "Practical, modern homes that adapt to your needs.",
      cardTagline: "Maximum space for the lowest investment.",
      listTitle: "Expandable Containers", listLead: "2 models. Flexible living for families, tourism and business.",
      eyebrowList: "OUR MODELS", layout: "columns", rating: 4.6, reviews: 4, perM2: 419,
      features: [["home", "Expandable design"], ["gear", "Fast installation"], ["leaf", "Cost effective"], ["truck", "Delivered across Europe"]],
      bannerCopy: "See our deliveries across Europe.",
    },
    {
      slug: "modular-homes", name: "Modular Homes", badge: "Flexible", eyebrow: "MODULAR HOMES",
      title: ["Built for Real Life.", "Designed for More."],
      lead: "Modern modular homes for everyday living or real estate developments. Flexible, efficient and built to last.",
      cardTagline: "Flexible layouts for modern living.",
      listTitle: "Modular Homes", listLead: "Three unique designs for modern living and smart investment.",
      eyebrowList: "OUR MODELS", layout: "rows", rating: null, reviews: 0, perM2: 650,
      features: [["home", "Modern design"], ["gear", "Fast installation"], ["leaf", "Cost effective"], ["truck", "Delivered across Europe"]],
      strip: [["home", "Ideal for day-to-day living"], ["building", "Perfect for real estate developers"], ["leaf", "Energy efficient and sustainable"], ["layers", "Flexible layouts and customization"]],
      bannerCopy: "See our modular homes in real environments.",
    },
    {
      slug: "mobile-and-floating-homes", name: "Mobile & Floating Homes", badge: "Exclusive", eyebrow: "MOBILE & FLOATING HOMES",
      title: ["Live Beyond", "Boundaries."],
      lead: "On the water or on the road. Exceptional homes for a freedom-filled lifestyle.",
      cardTagline: "Take your home anywhere.",
      listTitle: "Mobile & Floating Homes", listLead: "Three unique models for a new way of living.",
      eyebrowList: "OUR MODELS", layout: "rows", rating: 5, reviews: 3, perM2: 1490,
      features: [["waves", "On water or on land"], ["diamond", "Premium design"], ["leaf", "Flexible lifestyle"], ["globe", "Delivered across Europe"]],
      strip: [["diamond", "Premium materials"], ["pin", "Unique locations"], ["leaf", "Sustainable living"], ["gear", "Fully customizable layouts"]],
      bannerCopy: "See our mobile & floating homes in real environments.",
    },
  ];
  // category photos supplied by the client ("Poze categorii")
  const CAT_IMG = { "capsule-homes": "capsule-homes", "tiny-homes": "tiny-homes", "expandable-containers": "expandable-containers", "modular-homes": "modular-homes", "mobile-and-floating-homes": "floating-homes" };
  CATEGORIES.forEach((c) => { c.image = M.categories[CAT_IMG[c.slug]]; });

  /* ---------- products ---------- */
  const CAPSULE_STANDARD = [
    ["Fully furnished interior", "Premium furniture, SPC flooring, interior wall panels, curtains and electric curtain system."],
    ["Fully equipped bathroom", "Shower, water heater, LED mirror, independent bathroom heating & ventilation. Premium toilet with heated seat, soft-close, vacuum flush and blue-light disinfection."],
    ["Heating & cooling", "Inverter climate systems included, plus independent bathroom heater (also ventilation)."],
    ["Smart home & lighting", "Voice control system, warm & cold lighting inside, exterior lighting included."],
    ["Windows & insulation", "Triple LOW-E tempered glazing, double glazing 6+6+6 and high-performance insulation."],
    ["Structure & transport", "Galvanized steel structure and integrated lifting rings for easy transport and installation."],
  ];
  const INSULATION = [
    { name: "Standard (included)", detail: "8 cm PU foam", u: "U ≈ 0.56 W/m²K" },
    { name: "Nordic Insulation Package", detail: "Thicker insulation system", u: "U ≈ 0.42 W/m²K", recommended: true },
  ];

  const cap = (o) => Object.assign({ category: "capsule-homes", kind: "capsule", currency: "EUR", exterior: "capsule", listed: true }, o);
  const PRODUCTS = [
    cap({ slug: "brasov", name: "Brașov", area: 12, rooms: "Studio", sleeps: "1–2", price: 15950, original: 22500, rating: 5, reviews: 5, dims: "4 × 3 × 3.2 m", balcony: false, defaultColor: "white" }),
    cap({ slug: "prague", name: "Prague", area: 18, rooms: "Studio", sleeps: "1–2", price: 18900, original: 28000, rating: 5, reviews: 8, dims: "5.6 × 3.3 × 3.2 m", balcony: false, tour: "https://www.720yun.com/vr/bcejesmmtk3", defaultColor: "white" }),
    cap({ slug: "santorini", name: "Santorini", area: 18, rooms: "Studio", sleeps: "1–2", price: 18900, original: 28000, rating: null, reviews: 0, dims: "5.6 × 3.3 × 3.2 m", balcony: true, tour: "https://www.720yun.com/vr/bcajesmmtf6", defaultColor: "white" }),
    cap({ slug: "amalfi", name: "Amalfi", area: 28, rooms: "1 bedroom", bedrooms: 1, sleeps: "2–4", price: 27300, original: 38500, rating: 4.8, reviews: 4, dims: "8.5 × 3.3 × 3.2 m", balcony: true, tour: "https://www.720yun.com/vr/3f3jesmm5m2", defaultColor: "white" }),
    cap({ slug: "barcelona", name: "Barcelona", area: 28, rooms: "1 bedroom", bedrooms: 1, sleeps: "2–4", price: 28100, original: 40000, rating: 5, reviews: 10, dims: "8.5 × 3.3 × 3.2 m", balcony: false, tour: "https://www.720yun.com/vr/7b8jesmm5n3", defaultColor: "white" }),
    cap({ slug: "madeira", name: "Madeira", area: 38, rooms: "1 bedroom", bedrooms: 1, sleeps: "2–4", price: 31900, original: 47500, rating: 5, reviews: 18, dims: "11.55 × 3.3 × 3.2 m", balcony: false, tour: "https://www.720yun.com/vr/202jesmm5k8", defaultColor: "white" }),
    cap({ slug: "london", name: "London", area: 38, rooms: "2 bedrooms", bedrooms: 2, sleeps: "4–6", price: 31900, original: 47500, rating: 5, reviews: 21, dims: "11.55 × 3.30 × 3.20 m", balcony: true, tour: "https://www.720yun.com/vr/1dejesmmzO5", weight: "~9.2 t", power: "220 V or 380 V (~16 kW)", tagline: "Space, light and freedom in perfect balance.", defaultColor: "grey" }),
    cap({ slug: "oslo", name: "Oslo", area: 38, rooms: "1 bedroom", bedrooms: 1, sleeps: "2–4", price: 31900, original: 46000, rating: 5, reviews: 2, dims: "11.55 × 3.3 × 3.2 m", balcony: false, note: "Square design", tour: "https://www.720yun.com/vr/abbjesmmrm1", defaultColor: "grey" }),
    cap({ slug: "antalya", name: "Antalya", area: 38, rooms: "1 bedroom", bedrooms: 1, sleeps: "2–4", price: 31500, original: 45000, rating: 5, reviews: 4, dims: "11.55 × 3.3 × 3.2 m", balcony: false, note: "Square design", tour: "https://www.720yun.com/vr/149jesmmtw7", defaultColor: "grey" }),
    cap({ slug: "two-story-house", name: "Two-story house (London + Prague)", area: null, rooms: "Two storeys", sleeps: "", price: 59500, original: 79500, rating: null, reviews: 0, tagline: "More space. More possibilities.", exterior: "placeholder", colors: ["white", "brown", "grey", "wood", "green"], defaultColor: "white", todo: "Stacked-render images not yet supplied – using London renders as placeholder." }),

    { slug: "tiny-home", category: "tiny-homes", kind: "tiny", name: "Tiny Home", price: 10800, original: 15500, rating: 4.8, reviews: 6, exterior: "own", defaultColor: "chestnut", colors: ["chestnut"],
      description: "A compact, modern home designed to make the most of every square metre. Ideal for private gardens, holiday stays and guest accommodation.", listed: true,
      media: { chestnut: { ai: [CAT("tiny-homes").hero, MK("tiny-home")] } }, todo: "Gallery (interior, kitchen, bathroom) renders shown in the mockup were not supplied." },

    { slug: "expandable-37", category: "expandable-containers", kind: "expandable", name: "Expandable 37 m²", area: 37, bedrooms: 3, living: 1, bathrooms: 1, price: 15500, perM2: 419, rating: 4.6, reviews: 4, exterior: "own", defaultColor: "woodblack", colors: ["woodblack"], listed: true,
      tagline: "More space. More flexibility.", power: "12 kW", sleeps: "2–6",
      specs: [["Dimensions (expanded)", "5.90 × 6.48 × 2.48 m"], ["Dimensions (folded)", "5.90 × 2.20 × 2.48 m"], ["Total area", "37 m² (38.2 m² per technical file)"], ["Bedrooms", "3"], ["Bathrooms", "1"], ["Occupancy", "2 – 6 people"], ["Weight", "~3.5 t"], ["Power supply", "12 kW"], ["Wall panels", "75 mm EPS sandwich panel (0.35 mm color-coated steel)"], ["Ceiling panels", "100 mm EPS sandwich panel"], ["Flooring", "18 mm magnesium oxide board + PVC or SPC finish"], ["Windows", "PVC windows (5 pcs)"], ["Entrance door", "Aluminium alloy, 1900 × 2230 mm"], ["Warranty", "2 years"]],
      media: { woodblack: { ai: [MK("expandable-37"), CAT("expandable-containers").hero] } }, floorPlanTodo: true, todo: "2D/3D floor plans and exterior series shown in the mockup were not supplied." },
    { slug: "expandable-74", category: "expandable-containers", kind: "expandable", name: "Expandable 74 m²", area: 74, bedrooms: 6, living: 1, bathrooms: 1, price: 31000, perM2: 419, rating: null, reviews: 0, exterior: "own", defaultColor: "woodblack", colors: ["woodblack"], listed: true,
      media: { woodblack: { ai: [MK("expandable-74"), CAT("expandable-containers").hero] } }, floorPlanTodo: true },

    { slug: "modular-m1", category: "modular-homes", kind: "modular", name: "Modular Home M1", area: 50, areaLabel: "base model", bedrooms: "2–3", living: 1, bathrooms: 1, price: 32900, perM2: 650, rating: null, reviews: 0, exterior: "own", defaultColor: "woodblack", colors: ["woodblack"], listed: true, media: { woodblack: { ai: [MK("modular-m1"), CAT("modular-homes").hero] } } },
    { slug: "modular-m2", category: "modular-homes", kind: "modular", name: "Modular Home M2", area: 70, areaLabel: "base model", bedrooms: 3, living: 1, kitchens: 1, price: 32900, perM2: 650, rating: null, reviews: 0, exterior: "own", defaultColor: "woodblack", colors: ["woodblack"], listed: true, media: { woodblack: { ai: [MK("modular-m2"), CAT("modular-homes").hero] } } },
    { slug: "saint-tropez", category: "modular-homes", kind: "modular", name: "Premium Modular Capsule Saint-Tropez", area: 56, areaLabel: "total area", bedrooms: 3, living: 1, bathrooms: 2, kitchens: 1, price: 61600, perM2: 1100, rating: null, reviews: 0, exterior: "own", defaultColor: "woodblack", colors: ["woodblack"], listed: true, media: { woodblack: { ai: [MK("saint-tropez"), CAT("modular-homes").hero] } } },
    { slug: "base-70", category: "modular-homes", kind: "modular", name: "Base 70 m² Modular Home", tagline: "Modern design. Spacious living. Built for real life.", area: 70, perM2: 650, price: null, rating: null, reviews: 0, exterior: "own", defaultColor: "woodblack", colors: ["woodblack"], listed: false, inDevelopment: true, media: { woodblack: { ai: ["base70-6", "base70-2", "base70-3", "base70-4", "base70-5", "base70-7"].map(MK) } } },

    { slug: "london-floating", category: "mobile-and-floating-homes", kind: "floating", name: "London Floating", area: 38, areaLabel: "house area", bedrooms: 2, price: 56620, perM2: 1490, rating: 5, reviews: 1, exterior: "own", defaultColor: "white", colors: ["white", "brown", "grey", "wood", "green"], listed: true, feature: ["waves", "Floating home", "Platform size customizable"], media: { white: { ai: [MK("london-floating"), CAT("floating-homes").hero] } }, todo: "Renders per colour not yet supplied." },
    { slug: "barcelona-floating", category: "mobile-and-floating-homes", kind: "floating", name: "Barcelona Floating", area: 28, areaLabel: "house area", bedrooms: "1–2", price: 41720, perM2: 1490, rating: 5, reviews: 2, exterior: "own", defaultColor: "white", colors: ["white", "brown", "grey", "wood", "green"], listed: true, feature: ["waves", "Floating home", "Platform size customizable"], media: { white: { ai: [MK("barcelona-floating"), CAT("floating-homes").hero] } }, todo: "Renders per colour not yet supplied." },
    { slug: "lightning-mcqueen", category: "mobile-and-floating-homes", kind: "mobile", name: "Lightning McQueen", area: 13.5, areaLabel: "total area", bedrooms: 1, price: 29900, rating: null, reviews: 0, exterior: "own", defaultColor: "white", colors: ["white"], listed: true, feature: ["wheel", "On wheels", "Road transportable"], media: { white: { ai: [MK("lightning-mcqueen")] } }, todo: "Product renders not yet supplied." },
  ];
  function CAT(slug) { return M.categories[slug]; }
  function MK(n) { return (window.VB_MOCKUP || {})[n]; }

  /* resolve exterior media per colour */
  PRODUCTS.forEach((p) => {
    if (p.exterior === "capsule") {
      p.media = M.houses[p.slug];
      p.colors = COLOR_ORDER.concat(["graphite"]).filter((c) => p.media[c]);
    } else if (p.exterior === "placeholder") {
      const lon = M.houses.london;
      p.media = {};
      p.colors.forEach((c) => (p.media[c] = { ai: [lon[c].ai[0]] }));
    }
    p.interiors = M.interiors[p.slug] || null;
    p.plans = M.plans[p.slug] || [];
    p.addons = (window.VB_ADDONS || {})[p.slug] || null;
    /* mockup-sourced page content (see content.js) */
    const C = window.VB_CONTENT || {};
    if (p.kind === "capsule") p.why = C._capsule.why;
    const x = C[p.slug];
    if (x) {
      Object.assign(p, x);
      if (x.addons) p.addons = Object.assign({ base: p.price }, x.addons);
      if (x.standardKey === "expandable") p.standard = C._expandableStandard.concat(x.standardExtra || []);
    }
  });

  /* ---------- showrooms ---------- */
  // status: open | appointment | soon | unavailable  — change in CMS to update the page instantly
  const SHOWROOMS = [
    { slug: "bucuresti", city: "Bucharest", country: "Romania", venue: "Noi Hypermarket", address: "Noi Hypermarket, București, Romania", status: "open", hours: "8:30 AM – 4 PM, Monday – Saturday", contact: "Cristian Petruș", phone: "+40 750 495 774", message: "Walk through a finished capsule home right in the city.", lat: 44.5020817, lng: 26.2127124 },
    { slug: "timisoara", city: "Timișoara", country: "Romania", venue: "Bastion Offices", address: "Bastion Offices, Timișoara, Romania", status: "appointment", contact: "Cristian Petruș", phone: "+40 750 495 774", lat: 45.7561944, lng: 21.232956 },
    { slug: "brasov", city: "Brașov", country: "Romania", venue: "Str. Ciobanului 9A", address: "Str. Ciobanului 9A, Brașov 500163, Romania", status: "open", hours: "8 AM – 4 PM, Monday – Friday", contact: "Lucian Lentz", phone: "+40 730 580 464", lat: 45.6824942, lng: 25.6177143 },
    { slug: "cluj-napoca", city: "Cluj-Napoca", country: "Romania", venue: "Iulius Mall", address: "Iulius Mall, Cluj-Napoca, Romania", status: "appointment", contact: "Cristian Petruș", phone: "+40 750 495 774", lat: 46.771833, lng: 23.6257605 },
    { slug: "montpellier", city: "Montpellier", country: "France", venue: "Parc des Expositions", address: "Parc des Expositions, Montpellier, France", status: "soon", phone: "+40 724 657 990", message: "Opening soon — contact us to be first to visit.", lat: 43.5715484, lng: 3.9507639 },
    { slug: "dublin", city: "Dublin", country: "Ireland", venue: "Sandyford Pitch and Putt Estate", address: "Sandyford Pitch and Putt Estate, Dublin, Ireland", status: "open", phone: "+353 87 349 3195", lat: 53.2635596, lng: -6.2289967 },
  ];
  const STATUS_LABEL = { open: "Open", appointment: "By appointment", soon: "Opening soon", unavailable: "Currently unavailable" };
  // order on the homepage pills (matches mockup), the rest follow
  const HOME_PILLS = ["bucuresti", "brasov", "cluj-napoca", "timisoara", "dublin", "montpellier"];

  /* ---------- deliveries / real projects ---------- */
  const house = (slug, color, i = 0) => M.houses[slug][color].ai[i];
  const FEATURED_PROJECTS = [
    { slug: "madeira-bistrita-nasaud", title: "Madeira Model Delivered to Bistrița-Năsăud, Romania", sub: "A Forest Retreat Surrounded by Nature, Thermal Waters, and Complete Relaxation", location: "Bistrița-Năsăud, Romania", model: "madeira", image: house("madeira", "brown"), todo: "Replace with project photography" },
    { slug: "floating-village-mamaia", title: "Floating Village Project in Mamaia, Romania", sub: "Most Ambitious Capsule House Projects In The World", location: "Mamaia, Romania", model: "london-floating", image: CAT("floating-homes").hero, todo: "Replace with project photography" },
    { slug: "two-london-brasov", title: "Two London Models Delivered Near Brașov, Romania", sub: "A Lakeside Project That Redefines Luxury Modular Living", location: "Near Brașov, Romania", model: "london", image: house("london", "green"), todo: "Replace with project photography" },
  ];
  const DELIVERIES = [
    ["Brașov", "capsule-homes", "brasov", house("brasov", "wood")],
    ["Prague", "capsule-homes", "prague", house("prague", "grey")],
    ["Santorini", "capsule-homes", "santorini", house("santorini", "green")],
    ["Amalfi", "capsule-homes", "amalfi", house("amalfi", "wood")],
    ["Tiny Home (Project 1)", "tiny-homes", "tiny-home", CAT("tiny-homes").hero],
    ["Tiny Home (Project 2)", "tiny-homes", "tiny-home", CAT("tiny-homes").hero],
    ["Tiny Home (Project 3)", "tiny-homes", "tiny-home", CAT("tiny-homes").hero],
    ["Expandable 37 m² (Project 1)", "expandable-containers", "expandable-37", CAT("expandable-containers").hero],
    ["Expandable 37 m² (Project 2)", "expandable-containers", "expandable-37", CAT("expandable-containers").hero],
    ["Expandable 37 m² (Project 3)", "expandable-containers", "expandable-37", CAT("expandable-containers").hero],
    ["Expandable 74 m²", "expandable-containers", "expandable-74", CAT("expandable-containers").hero],
    ["Modular Home M1 (Project 1)", "modular-homes", "modular-m1", CAT("modular-homes").hero],
    ["Base 70 m²", "modular-homes", "base-70", CAT("modular-homes").hero],
    ["Premium Modular Capsule Saint-Tropez", "modular-homes", "saint-tropez", CAT("modular-homes").hero],
    ["Modular Home M1 (Project 2)", "modular-homes", "modular-m1", CAT("modular-homes").hero],
  ].map(([title, category, model, image], i) => ({ slug: "delivery-" + (i + 1), title, category, model, image, location: "Delivered in Europe" }));

  /* ---------- blog ---------- */
  const POSTS = [
    { slug: "volume-discounts-capsule-houses", title: "Are There Discounts for Multiple Units?", date: "2026-07-03", image: house("amalfi", "wood", 1),
      excerpt: "Yes. For larger projects, View Box Houses offers volume discounts, applying from 5 units up.",
      body: ["Yes. For larger projects, View Box Houses offers volume discounts. In principle, these apply from 5 units up and are negotiated based on the scale of the project and the level of mobilization required.", "This approach is ideal for resorts, glamping villages, accommodation projects, real estate developments, or investments that use multiple units."] },
    { slug: "capsule-house-lifespan", title: "What Is the Lifespan of a Capsule House?", date: "2026-07-03", image: house("barcelona", "grey", 1),
      excerpt: "A capsule house is not a temporary solution — it's a long-term investment, with a 50-year warranty.",
      body: ["A capsule house is not a temporary solution — it's a long-term investment. The estimated lifespan of View Box Houses is over 50 years, and the structure comes with a 50-year warranty.", "This durability comes from the quality of the metal construction, the A-class insulation, and the fact that every house is produced in a controlled environment and checked before delivery."] },
  ];

  /* ---------- backgrounds (curated from supplied renders) ---------- */
  const BG = {
    hero: house("amalfi", "brown"),
    showrooms: M.interiors.london.luxury.living[0],
    global: house("brasov", "grey", 0),
    deliveries: CAT("capsule-homes").hero, // todo: client's crane-delivery render to replace this
    banner: CAT("capsule-homes").hero,
  };

  /* ---------- helpers ---------- */
  const money = (n) => "€" + Number(n).toLocaleString("en-US");
  const productsOf = (cat, includeUnlisted) => PRODUCTS.filter((p) => p.category === cat && (includeUnlisted || p.listed));
  const productBySlug = (s) => PRODUCTS.find((p) => p.slug === s);
  const categoryBySlug = (s) => CATEGORIES.find((c) => c.slug === s);
  /* all images for a colour, AI/lifestyle renders first (client request) */
  function imagesFor(p, color) {
    const m = p.media[color] || p.media[p.defaultColor] || Object.values(p.media)[0];
    return { ai: m.ai || [], cut: m.cut || null, exact: !!p.media[color] };
  }
  function cardImage(p, color) {
    const i = imagesFor(p, color || p.defaultColor);
    return i.ai[0] || i.cut;
  }
  function fromPrice(cat) {
    const prices = productsOf(cat).map((p) => p.price).filter(Boolean);
    return Math.min.apply(null, prices);
  }

  window.VB = { SITE, COLORS, COLOR_ORDER, CATEGORIES, PRODUCTS, SHOWROOMS, STATUS_LABEL, HOME_PILLS, FEATURED_PROJECTS, DELIVERIES, POSTS, BG, CAPSULE_STANDARD, INSULATION, money, productsOf, productBySlug, categoryBySlug, imagesFor, cardImage, fromPrice };
})();
