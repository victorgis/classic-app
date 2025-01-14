import { Slot, Stack } from "expo-router";

export default function ChannelStack() {
  return (
    <Stack>
      <Stack.Screen
        name="[cid]"
        options={{
          headerShown: false,
          headerTitleAlign: "center", // Center the header title horizontally
        }}
      />
    </Stack>
  );
}
