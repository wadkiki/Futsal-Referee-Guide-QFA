const CACHE_NAME = 'futsal-ref-guide-v4';
const urlsToCache = [
  '/',
  './index.html',
  './manifest.json',
  './index.tsx',
  './App.tsx',
  './types.ts',
  './constants/quizData.ts',
  './components/WelcomeScreen.tsx',
  './components/QuizScreen.tsx',
  './components/ResultsScreen.tsx',
  './assets/icons/icon.svg',
  'https://cdn.tailwindcss.com',
  'https://www.qfa.qa/assets/public/media/logo/header-logo.svg',
  'https://esm.sh/react@19.1.1',
  'https://esm.sh/react-dom@19.1.1/client'
];

// Install the service worker and cache the app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.error('Failed to cache resources during install:', err);
      })
  );
});

// Serve cached content when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Not in cache - fetch from network, then cache it
        return fetch(event.request).then(
          (response) => {
            // Check if we received a valid response
            if (!response || response.status !== 200) {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                // Do not cache chrome extension requests
                if (!event.request.url.startsWith('chrome-extension://')) {
                  cache.put(event.request, responseToCache);
                }
              });

            return response;
          }
        );
      })
  );
});

// Clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});