var senderId = '358654109615';

firebase.initializeApp({
    messagingSenderId: senderId
});

var messaging = firebase.messaging();

if (
    'Notification' in window && 
    'serviceWorker' in navigator && // ?
    'localStorage' in window && // no need?
    'fetch' in window && // no need?
    'postMessage' in window // ?
) { 
    messaging.onMessage(function(payload) {
        console.log('Message received', payload);
        var notificationElement = document.createElement('div');
        notificationElement.innerHTML = payload.data.body;
        document.getElementById('notifications-container').appendChild(notificationElement);
    
        // register fake ServiceWorker for show notification on mobile devices
        navigator.serviceWorker.register('/serviceworker/firebase-messaging-sw.js');
        Notification.requestPermission(function(permission) {
            if (permission === 'granted') {
                navigator.serviceWorker.ready.then(function(registration) {
                    // Copy data object to get parameters in the click handler
                    payload.data.data = JSON.parse(JSON.stringify(payload.data)); // ?
                    registration.showNotification(payload.data.title, payload.data); // ?
                }).catch(function(error) {
                    alert('ServiceWorker registration failed', error);
                });
            }
        });
    });
    
    messaging.onTokenRefresh(function() {
        messaging.getToken()
            .then(function(refreshedToken) {
                console.log('Token refreshed');
    
                document.getElementById('current-token').innerHTML = refreshedToken;
            })
            .catch(function(error) {
                alert('Unable to retrieve refreshed token', error);
            });
    });

    if (Notification.permission === 'granted') {
        getToken();
    } else {
        document.getElementById('current-token').innerHTML = 'No Instance ID token available. Request permission to generate one';
    }
} else {
    if (!('Notification' in window)) {
        alert('Notification not supported');
    } else if (!('serviceWorker' in navigator)) {
        alert('ServiceWorker not supported');
    } else if (!('localStorage' in window)) {
        alert('LocalStorage not supported');
    } else if (!('fetch' in window)) {
        alert('fetch not supported');
    } else if (!('postMessage' in window)) {
        alert('postMessage not supported');
    }

    console.warn('This browser does not support desktop notification.');
    console.log('Is HTTPS', window.location.protocol === 'https:');
    console.log('Support Notification', 'Notification' in window);
    console.log('Support ServiceWorker', 'serviceWorker' in navigator);
    console.log('Support LocalStorage', 'localStorage' in window);
    console.log('Support fetch', 'fetch' in window);
    console.log('Support postMessage', 'postMessage' in window);
}

function getToken() {
    messaging.requestPermission() // ?
        .then(function() {
            messaging.getToken()
                .then(function(currentToken) {
                    if (currentToken) {
                        document.getElementById('current-token').innerHTML = currentToken;
                    } else {
                        document.getElementById('current-token').innerHTML = 'No Instance ID token available. Request permission to generate one';
                    }
                })
                .catch(function(error) {
                    alert('An error occurred while retrieving token. ' + error);
                });
        })
        .catch(function(error) {
            alert('Unable to get permission to notify. ' + error);
        });
}

function deleteToken() {
    messaging.getToken()
    .then(function(currentToken) {
        messaging.deleteToken(currentToken)
            .then(function() {
                console.log('Token deleted');
                document.getElementById('current-token').innerHTML = 'No Instance ID token available. Request permission to generate one';
            })
            .catch(function(error) {
                alert('Unable to delete token', error);
            });
    })
    .catch(function(error) {
        alert('Error retrieving Instance ID token', error);
    });
}