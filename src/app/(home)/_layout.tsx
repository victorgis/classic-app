import { Redirect, Tabs, Slot, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider } from "stream-chat-expo";

const client = StreamChat.getInstance("dwfrzvgbasbd");

const HomeLayout: React.FC = () => {
  //   const { session, mounting } = useAuth();
  //   if (mounting) return <ActivityIndicator />;
  //   if (!session) return <Redirect href="/auth" />;
  useEffect(() => {
    const connect = async () => {
      await client.connectUser(
        {
          id: "jlahey",
          name: "Jim Lahey",
          image: "https://i.imgur.com/fR9Jz14.png",
        },
        client.devToken("jlahey")
      );

      // const channel = client.channel("messaging", "the_park", {
      //   name: "The Park",
      // });
      // await channel.watch();
    };
    connect();
  });

  return (
    <OverlayProvider>
      <Chat client={client}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </Chat>
    </OverlayProvider>
  );
};

export default HomeLayout;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
