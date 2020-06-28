var key = 'AAAAU4FzZ68:APA91bFbRKzaWX4ZqvrHTBlAUa5rO5YevPiqbo3E-PWxkHRWKAYZVZlBEwBxCHifQSd71xC6RvYGJOCubJYkJOFX6sMdxsE7bgekrKxjzJASQ-K_Slb61ARn6n8aaMxIu21HENpD1JXb';

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
                    to: document.getElementById("token").value
                })
            }).then(function(response) {
                return response.json();
            }).then(function(json) {
                console.log('Response', json);
            }).catch(function(error) {
                alert("Error");
            });
}