import { PropsWithChildren } from "react";
import { Redirect, Tabs, Slot, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider } from "stream-chat-expo";
import { useAuth } from "./AuthProvider";
import { supabase } from "../lib/supabase";
import { tokenProvider } from "../utils/tokenProvider";

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY);

export default function ChatProvider({ children }: PropsWithChildren) {
  // const usertoken = tokenProvider()
  // console.log("token", usertoken);
  const [isReady, setIsReady] = useState(false);
  const { profile } = useAuth();

  useEffect(() => {
    if (!profile) {
      return;
    }
    const connect = async () => {
      const usertoken = await tokenProvider();
      const profileUrl = `https://xqcfakcvarfbtfngawsd.supabase.co/storage/v1/object/public/avatars/${profile.avatar_url}`;
      await client.connectUser(
        {
          id: profile.id,
          name: profile.full_name,
          image: profileUrl,
        },
        // client.devToken(profile.id)
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
      <Chat client={client}>
        {/* <Stack /> */}
        {children}
      </Chat>
    </OverlayProvider>
  );
}
