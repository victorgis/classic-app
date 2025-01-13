import { PropsWithChildren } from "react";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider } from "stream-chat-expo";
import { useAuth } from "./AuthProvider";
import { supabase } from "../lib/supabase";
import { tokenProvider } from "../utils/tokenProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY);

export default function ChatProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);
  const { profile } = useAuth();

  // Check for cached connection data
  useEffect(() => {
    const loadCachedConnection = async () => {
      try {
        const cachedUser = await AsyncStorage.getItem("chatUserProfile");
        if (cachedUser) {
          const parsedUser = JSON.parse(cachedUser);
          await client.connectUser(
            {
              id: parsedUser.id,
              name: parsedUser.name,
              image: parsedUser.image,
            },
            parsedUser.token
          );
          setIsReady(true);
        }
      } catch (error) {
        console.log("Error loading cached connection:", error);
      }
    };

    // loadCachedConnection();
  }, []);

  useEffect(() => {
    if (!profile) {
      return;
    }

    const connect = async () => {
      const usertoken = await tokenProvider();
      const profileUrl = `https://xqcfakcvarfbtfngawsd.supabase.co/storage/v1/object/public/avatars/${profile.avatar_url}`;

      // Cache user profile and token for future use
      const userData = {
        id: profile.id,
        name: profile.full_name,
        image: profileUrl,
        token: usertoken,
      };

      await AsyncStorage.setItem("chatUserProfile", JSON.stringify(userData));

      await client.connectUser(
        {
          id: profile.id,
          name: profile.full_name,
          image: profileUrl,
        },
        usertoken
      );

      setIsReady(true);
    };

    connect();

    return () => {
      client.disconnectUser();
      setIsReady(false);
    };
  }, [profile?.id]);

  if (!isReady) {
    return <ActivityIndicator />;
  }

  return (
    <OverlayProvider>
      <Chat client={client}>{children}</Chat>
    </OverlayProvider>
  );
}
