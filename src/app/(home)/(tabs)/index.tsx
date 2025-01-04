import { router } from "expo-router";
import { ChannelList } from "stream-chat-expo";
import { Text, View } from "react-native";
import { useAuth } from "@/src/providers/AuthProvider";

export default function MainTabScreen() {
  const { user } = useAuth();
  return (
    //   <View>
    <ChannelList
      filters={{ members: { $in: [user.id] } }}
      onSelect={(channel) => router.push(`/channel/${channel.cid}`)}
    />
    //   {/* </View> */}/

    //   <Text>MainTabScreen</Text>
  );
}
