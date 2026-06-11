// ┌─────────────────────────────────────────────────────────────────────────┐
// │  KILL-SWITCH: bump CACHE_VERSION (e.g. 'v1' → 'v2') and push.          │
// │  The new SW activates, wipes all old caches, re-fetches everything.     │
// └─────────────────────────────────────────────────────────────────────────┘
const CACHE_VERSION = 'v1';
const CACHE_NAME    = `farmenglish-${CACHE_VERSION}`;

// Files to precache on SW install (offline-first guarantee)
const PRECACHE = [
  './',
  './index.html',
  './a1.html',
  './a2.html',
  './translations.js',
  './manifest.json',
  './assets/fonts/material-symbols-outlined.woff2',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
];

// ── install: cache core assets, skip waiting so new SW activates immediately
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE))
  );
});

// ── activate: delete stale caches, claim all clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// ── fetch ─────────────────────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only intercept same-origin GET requests
  if (request.method !== 'GET') return;
  let url;
  try { url = new URL(request.url); } catch { return; }
  if (url.origin !== self.location.origin) return;

  const p = url.pathname;

  // Cache-first: fonts and icons never change between deploys
  if (p.endsWith('.woff2') || p.endsWith('.png') || p.endsWith('.svg')) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Stale-while-revalidate: HTML, JS, JSON — serve instantly from cache,
  // update in background so users always get the latest on next visit.
  if (
    p.endsWith('.html') || p.endsWith('.js') || p.endsWith('.json') ||
    p === '/' || p.endsWith('/')
  ) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }
});

// ── strategies ────────────────────────────────────────────────────────────────
function cacheFirst(request) {
  return caches.match(request).then((cached) => {
    if (cached) return cached;
    return fetch(request).then((response) => {
      if (response.ok) {
        caches.open(CACHE_NAME).then((c) => c.put(request, response.clone()));
      }
      return response;
    });
  });
}

function staleWhileRevalidate(request) {
  const isNav = request.mode === 'navigate';
  return caches.open(CACHE_NAME).then((cache) =>
    cache.match(request).then((cached) => {
      const networkFetch = fetch(request).then((response) => {
        if (response.ok) cache.put(request, response.clone());
        return response;
      }).catch(() =>
        // Offline fallback: navigation → serve index.html from cache; others → null
        isNav ? caches.match('./index.html') : null
      );
      return cached || networkFetch;      // serve cache instantly if available
    })
  );
}
