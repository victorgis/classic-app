import { PropsWithChildren, useEffect, useState } from "react";
import messaging from "@react-native-firebase/messaging";
import { StreamChat } from "stream-chat";
import { useAuth } from "./AuthProvider";
import { FirebaseConfig } from "stream-chat";


const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY);

export default function NotificationsProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);
  const { user } = useAuth();

  const requestPermission = async () => {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log("Authorization status:", authStatus);
      } else {
        console.warn("Push notification permission denied.");
      }
    } catch (error) {
      console.error("Failed to request push notification permission:", error);
    }
  };

  useEffect(() => {
    if (!user) return; // ✅ Ensure `user` exists before proceeding

    const registerPushToken = async () => {
      try {
        const token = await messaging().getToken();
        if (!token) {
          console.warn(
            "Skipping push token registration due to missing token."
          );
          return;
        }
        if (!user.id) {
          console.warn(
            "Skipping push token registration due to missing user ID."
          );
          return;
        }

        const push_provider = "firebase";
        const push_provider_name = "Firebase";

        await client.addDevice(
          token,
          push_provider,
          user.id,
          push_provider_name
        );
      } catch (error) {
        console.error("Failed to register push token:", error);
      }
    };

    const init = async () => {
      await requestPermission();
      await registerPushToken();
      setIsReady(true);
    };

    init();
  }, [user]); // ✅ Ensure it re-runs when `user` changes

  if (!isReady) {
    return null;
  }

  return <>{children}</>;
}
