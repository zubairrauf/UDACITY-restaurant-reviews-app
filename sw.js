var staticCache = 'restaurant-review-1.9';
let urlToCache = [
    '/',
    '/restaurant.html',
    '/css/styles.css',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/js/dbhelper.js',
    '/js/register-sw.js'
];

//Install the service worker
self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(staticCache).then(function(cache){
            return cache.addAll(urlToCache);
        }).catch(error =>{
            console.log(error);
        })
    );
});

//Activate the service worker
self.addEventListener('activate', function(event){
    event.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(
                cacheNames.filter(function(cacheName){
                    return cacheName.startsWith('restaurant-')&&
                        cacheName != staticCache;
                }).map(function(cacheName){
                    return caches.delete(cacheName)
                })
            );
        })
    );
});

//Fetch requests and serve offline content
self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request).then(function(response){
            return response || fetch(event.request);
        })
    );
});