// Define global providers

import { Stack, Slot, useRouter } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AuthProvider from "../providers/AuthProvider";
import { useEffect } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AvatarProvider } from "../providers/AvatarContext";
import { Alert } from "react-native";
import * as Linking from "expo-linking";

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

  useEffect(() => {
    // Function to handle incoming URLs
    const extractFragmentParams = (url: string) => {
      const fragment = url.split("#")[1] || "";
      return Object.fromEntries(new URLSearchParams(fragment));
    };

    const handleDeepLink = async (event: { url: string }) => {
      console.log("Received URL:", event.url); // Debugging the URL
      const params = extractFragmentParams(event.url);

      console.log("Extracted Params:", params); // Log extracted params

      if (params?.type === "recovery" && params?.access_token) {
        router.replace(
          `/resetPassword?access_token=${params.access_token}&refresh_token=${params.refresh_token}`
        );
      } else if (params?.type === "signup" && params?.access_token) {
        router.replace(
          `/login?access_token=${params.access_token}&refresh_token=${params.refresh_token}`
        );
      } 
      else {
        console.log("Missing or invalid token:", params);
        // Alert.alert("Error", "Invalid or missing access token.");
      }
      
    };


    // Add an event listener for deep links
    const subscription = Linking.addEventListener("url", handleDeepLink);

    // Check for the initial URL
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url });
    });

    // Cleanup the event listener
    return () => subscription.remove();
  }, [router]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <AvatarProvider>
          {/* <Stack>
            <Stack.Screen
              name="(home)/homepage"
              options={{ headerShown: false, title: "HomeScreen" }}
            />
            <Stack.Screen
              name="(auth)"
              options={{ headerShown: false, title: "HomeScreen" }}
            />
          </Stack> */}
          <Slot />
        </AvatarProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
