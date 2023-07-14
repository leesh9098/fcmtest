importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js');

const config = {
    apiKey: "AIzaSyBEQW1YlIvQPUef-2e8jfLUwGSgkqhY3Zw",
    authDomain: "kakaotalk-push-test-e3506.firebaseapp.com",
    projectId: "kakaotalk-push-test-e3506",
    storageBucket: "kakaotalk-push-test-e3506.appspot.com",
    messagingSenderId: "424093153349",
    appId: "1:424093153349:web:6b342372418a8efac78b2c"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();