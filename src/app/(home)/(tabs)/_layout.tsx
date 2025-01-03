import { Stack } from "expo-router";

export default function TabsStack() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: true }} />
    </Stack>
  );
}
