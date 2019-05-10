// Register service worker only if supported
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(reg => {
            console.log("Service Worker has been registered successfully! " + reg.scope);
        })
        .catch(error => {
            console.log("Couldn't register service worker " + error);
        });
  }