const __author__ = "Jerry Overton"
const __copyright__ = "Copyright (C) 2023 appliedAIstudio"
const __version__ = "0.1"

// Initialize PouchDB
var db = new PouchDB('notifications');

// Function to save a notification to PouchDB
function saveNotification(notification) {
    db.post(notification)
        .then(function(response) {
            console.log('Notification saved:', response);
        })
        .catch(function(error) {
            console.log('Error saving notification:', error);
        });
}

export function writeTestNotifications() {
     // Example data
     var notification1 = {
        sender: 'John Doe',
        avatar: 'avatar1.jpg',
        datetime: '2021-01-01 10:00 AM',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    };

    var notification2 = {
        sender: 'Jane Smith',
        avatar: 'avatar2.jpg',
        datetime: '2021-01-02 02:30 PM',
        message: 'Nullam in metus at magna luctus hendrerit.'
    };

    // Save example notifications to PouchDB
    saveNotification(notification1);
    saveNotification(notification2);
}

function addNotificationToList(notification) {
    // get the notification template html
    var notification_template = document.getElementById("notificationTemplate").content;
    var notification_template_HTML = document.importNode(notification_template, true);

    // set the properties of the notification
    notification_template_HTML.getElementById("sender").textContent = notification.sender;
    notification_template_HTML.getElementById("avatar").src = notification.avatar;
    notification_template_HTML.getElementById("message").textContent = notification.message;
    notification_template_HTML.getElementById("datetime").textContent = notification.datetime;
    notification_template_HTML.getElementById("minutesAgo").textContent = "10m";

    // place the notification into the notifications list
    document.getElementById("notificationsList").appendChild(notification_template_HTML);
}

export function refreshNotifications() {
    // clear the existing notifications from the display
    document.getElementById("notificationsList").textContent = "";

    // Read notifications from PouchDB and display them on the page
    db.allDocs({
        include_docs: true
    })
    .then(function(result) {
        result.rows.forEach(function(row) {
            var notification = row.doc;
            addNotificationToList(notification);
        });
    })
    .catch(function(error) {
        console.log('Error reading notifications:', error);
    });
}