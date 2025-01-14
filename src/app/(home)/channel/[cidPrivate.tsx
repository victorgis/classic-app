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
  Thread,
  MessageList,
  MessageInput,
  useChatContext,
} from "stream-chat-expo";
import { RFValue } from "react-native-responsive-fontsize";
import {
  // messageActions,
  MessageActionListItem,
  useMessageContext,
} from "stream-chat-expo";
import { MaterialIcons } from "@expo/vector-icons";

export default function ChannelScreen() {
  const [channel, setChannel] = useState<ChannelList | null>(null);
  const { cid } = useLocalSearchParams<{ cid: string }>();
  const { client } = useChatContext();
  const { user } = useAuth();
  const [showInput, setShowInput] = useState(false);
  const [selectedThreadMessage, setSelectedThreadMessage] = useState();

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

  const CustomMessageActionList = () => {
    const { dismissOverlay, message } = useMessageContext(); // Access the current message context
    const { client } = useChatContext(); // Access the Stream Chat client

    const handleThreadReply = () => {
      console.log("Reply to thread:", message);
      // Logic to handle thread replies
      Alert.alert("Thread Reply", "Thread reply clicked.");
      dismissOverlay();
    };

    const handleBlockUser = async () => {
      try {
        if (!message.user?.id) return;
        await client.blockUser(message.user.id);
        console.log("Blocked user successfully:", message.user.id);
        Alert.alert("Success", `${message.user.id} has been blocked.`);
      } catch (error) {
        console.error("Error blocking user:", error);
        Alert.alert("Error", "Failed to block user.");
      } finally {
        dismissOverlay();
      }
    };

    const handleReportUser = () => {
      console.log("Reported user:", message.user?.id);
      // Logic for reporting a user (e.g., sending an alert to moderators)
      Alert.alert("Report User", "User has been reported.");
      dismissOverlay();
    };

    const handleSaveMessage = async () => {
      try {
        if (!message.id) return;
        const reactionType = "saved"; // Custom reaction for saved messages
        await client.reactions.add(message.id, { type: reactionType });
        console.log("Message saved successfully:", message.id);
        Alert.alert("Success", "Message saved.");
      } catch (error) {
        console.error("Error saving message:", error);
        Alert.alert("Error", "Failed to save message.");
      } finally {
        dismissOverlay();
      }
    };

    // Message actions
    const messageActions = [
      {
        action: handleThreadReply,
        actionType: "replyToThread",
        title: "Reply to Thread",
      },
      {
        action: handleBlockUser,
        actionType: "blockUser",
        title: "Block User",
      },
      {
        action: handleReportUser,
        actionType: "reportUser",
        title: "Report User",
      },
      {
        action: handleSaveMessage,
        actionType: "saveMessage",
        title: "Save Message",
      },
    ];

    return (
      <View style={{ backgroundColor: "white" }}>
        {messageActions.map(({ actionType, ...rest }) => (
          <MessageActionListItem
            actionType={actionType}
            key={actionType}
            {...rest}
          />
        ))}
      </View>
    );
  };

  return (
    <Channel
      channel={channel}
      thread={selectedThreadMessage} // Set the currently selected thread message
      threadList={Boolean(selectedThreadMessage)} // Enable thread mode if a thread is selected
      // MessageActionList={CustomMessageActionList}
    >
      <MessageList
        onThreadSelect={(message) => {
          console.log("Selected thread message:", message);
          setSelectedThreadMessage(message); // Set the selected thread message to state
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
      </SafeAreaView>
    </Channel>
  );
}
