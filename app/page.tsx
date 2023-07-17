'use client'

import { useToast } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import SocketIOClient from "socket.io-client";
import firebase from "firebase/compat/app";
import { getMessaging, onMessage, getToken } from "firebase/messaging";

export default function Home() {
  const [token, setToken] = useState<string>("token");
  const toast = useToast();
  
  // useEffect(() => {
  //   const socket = SocketIOClient("http://localhost:5000", { transports: ['websocket'] });

  //   socket.on("connect", () => {
  //     socket.on("useSuccess", (result: any) => {
  //       toast({
  //         title: "성공",
  //         description: result,
  //         status: "success",
  //         duration: 3000,
  //         isClosable: true
  //       })
  //     })
  //   });
  // }, []);

  const sendMessage = () => {
    const title = "알림";
    const body = "알림 내용";
    const options = { body };

    const notification = new Notification(title, options);
  }

  const notiButton = () => {
    // const result = await Notification.requestPermission();
    // if (result === "granted") {
    //   sendMessage();
    // }
    const firebaseApp = firebase.initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGIN_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
    })

    const messaging = getMessaging(firebaseApp);

    getToken(messaging, { vapidKey: 'BHyG58CG-xSK8YImHKYLQ3-8WxtbodZsvR-3wmh7JKVc7VuQuQBf4WrPlItcmGDyOFC7HE1KF-L855ToWaqzZBU' })
      .then((currentToken) => {
        if (currentToken) {
          setToken(currentToken);
        } else {
          alert('No registration token available. Request permission to generate one.');
          console.log('No registration token available. Request permission to generate one.');
        }
      })
      .catch((err) => {
        alert(err);
        console.log('An error occurred while retrieving token. ', err);
      }
      );
  }

  useEffect(() => {
    async function onMessaging() {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") return;

      const firebaseApp = firebase.initializeApp({
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGIN_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
      })

      const messaging = getMessaging(firebaseApp);

      getToken(messaging, { vapidKey: 'BHyG58CG-xSK8YImHKYLQ3-8WxtbodZsvR-3wmh7JKVc7VuQuQBf4WrPlItcmGDyOFC7HE1KF-L855ToWaqzZBU' })
        .then((currentToken) => {
          if (currentToken) {
            setToken(currentToken);
          } else {
            alert('No registration token available. Request permission to generate one.');
            console.log('No registration token available. Request permission to generate one.');
          }
        })
        .catch((err) => {
          alert(err);
          console.log('An error occurred while retrieving token. ', err);
        }
      );

      onMessage(messaging, (payload) => {
        toast({
          title: payload.data!.title,
          description: payload.data!.body,
          status: "success",
          duration: 3000,
          isClosable: true
        })
      })
    }

    onMessaging();
  }, []);
  
  return (
    <main>
      <header style={{
        fontSize: "36px",
        fontWeight: "900",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: "56px",
        padding: "0 16px"
      }}>
        Header area
        <button onClick={notiButton}>알림</button>
      </header>
      <section style={{
        width: "100%",
        height: "calc(100vh - 56px)",
        backgroundColor: "#f5f5f5"
      }}>
        <div style={{
          display: "flex",
          gap: "16px",
          alignItems: "center",
          width: "fit-content",
          padding: "16px",
          borderRadius: "50px",
          backgroundColor: "#888"
        }}>
          <Image
            src="next.svg"
            alt="vercel icon"
            width={48}
            height={48} />
          <p style={{ fontSize: "32px", fontWeight: 900 }}>Vercel</p>
        </div>
        <h3>
          {token}
        </h3>
      </section>
    </main>
  )
}
