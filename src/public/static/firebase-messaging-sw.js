/* eslint-disable */ 

importScripts('https://www.gstatic.com/firebasejs/4.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.10.0/firebase-messaging.js');
console.log('hi sw')
var config = {
    messagingSenderId: '99989017353'
};
firebase.initializeApp(config);

var messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    var title = 'Hello world!123';
    var options = {
        body: payload.data.status,
    };
    return self.registration.showNotification(title, options);
})