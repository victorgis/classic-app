import { Redirect, Tabs, Slot, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { StreamChat } from "stream-chat";
import ChatProvider from "../../providers/ChatProvider";
import { useAuth } from "@/src/providers/AuthProvider";
import SafeAreaWrapper from "@/src/hook/SafeAreaWrapper";

const HomeLayout: React.FC = () => {
  //   const { session, mounting } = useAuth();
  //   if (mounting) return <ActivityIndicator />;
  //   if (!session) return <Redirect href="/auth" />;

  const { user } = useAuth();
  if (!user) {
    return <Redirect href={"/(auth)/login"} />;
  }

  return (
    <SafeAreaWrapper style={[styles.safeArea]}>
      <ChatProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="homepage" options={{ headerShown: false }} />
          <Stack.Screen
            name="createInterest"
            options={{ headerShown: true, title: "Create Interest" }}
          />
        </Stack>
        {/* <Slot /> */}
      </ChatProvider>
    </SafeAreaWrapper>
  );
};

export default HomeLayout;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
