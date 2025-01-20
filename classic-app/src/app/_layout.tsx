
import { useFonts } from "expo-font";
import { Slot, Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Linking from "expo-linking";
import AuthProvider from "../providers/AuthProvider";
import { AppProvider } from "../providers/AppProvider";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }

    const extractFragmentParams = (url: string) => {
      const fragment = url.split("#")[1] || "";
      return Object.fromEntries(new URLSearchParams(fragment));
    };

    const handleDeepLink = async (event: { url: string }) => {
      if (!event.url) {
        return;
      }
      console.log("Received URL:", event.url); // Debugging the URL
      const params = extractFragmentParams(event.url);

      console.log("Extracted Params:", params); // Log extracted params

      if (params?.type === "recovery" && params?.access_token) {
        console.log("Param is recovery");
        router.replace(
          `/(auth)/resetPassword?access_token=${params.access_token}&refresh_token=${params.refresh_token}`
        );
      } else if (params?.type === "signup" && params?.access_token) {
        console.log("Param is signup");
        router.replace(
          `/(auth)/login?access_token=${params.access_token}&refresh_token=${params.refresh_token}`
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
  }, [router, loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <AppProvider>
          <Slot />
        </AppProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
