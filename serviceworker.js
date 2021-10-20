const CACHE_NAME = 'Soundclip';
const STATIC_CACHE_URLS = [
    "index.html",
    "style.css"
];

/*
if('serviceWorker' in navigator){
    navigator.serviceWorker.register("serviceworker.js")
        .then(function(){
            console.log("Service Worker Registered");
        });
}
*/


self.addEventListener("install", function(event){
    console.log("Install");
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache){
                return cache.addAll(STATIC_CACHE_URLS)
                    .then(function() {
                        console.log("Files added to cache");
                    })
                    .catch(function() {
                        console.log("Error while fetching");
                    });
            })
    )
});


self.addEventListener("activate", event => {
    console.log('Activate!');
    //alten Cache löschen die ned so heißen wie der Cache-Name von oben
    event.waitUntil(
        caches.keys()
            .then(keys => keys.filter(key => key !== CACHE_NAME))
            .then(keys => Promise.all(
                keys.map(key =>{
                    //console.log("Deleting cache "+ key);
                    return caches.delete(key);
                })
            ))
    )
});


self.addEventListener('fetch', function(event) {
    // console.log('Request of '+ event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response){
                    return response;        // Dieser Response kommt aus dem Cache
                }
                let fetchRequest = event.request.clone();
                return fetch(fetchRequest).then(response => {
                    if (!response || response.status != 200){
                        return response;
                    }
                    let responseToCache = response.clone();
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                            //console.log(response);
                        })
                    return response;
                });
            })
    );
});


self.addEventListener('push', event => {
    const title = "PWA Push Notification";
    const options = {
        body: event.data.text()
    }
    event.waitUntil(
        self.registration.showNotification(title, options)
    )
})