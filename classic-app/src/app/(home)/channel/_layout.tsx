import { Stack } from "expo-router";
import ChatTopBar from "@/src/components/ChatTopBar"; // Adjust the path if necessary
import SafeAreaWrapper from "../../../hooks/SafeAreaWrapper";

// import ChatProvider from "../providers/ChatProvider";

export default function ChannelStack() {
  return (
    <SafeAreaWrapper>
      <Stack>
        <Stack.Screen
          name="[cid]"
          options={{
            headerShown: false,
            headerTitleAlign: "center",
            // header: () => <ChatTopBar />,
          }}
        />
      </Stack>
    </SafeAreaWrapper>
  );
}
