import "expo-router/entry";
import messaging from "@react-native-firebase/messaging";
import { tokenProvider } from "./src/utils/tokenProvider";
import { supabase } from "./src/lib/supabase";
import { StreamChat } from "stream-chat";
import app from "./src/services/firebase";
import { initializeApp } from "firebase/app";

// app()

// const firebaseConfig = {
//   apiKey: "AIzaSyD-5JOqNQq-G0Tuulr5SX1g7yhakq9r5Cc",
//   authDomain: "https://xqcfakcvarfbtfngawsd.supabase.co",
//   projectId: "classicapp-76d37",
//   storageBucket: "classicapp-76d37.firebasestorage.app",
//   messagingSenderId: "876894159980",
//   appId: "1:876894159980:android:93bdf5aba1e49950e34449",
//   measurementId: "G-VN1T6X667Z",
// };

// // Initialize Firebase only if not already initialized
// const hello = initializeApp(firebaseConfig);

// console.log(hello)


// import notifee from "@notifee/react-native";
// // import { setPushConfig } from "./src/utils/setPushConfig";

// // setPushConfig();

// messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//     console.log("remote message ", JSON.stringify(remoteMessage, null, 2))
//   const { data: { session } } = await supabase.auth.getSession();
//   if (!session?.user) {
//     console.log("ERROR: no active auth session");
//     return;
//   }

//   const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY);

//   client._setToken(
//     {
//       id: session.user.id,
//     },
//     tokenProvider,
//   );
//   // handle the message
//   const message = await client.getMessage(remoteMessage.data.id);

//   //create the android channel to send the notification to
//   const channelId = await notifee.createChannel({
//     id: "chat-messages",
//     name: "Chat Messages",
//   });

//   // display the notification
//   const { stream, ...rest } = remoteMessage.data ?? {};
//   const data = {
//     ...rest,
//     ...((stream as unknown as Record<string, string> | undefined) ?? {}), // extract and merge stream object if present
//   };
//   await notifee.displayNotification({
//     title: "New message from " + message.message.user.name,
//     body: message.message.text,
//     data,
//     android: {
//       channelId,
//       // add a press action to open the app on press
//       pressAction: {
//         id: "default",
//       },
//     },
//   });
// });