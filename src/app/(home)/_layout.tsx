import { Redirect, Tabs, Slot, Stack } from "expo-router";
import { StreamChat } from "stream-chat";
import ChatProvider from "../../providers/ChatProvider";
import { useAuth } from "@/src/providers/AuthProvider";

const HomeLayout: React.FC = () => {
  //   const { session, mounting } = useAuth();
  //   if (mounting) return <ActivityIndicator />;
  //   if (!session) return <Redirect href="/auth" />;

  const { user } = useAuth();
  if (!user) {
    return <Redirect href={"/(auth)/login"} />;
  }

  return (
    <ChatProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      {/* <Slot /> */}
    </ChatProvider>
  );
};

export default HomeLayout;
