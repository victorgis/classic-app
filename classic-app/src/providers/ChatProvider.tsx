import { PropsWithChildren } from "react";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider } from "stream-chat-expo";
import { useAuth } from "./AuthProvider";
import { tokenProvider } from "@/utils/tokenProviderUtil";

const client = StreamChat.getInstance("dwfrzvgbasbd");

export default function ChatProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);
  const { profile } = useAuth();

  useEffect(() => {
    if (!profile) {
      return;
    }

    const connect = async () => {
      const usertoken = await tokenProvider();
      // const profileUrl = require("../../assets/images/logo.png");
      const profileUrl = `https://xqcfakcvarfbtfngawsd.supabase.co/storage/v1/object/public/avatars/${profile.avatar_url}`;

      await client.connectUser(
        {
          id: profile.id,
          name: profile.full_name,
          // image: profileUrl,
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
    return (
      <View style={styles.overlay}>
        <MaterialIcons name="chat" size={50} color="#007AFF" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <OverlayProvider>
      <Chat client={client}>{children}</Chat>
    </OverlayProvider>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional for dimming effect
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: "#fff",
  },
});
