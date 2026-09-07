// Run against an already-built local server: npm run check:production
import assert from 'node:assert/strict';
const base = process.env.CHECK_BASE_URL || 'http://127.0.0.1:3100';
const canonicalOrigin = 'https://blockchain-demo.therakibul.me';
const cache = new Map();
async function get(route) {
  const key = new URL(route, base).pathname;
  if (!cache.has(key)) cache.set(key, (async () => {
    const res = await fetch(new URL(key, base));
    assert.equal(res.status, 200, key);
    return res.text();
  })());
  return cache.get(key);
}
const sitemap = await get('/sitemap.xml');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => new URL(m[1]));
const articleUrls = urls.filter(url => url.pathname.startsWith('/articles/'));
assert.equal(articleUrls.length, 3);
const titles = new Set(), descriptions = new Set();
for (const url of articleUrls) {
  const html = await get(url.pathname);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  assert.equal(canonical, url.href);
  assert.equal((await fetch(new URL(url.pathname, base), { redirect: "manual" })).status, 200, "Canonical path must resolve without a redirect");
  assert.ok(title && description);
  titles.add(title); descriptions.add(description);
  assert.equal([...html.matchAll(/<h1[\s>]/g)].length, 1);
  const jsonLd = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  assert.equal(jsonLd['@type'], 'Article');
  assert.equal(jsonLd.url, canonical);
  assert.equal(jsonLd.author.name, 'Rakibul Islam');
  assert.equal(jsonLd.author.url, 'https://therakibul.me/');
  assert.ok(html.toLowerCase().includes(`datetime="${jsonLd.dateModified}"`));
  const plain = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ');
  assert.ok(plain.split(/\s+/).length > 600, 'Substantial crawlable article body');
}
assert.equal(titles.size, 3); assert.equal(descriptions.size, 3);
// Verify all sitemap routes and every local content link / fragment without JS.
for (const url of urls) {
  assert.equal(url.origin, canonicalOrigin);
  const html = await get(url.pathname);
  const anchors = [...html.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(m => m[1].replaceAll('&amp;', '&'));
  for (const href of anchors) {
    const target = new URL(href, new URL(url.pathname, base));
    if (target.origin !== new URL(base).origin) continue;
    const targetHtml = await get(target.pathname);
    if (target.hash) assert.ok(targetHtml.includes(`id="${decodeURIComponent(target.hash.slice(1))}"`), `${url.pathname} -> ${href}`);
  }
}
assert.equal((await fetch(new URL('/articles/does-not-exist', base))).status, 404);
console.log(`Production checks passed: ${urls.length} sitemap pages, 3 unique articles, metadata, JSON-LD, local links and fragments, example downloads, and article 404.`);
