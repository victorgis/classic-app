import { Stack, router, Redirect } from "expo-router";
import "react-native-reanimated";
import ChatProvider from "@/src/providers/ChatProvider";

export default function ScreensLayout() {
  // const { user } = useAuth();

  // if (!user) {
  //   return <Redirect href={"/screens/login"} />;
  // }

  return (
    <ChatProvider>
      <Stack>
        <Stack.Screen
          name="chat"
          options={{ headerShown: false, title: "Home" }}
        />
        <Stack.Screen
          name="screens/login"
          options={{ headerShown: false, title: "Login" }}
        />
        <Stack.Screen
          name="screens/signup"
          options={{ headerShown: false, title: "Signup" }}
        />
        <Stack.Screen
          name="screens/forgottenPassword"
          options={{ headerShown: false, title: "Forgotten Password" }}
        />
        <Stack.Screen
          name="screens/changePassword"
          options={{ headerShown: true, title: "Change Password" }}
        />
        <Stack.Screen
          name="screens/resetPassword"
          options={{ headerShown: false, title: "Reset Password" }}
        />
        <Stack.Screen
          name="screens/enterResetToken"
          options={{ headerShown: false, title: "Waiting Page" }}
        />
        <Stack.Screen name="channel" options={{ headerShown: false }} />
        <Stack.Screen name="channel/[cid]" options={{ headerShown: false }} />
        <Stack.Screen
          name="screens/ThreadScreen"
          options={{
            headerShown: true,
            title: "Thread",
            headerBackTitle: "back",
          }}
        />
        <Stack.Screen
          name="screens/BlockedList"
          options={{
            headerShown: true,
            title: "Blocked List",
            headerBackTitle: "back",
          }}
        />
        <Stack.Screen
          name="screens/createInterest"
          options={{
            headerShown: true,
            title: "Create Interest",
            headerBackTitle: "back",
          }}
        />

        <Stack.Screen
          name="screens/ModeratorInInterest"
          options={{
            headerShown: true,
            title: "Moderator in Interest",
            headerBackTitle: "back",
          }}
        />
        <Stack.Screen
          name="screens/profile"
          options={{
            headerShown: true,
            title: "Profile",
            headerBackTitle: "back",
          }}
        />
        <Stack.Screen
          name="screens/PinnedMessages"
          options={{
            headerShown: true,
            title: "Pinned Messages",
            headerBackTitle: "back",
          }}
        />
        <Stack.Screen
          name="screens/SavedMessages"
          options={{
            headerShown: true,
            title: "Saved Messages",
            headerBackTitle: "back",
          }}
        />

        <Stack.Screen
          name="screens/notifications"
          options={{
            headerShown: true,
            title: "Notifications",
            headerBackTitle: "back",
          }}
        />
        <Stack.Screen
          name="screens/notificationSettings"
          options={{
            headerShown: true,
            title: "Notifications Setting",
            headerBackTitle: "back",
          }}
        />
        <Stack.Screen
          name="screens/privacypolicy"
          options={{
            headerShown: true,
            title: "Privacy Policy",
            headerBackTitle: "back",
          }}
        />
        <Stack.Screen
          name="screens/termscondition"
          options={{
            headerShown: true,
            title: "Terms & Conditions",
            headerBackTitle: "back",
          }}
        />
      </Stack>
    </ChatProvider>
  );
}
