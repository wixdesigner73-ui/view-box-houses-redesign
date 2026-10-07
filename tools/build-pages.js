// Generates the static HTML shells (all content is rendered from assets/js/*.js + data.js)
const fs = require("fs"), path = require("path");
const OUT = path.resolve(__dirname, "..", "site");
const pages = [
  ["index", "home", "overlay", "home", "View Box Houses – Modern Homes for a Brighter Tomorrow", "Premium capsule, tiny, modular, expandable and floating homes, delivered across Europe."],
  ["category", "category", "light", "category", "Homes – View Box Houses", "Explore View Box Houses models."],
  ["product", "product", "light", "product", "Model – View Box Houses", "View Box Houses model details, colours, interiors and configuration."],
  ["deliveries", "deliveries", "overlay", "deliveries", "Deliveries – View Box Houses", "Real projects delivered across Europe."],
  ["showrooms", "showrooms", "overlay", "showrooms", "Showrooms – View Box Houses", "Visit a View Box showroom in Romania, France or Ireland."],
  ["about", "about", "light", "pages", "About – View Box Houses", "A house is a quiet act of engineering."],
  ["blog", "blog", "light", "pages", "News – View Box Houses", "Stories, insights and updates from the world of modular living."],
  ["post", "post", "light", "pages", "News – View Box Houses", "View Box Houses news."],
  ["contact", "contact", "light", "pages", "Contact – View Box Houses", "Talk to the View Box Houses sales team."],
];
for (const [file, page, header, script, title, desc] of pages) {
  fs.writeFileSync(path.join(OUT, file + ".html"), `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="theme-color" content="#0a1220">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 32 32%27%3E%3Crect width=%2732%27 height=%2732%27 rx=%277%27 fill=%27%230a1220%27/%3E%3Cpath d=%27M7 9l9 15 9-15%27 stroke=%27%23e4ac3f%27 stroke-width=%273%27 fill=%27none%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css">
</head>
<body data-page="${page}" data-header="${header}">
<main id="main"></main>
<script src="assets/js/manifest.js"></script>
<script src="assets/js/mockup.js"></script>
<script src="assets/js/addons.js"></script>
<script src="assets/js/content.js"></script>
<script src="assets/js/data.js"></script>
<script src="assets/js/core.js"></script>
<script src="assets/js/${script}.js"></script>
</body>
</html>
`);
}
console.log("pages written");
