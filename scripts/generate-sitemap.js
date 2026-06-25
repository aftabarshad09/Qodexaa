// Regenerates public/sitemap.xml (and dist/client/sitemap.xml, if a build
// output exists) from the actual route table in src/App.jsx, so the sitemap
// can't silently drift from the real routes. Wired in as the npm "postbuild"
// lifecycle script — runs automatically after `npm run build`.
//
// Deliberately excludes:
//  - any www.qodexaa.com variant — qodexaa.com (non-www) is canonical
//  - dynamic routes (path containing ":"), e.g. /services/:slug and
//    /blog/:slug — those are catch-alls, not individually indexable URLs.
//    Concrete blog post URLs are derived separately from blogData.js below.
//  - /projects no longer exists as a React Router route at all (it's a
//    server-level 301 redirect to "/" in server.js), so it's excluded
//    automatically by virtue of not appearing in App.jsx.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { blogArticles } from "../src/data/blogData.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const ORIGIN = "https://qodexaa.com";
const today = new Date().toISOString().slice(0, 10);

function getStaticRoutesFromAppJsx() {
  const appJsxPath = path.join(ROOT, "src", "App.jsx");
  const source = fs.readFileSync(appJsxPath, "utf-8");
  const matches = [...source.matchAll(/<Route\s+path="([^"]+)"/g)].map((m) => m[1]);

  if (matches.length === 0) {
    throw new Error(`No <Route path="..."> entries found in ${appJsxPath} — route table may have moved or changed shape.`);
  }

  // Dynamic segments (":slug" etc.) aren't individually indexable URLs —
  // their concrete instances come from the relevant data source instead.
  const staticRoutes = [...new Set(matches.filter((p) => !p.includes(":")))];

  if (staticRoutes.length === 0) {
    throw new Error("All routes parsed from App.jsx were dynamic — got zero static routes.");
  }

  return staticRoutes;
}

function buildUrls() {
  const staticRoutes = getStaticRoutesFromAppJsx();

  if (!Array.isArray(blogArticles) || blogArticles.length === 0) {
    throw new Error("blogData.js exported an empty or missing blogArticles array — refusing to generate a sitemap with no blog posts.");
  }

  const urls = [
    ...staticRoutes.map((loc) => ({ loc, lastmod: today })),
    // TODO: blogData.js only tracks the original publish date (`date`), not
    // a separate last-updated field. Reusing it as lastmod is fine while
    // posts are static, but if posts ever get edited post-publish, add a
    // dedicated `lastUpdated` field per post and use that here instead —
    // otherwise an edited post's sitemap entry won't reflect the real
    // change date.
    ...blogArticles.map((post) => ({ loc: `/blog/${post.slug}`, lastmod: post.date })),
  ];

  if (urls.length === 0) {
    throw new Error("Computed zero sitemap URLs — refusing to write an empty sitemap.");
  }

  return urls;
}

function toXml(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${ORIGIN}${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`).join("\n")}
</urlset>
`;
}

function main() {
  const urls = buildUrls();
  const xml = toXml(urls);

  const publicPath = path.join(ROOT, "public", "sitemap.xml");
  fs.writeFileSync(publicPath, xml);
  console.log(`[sitemap] wrote ${urls.length} URLs to ${publicPath}`);

  // The client build already copied the old public/sitemap.xml into
  // dist/client before this postbuild script runs, so overwrite it there
  // too — otherwise the version actually served in production is stale.
  const distClientPath = path.join(ROOT, "dist", "client", "sitemap.xml");
  if (fs.existsSync(path.join(ROOT, "dist", "client"))) {
    fs.writeFileSync(distClientPath, xml);
    console.log(`[sitemap] wrote ${urls.length} URLs to ${distClientPath}`);
  }
}

try {
  main();
} catch (err) {
  console.error("[sitemap] generation failed:", err.message);
  process.exit(1);
}
