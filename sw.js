/* ENG7101 Practice — service worker
   Network-first so students always get your newest chapters when online,
   with a cache fallback so the app still opens offline.
   Bump CACHE_VERSION any time you want to force-clear old caches. */
const CACHE_VERSION = "eng7101-v1";

self.addEventListener("install", (e) => {
  self.skipWaiting();                       // activate the new version immediately
});

self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  // Only handle same-origin GETs. This deliberately ignores the cross-origin
  // POST that sends results to your Google Sheet, so sync is never interfered with.
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;

  e.respondWith((async () => {
    try {
      const fresh = await fetch(req);       // prefer the live version (new chapters)
      const cache = await caches.open(CACHE_VERSION);
      cache.put(req, fresh.clone());
      return fresh;
    } catch (err) {                          // offline → fall back to cache
      const cached = await caches.match(req);
      if (cached) return cached;
      if (req.mode === "navigate") {
        const idx = (await caches.match("./")) || (await caches.match("index.html"));
        if (idx) return idx;
      }
      throw err;
    }
  })());
});
