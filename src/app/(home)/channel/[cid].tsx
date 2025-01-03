import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { Channel as ChannelList } from "stream-chat";
import {
  Channel,
  MessageList,
  MessageInput,
  useChatContext,
} from "stream-chat-expo";

export default function ChannelScreen() {
  const [channel, setChannel] = useState<ChannelList | null>(null);
  const { cid } = useLocalSearchParams<{cid: string}>();
  const { client } = useChatContext();

  useEffect(() => {

    // console.log("cid", cid);
    const fetchChannel = async () => {
      const channels = await client.queryChannels({ cid });
      //  console.log("channels", channels);
      setChannel(channels[0]);
    };
    fetchChannel();
  }, [cid]);

  if (!channel) {
    return <ActivityIndicator />;
  }

  return (
    <Channel channel={channel}>
      <MessageList />
      <SafeAreaView edges={['bottom']}>
        <MessageInput />
      </SafeAreaView>
    </Channel>
  );
}
