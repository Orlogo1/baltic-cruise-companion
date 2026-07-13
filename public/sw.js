const CACHE = "baltic-companion-github-v1";
const BASE = "/baltic-cruise-companion/";
const SHELL = [BASE, `${BASE}favicon.svg`, `${BASE}site.webmanifest`];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))));
  self.clients.claim();
});

self.addEventListener("message", (event) => {
  if (event.data?.type !== "CACHE_TRIP" || !Array.isArray(event.data.urls)) return;
  event.waitUntil(caches.open(CACHE).then(async (cache) => {
    const results = await Promise.allSettled(event.data.urls.map(async (url) => {
      const parsed = new URL(url);
      const external = parsed.origin !== self.location.origin;
      const request = new Request(url, { mode: external ? "no-cors" : "same-origin", credentials: external ? "omit" : "same-origin" });
      const response = await fetch(request);
      if (response.ok || response.type === "opaque") await cache.put(request, response.clone());
    }));
    const cachedSomething = results.some((result) => result.status === "fulfilled");
    event.ports[0]?.postMessage({ ok: cachedSomething });
  }).catch(() => event.ports[0]?.postMessage({ ok: false })));
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.hostname.endsWith("wikimedia.org") || url.hostname.endsWith("wikimediausercontent.org")) {
    event.respondWith(caches.open(CACHE).then((cache) => cache.match(event.request).then((cached) => cached || fetch(event.request).then((response) => { cache.put(event.request, response.clone()); return response; }))));
    return;
  }
  if (url.origin !== self.location.origin) return;
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
      const copy = response.clone();
      caches.open(CACHE).then((cache) => cache.put(event.request, copy));
      return response;
    }).catch(() => caches.match(BASE)))
  );
});
