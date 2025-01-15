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
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { ScreenHeight } from "react-native-elements/dist/helpers";

export default function ChannelScreen() {
  const [chatName, setChatName] = useState("");
  const [chatImg, setChatImg] = useState("");
  const [chatPresence, setChatPresence] = useState<any | null>(null);
  const [channel, setChannel] = useState<ChannelList | null>(null);
  const { cid } = useLocalSearchParams<{ cid: string }>();
  const { client } = useChatContext();
  const { user } = useAuth();
  const [showInput, setShowInput] = useState(false);
  const [clauseName, setClauseName] = useState<any | null>(null);
  const [clauseName2, setClauseName2] = useState<any | null>(null);
  const [userPresence, setUserPresence] = useState("");
  const [chatUserId, setChatUserId] = useState("");
  const [reason, setReason] = useState("no reason");
  const [showChatOptions, setShowChatOptions] = useState(false);
  // const navigation = useNavigation();
  // navigation.setOptions({ title: chatName || "" });

  useEffect(() => {
    const fetchChannel = async () => {
      const channels = await client.queryChannels({ cid });
      const channel = channels[0];
      const myID = user?.id;
      const membIds = Object.values(channel.state.members);
      const clause1 = channel?.data?.name;
      const clause2 = membIds[0].user?.name;

      setClauseName(clause1);
      setClauseName2(clause2);

      setChatName(channel?.data?.name || membIds[0].user?.name);
      setChatImg(channel?.data?.image || membIds[0].user?.image);

      setUserPresence(membIds[0].user?.online);
      const inputDate = membIds[0].user?.last_active;
      const dateObject = new Date(inputDate);
      const formattedDate = dateObject.toISOString().split("T")[0];

      const pres = userPresence === "online" ? "online" : `last seen: ${formattedDate}`;

      setChatPresence(pres);
      setChatUserId(membIds[0].user?.id);

      console.log("otherUser", membIds[0].user);

      // const v = navigation.setOptions({ title: channel?.data?.name });
      // console.log("v", v);

      console.log("client", client);

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
    if (res) {
      setShowInput(true);
      Alert.alert("Success", "Joined Successfully");
    }
  };

  const leaveChannel = async () => {
    try {
      console.log("I'm here");
      const res = await channel.removeMembers([user.id]); // Replace 'user.id' with the actual user ID

      router.push("/(home)/homepage");
      Alert.alert("Success", "You exited successfully");
      console.log("Successfully left the channel", res);
    } catch (error) {
      setShowChatOptions(false);
      console.error("Error leaving the channel:", error);
    }
  };

  const reportUser = async (userId: string, reason: string) => {
    try {
      await client.flagUser(userId, { reason });
      setShowChatOptions(false);
      Alert.alert("Success", "User reported. Thank you for your feedback!");
    } catch (error) {
      console.error("Error reporting the user:", error);
      setShowChatOptions(false);
      Alert.alert(
        "Error",
        "Failed to report the user. Please try again later."
      );
    }
  };

  const channelSettingFx = () => {
    !showChatOptions ? setShowChatOptions(true) : setShowChatOptions(false);
  };

  return (
    <>
      {showChatOptions && (
        <TouchableWithoutFeedback
          onPress={() => {
            setShowChatOptions(false);
          }}
        >
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 16,
          height: RFValue(55),
          borderBottomWidth: 1,
          borderColor: "#ccc",
        }}
      >
        {/* Left Icon */}
        <View style={{ flex: 1 }}>
          <MaterialCommunityIcons
            onPress={() => router.back()}
            name="arrow-left"
            size={25}
          />
        </View>

        {/* Center Section */}
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Image and Text on the Same Line */}
          <View
            style={{
              flexDirection: "row", // Arrange image and text horizontally
              alignItems: "center", // Align items vertically in the center
            }}
          >
            <Image
              source={{
                uri: chatImg,
              }}
              style={{
                width: RFValue(24), // Adjust width for the image
                height: RFValue(24), // Adjust height for the image
                borderRadius: RFValue(12), // Make the image circular
                marginRight: RFValue(8), // Add space between image and text
              }}
            />
            <Text style={{ fontSize: 15 }}>{chatName}</Text>
          </View>

          {/* Text Below */}
          {!clauseName && (
            <View
              style={{
                flexDirection: "row", // Arrange items horizontally
                alignItems: "center", // Align items vertically in the center
                justifyContent: "center", // Center content horizontally (optional)
              }}
            >
              <Octicons
                name="dot-fill"
                size={15}
                color={userPresence ? "green" : "grey"}
              />
              <Text
                style={{
                  fontSize: 9.5,
                  marginLeft: 4,
                  color: userPresence ? "green" : "grey",
                }}
              >
                {chatPresence}
              </Text>
            </View>
          )}
        </View>

        {/* Right Icon */}
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <TouchableOpacity onPress={() => channelSettingFx()}>
            <Ionicons name="ellipsis-vertical" size={RFValue(17)} />
          </TouchableOpacity>
        </View>
      </View>
      {showChatOptions && (
        <View style={styles.options}>
          {clauseName && (
            <TouchableOpacity onPress={() => leaveChannel()}>
              <Text
                style={{
                  color: "red",
                  textAlign: "justify",
                  padding: RFValue(5),
                  shadowColor: "#fff",
                  elevation: 4,
                }}
              >
                Leave Channel
              </Text>
            </TouchableOpacity>
          )}

          {!clauseName && (
            <TouchableOpacity onPress={() => reportUser(chatUserId, reason)}>
              <Text
                style={{
                  color: "red",
                  textAlign: "justify",
                  padding: RFValue(5),
                }}
              >
                Report User
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <Channel channel={channel}>
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
});
