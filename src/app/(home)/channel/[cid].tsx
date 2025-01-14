import { router, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { Channel as ChannelList } from "stream-chat";
import { useAuth } from "@/src/providers/AuthProvider";
import {
  Channel,
  MessageList,
  MessageInput,
  useChatContext,
  // messageActions,
  MessageActionListItem,
  useMessageContext,
  Avatar,
} from "stream-chat-expo";
import { RFValue } from "react-native-responsive-fontsize";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

export default function ChannelScreen() {
  const [chatName, setChatName] = useState("");
  const [channel, setChannel] = useState<ChannelList | null>(null);
  const { cid } = useLocalSearchParams<{ cid: string }>();
  const { client } = useChatContext();
  const { user } = useAuth();
  const [showInput, setShowInput] = useState(false);
  const navigation = useNavigation();
  navigation.setOptions({ title: chatName || "" });

  useEffect(() => {
    const fetchChannel = async () => {
      const channels = await client.queryChannels({ cid });
      const channel = channels[0];
      const myID = user.id;
      const membIds = Object.values(channel.state.members);

      setChatName(channel?.data?.name || membIds[0].user?.name);

      console.log("user", membIds[0].user?.name);

      // const v = navigation.setOptions({ title: channel?.data?.name });
      // console.log("v", v);

      // console.log("channellA", members);

      const memberIds = Object.keys(channel.state.members);
      // const membersDetails = Object.values(channel.state.members);
      console.log("memberIds", memberIds);
      // console.log("membersDetails", membersDetails);

      if (memberIds.includes(myID)) {
        console.log(`${myID} is in the interestArray`);
        setShowInput(true);
      } else {
        console.log(`${myID} is not in the interestArray`);
        setShowInput(false);
      }

      setChannel(channels[0]);
    };
    fetchChannel();
  }, [cid]);

  if (!channel) {
    return <ActivityIndicator />;
  }

  const addMember = async () => {
    const res = await channel.addMembers([user.id]);

    console.log("res", res);

    if (res) {
      setShowInput(true);
      Alert.alert("Success", "Joined Successfully");
    }
  };

  return (
    <Channel channel={channel}>
      <MessageList />

      <SafeAreaView edges={["bottom"]}>
        {showInput ? (
          <MessageInput />
        ) : (
          <View
            style={[
              {
                backgroundColor: "#ccc",
                padding: RFValue(8),
                marginBottom: RFValue(18),
              },
            ]}
          >
            <TouchableOpacity onPress={addMember}>
              <Text style={[{ textAlign: "center" }]}>Click here to join</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </Channel>
  );
}
