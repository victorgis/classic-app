import { router, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  View,
  StyleSheet,
  Button,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { JSX, useEffect, useRef, useState } from "react";
import { Channel as ChannelList } from "stream-chat";
import { useAuth } from "@/src/providers/AuthProvider";
import {
  Channel,
  MessageList,
  MessageInput,
  messageActions,
  ThemeProvider,
} from "stream-chat-expo";
import { RFValue } from "react-native-responsive-fontsize";
import { useChatContext } from "stream-chat-expo";
import { supabase } from "@/src/lib/supabase";

import CustomInput from "@/src/components/CustomInput";
import { shortenString } from "@/utils/shortenString";
import { StreamChat } from "stream-chat";
import ChatTopBar from "@/src/components/ChatTopBar";
import { MaterialIcons } from "@expo/vector-icons";
import { decryptMessage } from "@/utils/decryptTextUtil";
import { useAppContext } from "@/src/providers/AppProvider";
import LoadingActivity from "@/src/components/LoadingActivity";

export default function ChannelScreen() {
  const [channel, setChannel] = useState<ChannelList | null>(null);
  const { cid, name, online, lastseen } = useLocalSearchParams<{
    cid: string;
    name: string;
    online: string;
    lastseen: string;
  }>();
  const { client } = useChatContext();
  const { user } = useAuth();
  const [showInput, setShowInput] = useState(false);
  const [userPresence, setUserPresence] = useState("");
  const [showChatOptions, setShowChatOptions] = useState(false);
  const { setThread, setChannelT } = useAppContext();

  useEffect(() => {
    // handleSendMessage("Good morning");

    const fetchChannel = async () => {
      const channels = await client?.queryChannels({ cid });
      const channel = channels[0];
      const myID = user?.id;
      const membIds = Object.values(channel.state.members);
      const clause1 = channel?.data?.name;
      const clause2 = membIds[0].user?.name;

      setUserPresence(membIds[0].user?.online);
      const inputDate = membIds[0].user?.last_active;
      const dateObject = new Date(inputDate);
      const formattedDate = dateObject.toISOString().split("T")[0];

      const memberIds = Object.keys(channel.state.members);
      // const membersDetails = Object.values(channel.state.members);
      // console.log("memberIds", memberIds);
      // console.log("membersDetails", membersDetails);

      if (memberIds.includes(myID)) {
        console.log(`${myID} is in the interestArray`);
        setShowInput(true);
      } else {
        console.log(`${myID} is not in the interestArray`);
        setShowInput(false);
      }

      setChannel(channels[0]);
      setChannelT(channels[0]);
    };
    fetchChannel();
  }, [cid]);

  if (!channel) {
    return <LoadingActivity />;
  }

  const addMember = async () => {
    const res = await channel.addMembers([user.id]);
    if (res) {
      setShowInput(true);
      Alert.alert("Success", "Joined Successfully");
    }
  };

  const CustomMessageComponent = (props) => {
    const { message } = props;
    try {
      const decryptedMessage = message.text ? decryptMessage(message.text) : "";
      return <Text style={{ padding: RFValue(5) }}>{decryptedMessage}</Text>;
    } catch (error) {
      console.error("Error rendering MessageSimple:", error);
      return <Text style={{ color: "red" }}>Error displaying message</Text>;
    }
  };

  return (
    <>
      {/* <CustomInput channel = {channel} /> */}
      {showChatOptions && (
        <TouchableWithoutFeedback
          onPress={() => {
            setShowChatOptions(false);
          }}
        >
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}

      <ChatTopBar
        showChatOptions={showChatOptions}
        setShowChatOptions={setShowChatOptions}
      />

      <Channel
        channel={channel}
        audioRecordingEnabled
        // MessageText={CustomMessageComponent}
        // Input={CustomInput}

        messageActions={(params) => {
          const { dismissOverlay, message } = params;

          // Default actions (filter out "Mark as Unread")
          let actions = messageActions({ ...params });

          // console.log("actions", params);

          // User ID (current user)
          const userId = client.userID;
          const senderId = message.user?.id;
          const messageText = message.text;

          // Custom Actions Array
          const customActions = [];

          // Show "Reply Privately" only if the message is from someone else
          if (userId !== senderId) {
            customActions.push({
              action: async () => {
                try {
                  const privateChannel = client.channel("messaging", {
                    members: [message.user?.id, client.userID],
                  });
                  await privateChannel.watch();
                  console.log("Private chat started:", privateChannel.id);
                  dismissOverlay();

                  // Navigate to the private chat
                  router.replace({
                    pathname: "/channel/[cid]",
                    params: { cid: privateChannel.cid },
                  });
                  // router.replace(`/channel/${privateChannel.cid}`);
                } catch (error) {
                  console.error("Error creating private chat:", error);
                }
              },
              actionType: "reply-privately",
              title: "Reply Privately",
              icon: <MaterialIcons size={25} color={"grey"} name="chat" />,
            });
          }

          // Show "Save Message" only if the message is not empty
          if (messageText) {
            customActions.push({
              action: async () => {
                try {
                  if (!userId || !messageText) {
                    console.error("Missing required fields for saving message");
                    return;
                  }

                  // Save to Supabase
                  const { error } = await supabase
                    .from("saved_messages")
                    .insert([
                      {
                        message: messageText,
                        created_at: new Date().toISOString(),
                        user_id: userId,
                      },
                    ]);

                  if (error) {
                    console.error("Error saving message:", error.message);
                  } else {
                    Alert.alert("Success", "Message saved successfully.");
                  }

                  dismissOverlay();
                } catch (error) {
                  console.error("Error saving message:", error);
                }
              },
              actionType: "save-message",
              title: "Save Message",
              icon: <MaterialIcons size={25} name="bookmark" />,
            });
          }

          // Merge default and custom actions
          return [...actions, ...customActions];
        }}
      >
        <MessageList
          onThreadSelect={(message) => {
            // console.log("message", message);
            if (channel?.id) {
              setThread(message);
              router.push("/screens/ThreadScreen");
            }
          }}
        />

        {/* <SafeAreaView edges={["bottom"]} style={{ marginBottom: RFValue(58) }}> */}
        <SafeAreaView edges={["bottom"]}>
          {showInput ? (
            <View style={{ marginBottom: RFValue(58) }}>
              <MessageInput />
            </View>
          ) : (
            <View
              style={[
                {
                  backgroundColor: "#ccc",
                  padding: RFValue(8),
                  marginBottom: RFValue(80),
                },
              ]}
            >
              <TouchableOpacity onPress={addMember}>
                <Text style={[{ textAlign: "center" }]}>
                  Click here to join
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </SafeAreaView>
      </Channel>
    </>
  );
}

const styles = StyleSheet.create({
  options: {
    position: "absolute",
    right: RFValue(20),
    top: RFValue(40),
    backgroundColor: "#fff",
    zIndex: 1,
    borderColor: "#262626",
    width: 150,
    padding: RFValue(15),
    paddingVertical: RFValue(8),

    // Shadow for Android
    elevation: 5, // Adjust as needed

    // Shadow for iOS
    shadowColor: "#262626",
    shadowOffset: { width: 0, height: 2 }, // Horizontal and vertical offset
    shadowOpacity: 0.25, // Opacity of the shadow
    shadowRadius: 4, // Blur radius

    // Add a border for better visibility (optional)
    // borderWidth: 1,
    borderRadius: 8, // Rounded corners (optional)
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.o)", // Transparent
    zIndex: 1, // Ensures it's above main content
  },
  inputContainer: { padding: 10 },
  buttonRow: { flexDirection: "row", justifyContent: "space-between" },
  messageContainer: {
    padding: 10,
    backgroundColor: "#f4f4f4",
    borderRadius: 8,
    marginVertical: 4,
  },
  senderName: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  messageText: {
    fontSize: 16,
  },
});
