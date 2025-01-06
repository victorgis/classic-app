import { Stack } from "expo-router";


import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

export default function ChannelStack() {
  return (
    <Stack>
      <Stack.Screen name="[cid]" options={{ headerShown: false }} />
    </Stack>
  );
}
