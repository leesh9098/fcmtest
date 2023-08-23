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

self.addEventListener('push', function (event) {
    event.waitUntil(
        self.registration.showNotification('푸시알림 테스트', {
            body: '푸시알림 테스트입니다.',
            icon: '/next.svg',
            actions: [
                {
                    action: "openUrl",
                    title: "test",
                    icon: "/next.svg"
                }
            ]
        })
    );
});

self.addEventListener('notificationclick', (event) => {
    // 클릭시 웹페이지로 이동
    // 해당 웹페이지가 열려있으면 링크 이동, 아니면 새로운 탭으로 열기
    // const urlToOpen = new URL('/', self.location.origin).href;
    // const promiseChain = clients.matchAll({
    //     type: 'window',
    //     includeUncontrolled: true
    // }).then((windowClients) => {
    //     let matchingClient = null;

    //     for (let i = 0; i < windowClients.length; i++) {
    //         const windowClient = windowClients[i];
    //         if (windowClient.url === urlToOpen) {
    //             matchingClient = windowClient;
    //             break;
    //         }
    //     }

    //     if (matchingClient) {
    //         return matchingClient.focus();
    //     } else {
    //         return clients.openWindow(urlToOpen);
    //     }
    // });

    // event.waitUntil(promiseChain);
    if (event.action === "openUrl") {
        // naver.com으로 이동
        clients.openWindow("https://www.naver.com");
    }
    event.notification.close();
});

messaging.onBackgroundMessage((payload) => {
    const notification = payload.notification;

    console.log("[firebase-messaging-sw.js] Received background message ", notification);

    const notificationTitle = notification.title;
    const notificationOptions = {
        body: notification.body,
        icon: "/next.svg",
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});