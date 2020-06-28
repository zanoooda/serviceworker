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

// other side

function sendNotification() {
    fetch('https://fcm.googleapis.com/fcm/send', {
                method: 'POST',
                headers: {
                    'Authorization': 'key=' + key,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // Firebase loses 'image' from the notification.
                    // And you must see this: https://github.com/firebase/quickstart-js/issues/71
                    data: {
                        title: document.getElementById("title").value, 
                        body: document.getElementById("body").value, 
                        icon: document.getElementById("icon").value, 
                        image: document.getElementById("image").value, 
                        click_action: document.getElementById("click-action").value
                    },
                    to: document.getElementById("instance-id-token").value
                })
            }).then(function(response) {
                return response.json();
            }).then(function(json) {
                console.log('Response', json);

                // if (json.success === 1) {
                //     massage_row.show();
                //     massage_id.text(json.results[0].message_id);
                // } else {
                //     massage_row.hide();
                //     massage_id.text(json.results[0].error);
                // }
            }).catch(function(error) {
                alert("Error");
            });
}