import { PropsWithChildren } from "react";
import { useEffect, useState, useRef } from "react";
import { View, Text, Animated, StyleSheet, Image } from "react-native";
import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider } from "stream-chat-expo";
import { useAuth } from "./AuthProvider";
import { tokenProvider } from "@/utils/tokenProviderUtil";
import LoadingActivity from "../components/LoadingActivity";

const client = StreamChat.getInstance("dwfrzvgbasbd");
const profileUrl = require("../../assets/images/logo.png");

export default function ChatProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);
  const { profile } = useAuth();
  const scaleAnim = useRef(new Animated.Value(1)).current; // Initial scale

  useEffect(() => {
    if (!profile) {
      return;
    }

    const connect = async () => {
      const usertoken = await tokenProvider();

      await client.connectUser(
        {
          id: profile.id,
          name: profile.full_name,
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
    return <LoadingActivity />;
  }

  return (
    <OverlayProvider>
      <Chat client={client}>{children}</Chat>
    </OverlayProvider>
  );
}
