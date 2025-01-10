import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";

export default function ChannelStack() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="[cid]"
        options={{
          headerShown: false,
          headerTitle: "Chat",
          headerRight: () => (
            <MaterialIcons
              name="add"
              size={24}
              style={{ marginRight: 10 }}
              onPress={() => router.push("/(home)/users")}
            />
          ),
          headerBackTitle: "back",
        }}
      />
      <Stack.Screen name="profile" options={{ headerTitle: "User Profile" }} />
    </Stack>
  );
}
