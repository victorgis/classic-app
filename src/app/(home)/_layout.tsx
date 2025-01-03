import { Redirect, Tabs, Slot, Stack } from "expo-router";
import { StreamChat } from "stream-chat";
import ChatProvider from "../../providers/ChatProvider";

const HomeLayout: React.FC = () => {
  //   const { session, mounting } = useAuth();
  //   if (mounting) return <ActivityIndicator />;
  //   if (!session) return <Redirect href="/auth" />;

  return (
    <ChatProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </ChatProvider>
  );
};

export default HomeLayout;

