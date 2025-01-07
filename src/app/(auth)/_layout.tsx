// import { Redirect, Stack, Slot } from "expo-router";
// import { useAuth } from "@/src/providers/AuthProvider";

// export default function AuthLayout() {
//   const { user } = useAuth();
//   if (user) {
//     console.log(user);
//     <Redirect href="/(home)/(tabs)" />;
//   }
//   return <Stack />;
// }

import { Redirect, Slot, Stack } from "expo-router";
import { useAuth } from "@/src/providers/AuthProvider";

export default function AuthLayout() {
  const { user } = useAuth();

  if (user) {
    // console.log(user); // Ensure this logs the user object correctly
    // return <Redirect href="/(home)/(tabs)" />; // Return the Redirect component
    return <Redirect href="/(home)/homepage" />; // Return the Redirect component
    // return <Redirect href="/(home)/screens/profile" />; // Return the Redirect component
  }

  return (
    // <Stack>
    //   <Stack.Screen
    //     name="login"
    //     options={{ headerShown: false, title: "HomeScreen" }}
    //   />
    // </Stack>
    <Slot />
  );
}
