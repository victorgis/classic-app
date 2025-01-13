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
} from "stream-chat-expo";
import { RFValue } from "react-native-responsive-fontsize";
import { messageActions } from "stream-chat-expo";
import { MaterialIcons } from "@expo/vector-icons";

export default function ChannelScreen() {
  const [channel, setChannel] = useState<ChannelList | null>(null);
  const { cid } = useLocalSearchParams<{ cid: string }>();
  const { client } = useChatContext();
  const { user } = useAuth();
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const fetchChannel = async () => {
      const channels = await client.queryChannels({ cid });
      const channel = channels[0];
      const myID = user.id;
      // console.log("channels", channels[0]);
      // console.log("myID", myID);

      const members = channel.state;

      console.log("channellA", members);

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
      <MessageList
        messageActions={(params: any) => {
          const { dismissOverlay, message } = params;

          // Default actions
          const actions = messageActions({ ...params }) || [];

          // Adding custom actions
          actions.push(
            {
              action: async () => {
                try {
                  await client.blockUser(message.user?.id || "");
                  console.log("Blocked successfully");
                  dismissOverlay();
                } catch (error) {
                  console.error("Error blocking user:", error);
                }
              },
              actionType: "block-user",
              title: "Block User",
              icon: <MaterialIcons size={25} name="block" />,
            },
            {
              action: async () => {
                try {
                  const privateChannel = client.channel("messaging", {
                    members: [message.user?.id, client.userID],
                  });
                  await privateChannel.watch();
                  console.log("Private chat started:", privateChannel.id);
                  dismissOverlay();

                  // Navigate to the private chat
                  // router.replace({
                  //   pathname: "/(home)/channel/[cid]",
                  //   params: { cid: privateChannel.id },
                  // });

                  // if (privateChannel.data?.blocked == true) {
                  //   Alert.alert("Blocked User", "This user was blocked by you");
                  //   // return (
                  //   //   <View>
                  //   //     <Text>Blocked user</Text>
                  //   //   </View>
                  //   // );
                  // } else {

                  // }

                  router.replace(`/(home)/channel/${privateChannel.cid}`);

                  console.log("x", privateChannel.data?.blocked);
                } catch (error) {
                  console.error("Error creating private chat:", error);
                }
              },
              actionType: "reply-privately",
              title: "Reply Privately",
              icon: <MaterialIcons size={25} name="chat" />,
            }
          );

          return actions;
        }}
      />

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
        {/* {!showInput} && (
        
        ) */}
      </SafeAreaView>
    </Channel>
  );
}
