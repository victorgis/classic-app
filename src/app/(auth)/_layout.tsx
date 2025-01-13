import { Redirect, Slot, Stack } from "expo-router";
import { useAuth } from "@/src/providers/AuthProvider";

export default function AuthLayout() {
  const { user, session } = useAuth();
  // if (!user) return <Redirect href="/(auth)/login" />;

  if (user) {
    // console.log(user); // Ensure this logs the user object correctly
    // return <Redirect href="/(home)/(tabs)" />; // Return the Redirect component
    return <Redirect href="/(home)/homepage" />; // Return the Redirect component
    // return <Redirect href="/(home)/screens/profile" />; // Return the Redirect component
  }

  return (
    <Stack>
      <Stack.Screen
        name="signup"
        options={{ headerShown: false, title: "HomeScreen" }}
      />
      <Stack.Screen
        name="login"
        options={{ headerShown: false, title: "HomeScreen" }}
      />
      <Stack.Screen
        name="forgottenPassword"
        options={{ headerShown: false, title: "HomeScreen" }}
      />
      <Stack.Screen
        name="resetPassword"
        options={{ headerShown: false, title: "HomeScreen" }}
      />
    </Stack>
  );
}
