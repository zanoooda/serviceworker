let senderId = '358654109615';

firebase.initializeApp({
    messagingSenderId: senderId
});

function getToken() {
    messaging.requestPermission()
        .then(function() {
            messaging.getToken()
                .then(function(currentToken) {

                    if (currentToken) {
                        alert(currentToken);

                        // ...
                    } else {
                        alert('No Instance ID token available. Request permission to generate one');
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