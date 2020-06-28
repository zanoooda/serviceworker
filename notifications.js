var senderId = '358654109615';
var key = 'AAAAU4FzZ68:APA91bFbRKzaWX4ZqvrHTBlAUa5rO5YevPiqbo3E-PWxkHRWKAYZVZlBEwBxCHifQSd71xC6RvYGJOCubJYkJOFX6sMdxsE7bgekrKxjzJASQ-K_Slb61ARn6n8aaMxIu21HENpD1JXb';

firebase.initializeApp({
    messagingSenderId: senderId
});

var messaging = firebase.messaging();

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