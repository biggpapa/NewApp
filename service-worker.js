// Embrace Bharat Foundation — Service Worker
// Enables the site to be installed as an Android app and to keep working
// (showing the last-loaded pages) when the connection drops.

const CACHE_VERSION = "ebf-v1";
const CORE_ASSETS = [
    "./",
    "./index.html",
    "./manifest.webmanifest",
    "./icons/icon-192.png",
    "./icons/icon-512.png",
    "./icons/icon-512-maskable.png",
    "./icons/apple-touch-icon-180.png",
    "./icons/favicon-32.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_VERSION).then((cache) => cache.addAll(CORE_ASSETS))
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys
                    .filter((key) => key !== CACHE_VERSION)
                    .map((key) => caches.delete(key))
            )
        )
    );
    self.clients.claim();
});

// Network-first for navigations (so content updates when online),
// falling back to the cached shell when offline.
// Cache-first for everything else (images, fonts, etc).
self.addEventListener("fetch", (event) => {
    const { request } = event;

    if (request.mode === "navigate") {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    const copy = response.clone();
                    caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy));
                    return response;
                })
                .catch(() => caches.match("./index.html"))
        );
        return;
    }

    event.respondWith(
        caches.match(request).then((cached) => {
            if (cached) return cached;
            return fetch(request)
                .then((response) => {
                    // Only cache same-origin, successful responses to keep things simple.
                    if (response.ok && request.url.startsWith(self.location.origin)) {
                        const copy = response.clone();
                        caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy));
                    }
                    return response;
                })
                .catch(() => cached);
        })
    );
});
