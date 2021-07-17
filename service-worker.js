self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/index.html',
        '/main.js',
        '/main.css',
        '/calendar/index.html',
        '/settings/index.html',
        '/assets/streaks.png',
        '/assets/settings.png',
        '/assets/right.png',
        '/assets/left.png',
        '/assets/notifications.png',
        '/assets/home.png',
        '/assets/calendar.png',
        '/assets/icons/192x192.png',
        '/assets/icons/512x512.png',
        '/assets/screenshots/home.png',
        '/assets/screenshots/calendar.png',
      ]);
    })
  );
});


self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => {
      return resp || fetch(event.request).then((response) => {
        return caches.open('v1').then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});