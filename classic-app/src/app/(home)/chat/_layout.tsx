import { Stack, Redirect } from "expo-router";
import React from "react";
import { useAuth } from "../../../providers/AuthProvider";
import SafeAreaWrapper from "@/src/hooks/SafeAreaWrapper";
import ChatProvider from "../../../providers/ChatProvider";

export default function HomeLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href={"/(auth)/login"} />;
  }
  return (
    <SafeAreaWrapper>
      {/* <ChatProvider> */}
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="interest" options={{ headerShown: false }} />
        <Stack.Screen name="discover" options={{ headerShown: false }} />

        {/* <Stack.Screen
            name="discover"
            options={{
              headerShown: false,
              title: "Terms & Conditions",
              // headerBackTitle: "back",
            }}
          /> */}
      </Stack>
      {/* <Slot /> */}
      {/* </ChatProvider> */}
    </SafeAreaWrapper>
  );
}
