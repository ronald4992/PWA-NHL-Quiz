const CACHE_NAME = 'nhl-scores-cache-v1';
const urlsToCache = [
  '.', // cachea index.html
  // No hay archivos externos, todo está inline salvo la imagen de logo que está en la web, pero podemos cachear esa también:
  'https://cdn.worldvectorlogo.com/logos/nhl.svg'
];

self.addEventListener('install', event => {
  // Cacheamos los archivos durante la instalación
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  // Respondemos con lo cacheado o con la petición en la red
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  // Limpiamos caches viejas si las hubiera
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    )
  );
});
