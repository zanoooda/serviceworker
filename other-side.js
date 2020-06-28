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