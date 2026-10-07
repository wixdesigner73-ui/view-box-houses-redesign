/* Product-page content taken from the client's product-page mockups (tiny, expandable, floating, modular, capsule).
   Everything here is mockup-sourced copy: confirm before launch. Empty / missing = not shown (nothing is invented). */
window.VB_CONTENT = {
  _capsule: {
    why: {
      title: "Why we recommend these upgrades",
      intro: "A higher initial investment can mean lower energy costs, greater comfort and a better long-term experience.",
      items: [
        ["Nordic Insulation", "Keep warmth. Keep costs down. Better insulation reduces heat transfer, keeps the house comfortable and lowers energy consumption over time."],
        ["More powerful inverter", "Reach comfort faster. Use less energy. A higher-capacity inverter reaches the desired temperature quickly, then maintains it efficiently — just like a car that switches to a higher gear."],
        ["Underfloor heating", "Comfort from the ground up. Underfloor heating provides consistent warmth, improves comfort and works perfectly together with the inverter system."],
      ],
    },
  },

  "tiny-home": {
    trust: [["shield", "2 years<br>warranty"], ["box", "Kit<br>delivery"], ["globe", "10+ countries<br>shipped"]],
    tagline: "Big possibilities in a smaller footprint.",
    quick: [["home", "21.12 m²", "Total area"], ["users", "2–4", "People"], ["bolt", "5 kW", "Power supply"]],
    priceNote: "Kit house – assembly not included",
    exteriorTitle: "Exterior finish", exteriorSub: "Chestnut finish to match any landscape.",
    standard: [
      ["layers", "Durable steel structure", "Galvanized steel frame (G550) with waterproof alloy exterior panels and fluorocarbon paint finish."],
      ["building", "Insulation & windows", "80 mm XPS insulation with waterproof membrane. 6 mm + 16A + 6 mm double tempered glass windows. Opening windows included."],
      ["door", "Modern entrance", "Stainless steel door with waterproof smart lock and exterior LED light strip."],
      ["sofa", "Comfortable interior", "Aluminium alloy ceiling, carbon crystal wall panels, SPC flooring and LED downlights."],
      ["bath", "Fully equipped bathroom", "Shower, washbasin with cabinet and mirror, toilet, 3-in-1 (lighting + ventilation + heating), premium walls and non-slip tiles."],
      ["bolt", "Electrical & plumbing", "Complete electrical installation, water supply and drainage, sockets, switch panel and network cable (Cat 6)."],
    ],
    kit: { title: "Delivered as a kit.", text: "The Tiny Home is delivered as a kit. Assembly is not included in the starting price and can be added as an optional service." },
    addons: {
      title: "Configure your Tiny Home", sub: "Choose the recommended configuration or add more features based on your needs.",
      recTitle: "View Box Recommended", recSub: "The essentials for a more comfortable experience.", optTitle: "Customize Further", optSub: "Add more features based on your needs.",
      recommended: [{ name: "Premium bed + mattress", price: 1000, icon: "bed" }, { name: "Underfloor heating + pipe protection", price: 1000, icon: "gear" }],
      optional: [{ name: "6 additional wheels (solid rubber)", price: 2100, icon: "wheel" }, { name: "2 clothes-hanging stands", price: 120, icon: "home" }, { name: "House assembly", price: 2000, icon: "gear" }],
    },
    why: {
      title: "Why we recommend these upgrades", intro: "These optional upgrades make your Tiny Home even more comfortable and better suited to your lifestyle.",
      items: [["Premium bed + mattress", "A high-quality bed for better sleep and a more enjoyable stay."], ["Underfloor heating", "Provides consistent warmth and protects the pipes."], ["Additional wheels", "Helps to meet local regulations in some areas. The wheels are not for moving the house."]],
    },
    closing: { title: "A smaller home.<br>A bigger freedom.", text: "The Tiny Home brings modern living closer to nature." },
    specs: [["Dimensions", "6.6 × 3.2 × 3.25 m"], ["Total area", "21.12 m²"], ["Occupancy", "2 – 4 people"], ["Weight", "~3.8 t"], ["Power supply", "5 kW"], ["Glazing", "6 mm + 16A + 6 mm double tempered"], ["Insulation", "80 mm XPS"], ["Assembly", "Not included (kit)"]],
    faq: [["Is assembly included in the price?", "No. The Tiny Home is delivered as a kit and assembly is not included in the starting price. House assembly can be added as an optional service (+€2,000)."], ["What are the wheels for?", "The additional wheels help meet local regulations in some areas. They are not for moving the house."]],
    cta: { title: "Ready for your own Tiny Home?", text: "Our team is here to help you every step of the way." },
  },

  "expandable-37": {
    trust: [["shield", "2 years<br>warranty"], ["gear", "Fully equipped<br>option"], ["globe", "10+ countries<br>shipped"]],
    quick: [["home", "37 m²", "Total area"], ["bed", "3", "Bedrooms"], ["users", "2–6", "People"], ["bolt", "12 kW", "Power supply"]],
    priceNote: "Base house – essential structure and systems",
    exteriorTitle: "Exterior view", exteriorSub: "Modern, practical and ready for any environment.",
    standardKey: "expandable",
    kit: { title: "Delivered as a complete house.", text: "The Expandable Container is delivered fully built and ready to use. No assembly is required on your side. Furnishing and upgrades available as optional extras." },
    addons: {
      title: "Configure your 37 m²", sub: "Choose the available options based on your needs.", optLabel: "Additional Option",
      recTitle: "View Box Recommended", optTitle: "Additional Option",
      recommended: [{ name: "Fully Assembled Package", price: 2500, icon: "sofa", details: ["3 fully equipped bedrooms (bed + wardrobe)", "Electrical outlets in each bedroom", "Dining / living area with extendable armchair/sofa", "Sink + kitchen cabinets", "Air conditioning"], note: "The products included in this package are entry quality level. If you require higher quality standards, we advise you to discuss the details with our sales team." }],
      optional: [{ name: "On-site expansion", price: 1000, icon: "maximize", details: ["Extension of the folded container after it is placed on site. This service refers only to opening/extending the container sections. It does not include furniture, air conditioning or other equipment, which can be discussed separately with our sales team."], note: "This is an on-site expansion service only. If you also need furnishing or other equipment, please discuss your requirements with our sales team." }],
      selectRecommended: true,
    },
    closing: { title: "Expandable living<br>for more possibilities.", text: "A complete and flexible solution for homes, holiday rentals or workspaces." },
    faq: [["Is the house delivered fully built?", "Yes. The Expandable Container is delivered fully built and ready to use. No assembly is required on your side."], ["What does the fully assembled package include?", "3 fully equipped bedrooms (bed + wardrobe), electrical outlets in each bedroom, a dining / living area with extendable armchair/sofa, sink + kitchen cabinets and air conditioning (entry quality level)."], ["What does the on-site expansion include?", "Opening/extending the container sections after it is placed on site. It does not include furniture, air conditioning or other equipment."]],
    cta: { title: "Want to learn more or get a personalized recommendation?", text: "" },
  },

  "expandable-74": {
    trust: [["shield", "2 years<br>warranty"], ["gear", "Fully equipped<br>option"], ["globe", "10+ countries<br>shipped"]],
    tagline: "More space. More possibilities.",
    quick: [["home", "74 m²", "Total area"], ["bed", "6", "Bedrooms"], ["users", "4–8", "People"], ["bolt", "12 kW", "Power supply"]],
    priceNote: "Base house – essential structure and systems",
    exteriorTitle: "Exterior view", exteriorSub: "Modern design with a spacious layout.",
    standardKey: "expandable", standardExtra: [["kitchen", "Kitchen (standard)", "L-shaped kitchen cabinets with sink."]],
    kit: { title: "Delivered as a complete house.", text: "The Expandable Container is delivered fully built and ready to use. No assembly is required on your side. Furnishing and upgrades available as optional extras." },
    addons: {
      title: "Configure your 74 m²", sub: "Choose the available options based on your needs.",
      recTitle: "View Box Recommended", optTitle: "Additional Option",
      recommended: [{ name: "Fully Assembled Package", price: 5000, icon: "sofa", details: ["6 fully equipped bedrooms (bed + wardrobe)", "Electrical outlets in each bedroom", "Dining / living area with extendable armchair/sofa", "Sink + kitchen cabinets", "Air conditioning"], note: "The products included in this package are entry quality level. If you require higher quality standards, we advise you to discuss the details with our sales team." }],
      optional: [{ name: "On-site expansion", price: 2000, icon: "maximize", details: ["Extension of the folded container after it is placed on site. This service refers only to opening/extending the container sections. It does not include furniture, air conditioning or other equipment, which can be discussed separately with our sales team."], note: "This is an on-site expansion service only. If you also need furnishing or other equipment, please discuss your requirements with our sales team." }],
      selectRecommended: true,
    },
    closing: { title: "More space<br>for bigger plans.", text: "A complete and flexible solution for homes, holiday rentals or workspaces." },
    specs: [["Dimensions (expanded)", "11.80 × 6.20 × 2.48 m"], ["Dimensions (folded)", "11.80 × 2.20 × 2.48 m"], ["Total area", "74 m²"], ["Bedrooms", "6"], ["Bathrooms", "1"], ["Occupancy", "4 – 8 people"], ["Weight", "~6.5 t"], ["Power supply", "12 kW"], ["Wall panels", "75 mm EPS sandwich panel (0.35 mm color-coated steel)"], ["Ceiling panels", "100 mm EPS sandwich panel"], ["Internal partitions", "100 mm EPS sandwich panel"], ["Flooring", "18 mm magnesium oxide board + PVC or SPC finish"], ["Windows", "PVC windows"], ["Entrance door", "Aluminium alloy, 1900 × 2230 mm"], ["Interior doors", "750 × 2050 mm"], ["Electrical system", "RCD, circuit breakers, LED lights, sockets and switches"], ["Kitchen (standard)", "L-shaped kitchen cabinets"], ["Bathroom (standard)", "Shower, washbasin, toilet, mirror, cabinet, sliding door, floor drain, water supply & drainage"], ["Warranty", "2 years"]],
    faq: [["Is the house delivered fully built?", "Yes. The Expandable Container is delivered fully built and ready to use. No assembly is required on your side."], ["What does the fully assembled package include?", "6 fully equipped bedrooms (bed + wardrobe), electrical outlets in each bedroom, a dining / living area with extendable armchair/sofa, sink + kitchen cabinets and air conditioning (entry quality level)."], ["What does the on-site expansion include?", "Opening/extending the container sections after it is placed on site. It does not include furniture, air conditioning or other equipment."]],
    cta: { title: "Want to learn more or get a personalized recommendation?", text: "" },
  },

  "london-floating": {
    trust: [["shield", "2 years<br>warranty (house)"], ["box", "Delivered<br>complete"], ["globe", "10+ countries<br>shipped"]],
    title: "London Floating Home 38 m²", tagline: "A premium floating home for a unique lifestyle.",
    quick: [["home", "38 m²", "Total area"], ["bed", "2", "Bedrooms"], ["users", "2–4", "People"], ["waves", "Floating", "home"]],
    priceNote: "Estimated floater price from ~€25,000 + VAT. The final cost of the floater will depend on the exact dimensions, specifications and requirements of your project.",
    exteriorTitle: "Exterior view", exteriorSub: "A modern design on water.",
    standard: [
      ["layers", "Durable steel structure", "Galvanized steel with anti-corrosion treatment."], ["building", "Insulation & glazing", "High-performance PU insulation and triple LOW-E tempered glass."],
      ["door", "Doors & windows", "Aluminium entrance door and panoramic windows."], ["sofa", "Interior finishes", "Carbon crystal panels, SPC flooring and modern ceiling."],
      ["bolt", "Electrical & plumbing", "Complete installation ready for use (220 V)."], ["bath", "Fully equipped bathroom", "Shower, washbasin, toilet, mirror, cabinet and water connections."],
      ["gear", "Air conditioning", "12,000 BTU for 1 bedroom (standard)."], ["bolt", "LED lighting", "Interior and exterior LED lights."],
    ],
    kit: { title: "Delivered as a complete house.", text: "The London Floating Home is delivered fully built and ready to use. The floater is built according to your project requirements." },
    closing: { title: "Life on water.<br>Without limits.", text: "The London Floating Home combines modern design, premium comfort and the freedom of a unique lifestyle." },
    specs: [["Dimensions (L × W × H)", "11.5 × 3.3 × 3.2 m"], ["Total area", "38 m²"], ["Bedrooms", "2"], ["Bathrooms", "1"], ["Occupancy", "2 – 4 people"], ["Weight (house)", "~9.2 t"], ["Power supply", "220 V, 10 kW"], ["Insulation", "PU foam (walls 15–25 cm, roof/floor 25–30 cm)"], ["Windows", "Triple LOW-E tempered glass"], ["Air conditioning", "12,000 BTU (standard)"], ["Underfloor heating", "Optional"], ["Structure", "Galvanized steel (2–3 mm) with anti-corrosion treatment"], ["Warranty", "2 years (house)"]],
    specNote: "The floating platform (floater) is custom built. The final specifications, dimensions and price depend on your project requirements.",
    faq: [["How much does the floater cost?", "The estimated floater price starts from ~€25,000 + VAT. The final cost depends on the exact dimensions, specifications and requirements of your project."], ["Is the house delivered complete?", "Yes. The London Floating Home is delivered fully built and ready to use; the floater is built according to your project requirements."]],
    cta: { title: "Want to learn more or get a personalized recommendation?", text: "" },
  },

  "base-70": {
    tagline: "Modern design. Spacious living. Built for real life.",
    gallery: ["base70-6", "base70-2", "base70-3", "base70-4", "base70-5", "base70-7"],
  },
};

/* "A lot comes standard" shared by both Expandable Containers (mockup) */
window.VB_CONTENT._expandableStandard = [
  ["layers", "Galvanized steel structure", "Fully galvanized main frame and side-wing frame with protective powder coating."],
  ["building", "Insulation & panels", "75 mm EPS sandwich wall panels, 100 mm EPS ceiling panels and 100 mm internal partitions."],
  ["door", "Doors & windows", "Aluminium alloy entrance door, interior doors and PVC windows."],
  ["home", "Flooring", "18 mm fire-resistant magnesium oxide board with PVC or SPC finish."],
  ["bath", "Complete bathroom", "Shower, washbasin with cabinet, mirror, toilet, sliding door, floor drain and water supply & drainage."],
  ["bolt", "Electrical installation", "RCD and circuit breakers, LED lighting, sockets and switches. Ready for household use."],
];
