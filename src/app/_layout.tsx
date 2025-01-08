// Define global providers

import { Stack, Slot, useRouter } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AuthProvider from "../providers/AuthProvider";
import { useEffect } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <Stack>
          <Stack.Screen
            name="(home)"
            options={{ headerShown: false, title: "HomeScreen" }}
          />
          <Stack.Screen
            name="index"
            options={{ headerShown: false, title: "Main" }}
          />
          <Stack.Screen
            name="(auth)"
            options={{ headerShown: false, title: "Main" }}
          />
          <Stack.Screen
            name="profile"
            options={{ headerShown: false, title: "Profile" }}
          />
          {/* <Stack.Screen
            name="createInterest"
            options={{ headerShown: true, title: "Create Interest" }}
          /> */}
        </Stack>
        {/* <Slot /> */}
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
