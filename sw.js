const CACHE_NAME = 'aguiaoficial-cache-v1';
const urlsToCache = [
  '/',
  'https://www.aguia-oficial.com/',
  'https://api.aguia-oficial.com/app.js',
  'https://api.aguia-oficial.com/manifest.json',
  'https://api.aguia-oficial.com/pwa/192.png',
  'https://api.aguia-oficial.com/pwa/512.png',
  'https://api.aguia-oficial.com/banner.webp'
];

// Install the service worker and cache essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate the service worker and clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event to serve cached content when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
