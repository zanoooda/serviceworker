var senderId = '358654109615';

firebase.initializeApp({
    messagingSenderId: senderId
});

var messaging = firebase.messaging();

// handle catch the notification on current page
messaging.onMessage(function(payload) {
    console.log('Message received', payload);

    // register fake ServiceWorker for show notification on mobile devices
    navigator.serviceWorker.register('/serviceworker/firebase-messaging-sw.js');
    Notification.requestPermission(function(permission) {
        if (permission === 'granted') {
            navigator.serviceWorker.ready.then(function(registration) {
                // Copy data object to get parameters in the click handler
                payload.data.data = JSON.parse(JSON.stringify(payload.data));
                registration.showNotification(payload.data.title, payload.data);

                alert(JSON.stringify(payload))
            }).catch(function(error) {
                // registration failed :(
                alert('ServiceWorker registration failed', error);
            });
        }
    });
});

// Callback fired if Instance ID token is updated.
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

getToken()

function getToken() {
    messaging.requestPermission()
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
    // ...
}