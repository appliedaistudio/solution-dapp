const CACHE_NAME = 'cache-v1';
const urlsToCache = [
    './index.html',
    './css/base/base.css',
    './js/dapp.js'
];

let timeInterval = 10000; // Default time interval set to 10 seconds
let notificationTimer = null; // Reference for the notification timer

self.addEventListener('install', event => {
  console.log('[Service Worker] Install event');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching app shell');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activate event');
  clients.claim();
  startTimer(); // Start the timer when the service worker is activated
});

self.addEventListener('fetch', event => {
  console.log(`[Service Worker] Fetch event for ${event.request.url}`);
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          console.log(`[Service Worker] Found ${event.request.url} in cache`);
          return response;
        }
        console.log(`[Service Worker] Network request for ${event.request.url}`);
        return fetch(event.request);
      })
  );
});

// Add a listener for incoming messages
self.addEventListener('message', (event) => {
  console.log('[Service Worker] Received message:', event.data);
  if (event.data && event.data.type === 'SET_INTERVAL') {
    timeInterval = event.data.payload.interval;
    console.log('[Service Worker] Time Interval has been set to:', timeInterval);
    startTimer(); // Restart the timer with the new interval
  }
});

function startTimer() {
  console.log('[Service Worker] Starting timer');
  // Clear any existing timer
  if (notificationTimer) {
    clearTimeout(notificationTimer);
    console.log('[Service Worker] Cleared existing timer');
  }
  
  // Function to send a notification
  function sendNotification() {
    console.log('[Service Worker] Sending notification');
    self.registration.showNotification("Hello World", {
        body: "Periodic notification based on set interval."
    }).then(() => {
      console.log('[Service Worker] Notification displayed');
    }).catch((err) => {
      console.log('[Service Worker] Error displaying notification:', err);
    });
    // Restart the timer for the next notification
    notificationTimer = setTimeout(sendNotification, timeInterval);
    console.log(`[Service Worker] Timer set for next notification in ${timeInterval} ms`);
  }
  
  // Start the initial notification timer
  notificationTimer = setTimeout(sendNotification, timeInterval);
}