import { router } from "expo-router";
import { ChannelList } from "stream-chat-expo";
import { Text, View } from "react-native";

export default function MainTabScreen () {
    return (
    //   <View>
        <ChannelList
          onSelect={(channel) => router.push(`/channel/${channel.cid}`)}
        />
    //   {/* </View> */}/

      //   <Text>MainTabScreen</Text>
    );
}