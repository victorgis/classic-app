import { Stack } from "expo-router";
import { View } from "react-native";

export default function TabsStack() {
  return (
    <View>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="myInterest" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}
