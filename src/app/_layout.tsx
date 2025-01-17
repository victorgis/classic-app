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
import { AppProvider } from "../providers/AppContext";

export default function RootLayout() {
  const router = useRouter();

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
        console.log("Param is recovery");
        router.replace(
          `/resetPassword?access_token=${params.access_token}&refresh_token=${params.refresh_token}`
        );
      } else if (params?.type === "signup" && params?.access_token) {
        console.log("Param is signup");
        router.replace(
          `/login?access_token=${params.access_token}&refresh_token=${params.refresh_token}`
        );
      } else {
        console.log("Missing or invalid token:", params);
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
        <AppProvider>
          {/* Corrected from AppContext to AppProvider */}
          <AvatarProvider>
            <Stack>
              <Stack.Screen
                name="index"
                options={{ headerShown: false, title: "HomeScreen" }}
              />
              <Stack.Screen
                name="(auth)/login"
                options={{ headerShown: false, title: "Login" }}
              />
              <Stack.Screen
                name="(auth)/signup"
                options={{ headerShown: false, title: "Signup" }}
              />
              <Stack.Screen
                name="(auth)/forgottenPassword"
                options={{ headerShown: false, title: "Forgotten Password" }}
              />
              <Stack.Screen
                name="(auth)/resetPassword"
                options={{ headerShown: false, title: "Reset Password" }}
              />
              <Stack.Screen
                name="(auth)/enterResetToken"
                options={{ headerShown: false, title: "Waiting Page" }}
              />
              <Stack.Screen
                name="(home)"
                options={{ headerShown: false, title: "Home Page" }}
              />
            </Stack>
          </AvatarProvider>
        </AppProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
