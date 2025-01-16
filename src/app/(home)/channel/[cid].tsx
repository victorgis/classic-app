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
  useChatContext,
  messageActions,
  ThemeProvider,
} from "stream-chat-expo";
import { RFValue } from "react-native-responsive-fontsize";
import CryptoJS from "react-native-crypto-js";

import CustomInput from "@/src/component/CustomInput";
import ChatTopBar from "@/src/component/ChatTopBar";

export default function ChannelScreen() {
  const [channel, setChannel] = useState<ChannelList | null>(null);
  const { cid } = useLocalSearchParams<{ cid: string }>();
  const { client } = useChatContext();
  const { user } = useAuth();
  const [showInput, setShowInput] = useState(false);
  const [userPresence, setUserPresence] = useState("");
  const [showChatOptions, setShowChatOptions] = useState(false);

  const encryptionKey = "shared-secret-key";

  const decryptMessage = (encryptedText: any) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedText, encryptionKey);
      const originalText = bytes.toString(CryptoJS.enc.Utf8);
      return originalText || encryptedText; // Return original text if decryption is successful, else fallback to encrypted text
    } catch (error) {
      console.error("Error decrypting message:", error);
      return encryptedText; // Fallback in case of an error
    }
  };

  useEffect(() => {
    // handleSendMessage("Good morning");
    const fetchChannel = async () => {
      const channels = await client.queryChannels({ cid });
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
        // console.log(`${myID} is in the interestArray`);
        setShowInput(true);
      } else {
        // console.log(`${myID} is not in the interestArray`);
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
        MessageText={CustomMessageComponent}
        Input={CustomInput}
        // thread={thread}
      >
        <MessageList />

        <SafeAreaView edges={["bottom"]} style={{ marginBottom: RFValue(58) }}>
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
