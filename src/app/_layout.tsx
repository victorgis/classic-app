// Define global providers

import { Slot, Stack, useRouter } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// import AuthProvider from "../providers/AuthProvider";
import { useEffect } from "react";
import { PermissionsAndroid, Platform } from "react-native";

export default function RootLayout() {
  const router = useRouter();
  useEffect(() => {
    const run = async () => {
      if (Platform.OS === "android") {
        await PermissionsAndroid.requestMultiple([
          "android.permission.POST_NOTIFICATIONS",
          "android.permission.BLUETOOTH_CONNECT",
        ]);
      }
    };
    run();
  }, []);

  return (
    // <GestureHandlerRootView style={{ flex: 1 }}>
    // {/* <AuthProvider> */}
    <Stack>
      <Stack.Screen
        name="(home)"
        options={{ headerShown: true, title: "HomeScreen" }}
      />
      <Stack.Screen
        name="index"
        options={{ headerShown: true, title: "Main" }}
      />
    </Stack>
    // <Slot />
    // {/* </AuthProvider> */}
    // </GestureHandlerRootView>
  );
}
