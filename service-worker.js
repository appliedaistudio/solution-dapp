const CACHE_NAME = 'cache-v1';
const urlsToCache = [
    './index.html',
    './css/base/base.css',
    './js/dapp.js'
];

let timeInterval = 10000; // Default time interval set to 10 seconds
let notificationTimer = null; // Reference for the notification timer
let latestNotificationBody = "Default notification message."; // Globally stores the latest notification body

// Install event handler
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

// Activate event handler
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activate event');
  clients.claim();
  startTimer(); // Start the timer when the service worker is activated
});

// Fetch event handler
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

// Message event handler to handle all incoming messages in a consolidated manner
self.addEventListener('message', (event) => {
  console.log('[Service Worker] Received message:', event.data);

  if (event.data.type === 'SET_INTERVAL') {
    timeInterval = event.data.interval;
    console.log('[Service Worker] Time Interval has been set to:', timeInterval);
    startTimer(); // Restart the timer with the new interval
  } else if (event.data.type === 'NOTIFICATION_BODY_RESPONSE') {
    // Save the notification body received from the main thread
    latestNotificationBody = event.data.body || "Default notification message.";
  }
});

function startTimer() {
  console.log('[Service Worker] Starting timer');

  function sendNotification() {
    // Send the notification using the latest stored body message
    self.registration.showNotification("Hello World", { body: latestNotificationBody })
        .then(() => console.log('[Service Worker] Notification displayed'))
        .catch(err => console.error('[Service Worker] Error displaying notification:', err));

    // Resetting the timer for the next notification
    notificationTimer = setTimeout(sendNotification, timeInterval);
  }

  // Clears any existing timer and sets a new one
  if (notificationTimer) {
    clearTimeout(notificationTimer);
  }
  notificationTimer = setTimeout(sendNotification, timeInterval);
}