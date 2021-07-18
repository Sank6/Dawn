self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/index.html',
        '/main.js',
        '/points.js',
        '/main.css',
        '/calendar/index.html',
        '/calendar/calendar.js',
        '/settings/index.html',
        '/settings/settings.js',
        '/settings/jquery.min.js',
        '/assets/tick.png',
        '/assets/streaks.png',
        '/assets/settings.png',
        '/assets/settings-bold.png',
        '/assets/right.png',
        '/assets/left.png',
        '/assets/notifications.png',
        '/assets/home.png',
        '/assets/home-bold.png',
        '/assets/edit.png',
        '/assets/chill-vibes.png',
        '/assets/calendar.png',
        '/assets/calendar-bold.png',
        '/assets/bin.png',
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