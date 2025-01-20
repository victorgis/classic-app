import { MaterialCommunityIcons, Octicons, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  StyleSheet,
  Image,
  Text,
  Alert,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useEffect, useState } from "react";
import { Channel as ChannelList } from "stream-chat";
import { useLocalSearchParams } from "expo-router";
import { useChatContext } from "stream-chat-expo";
import { useAppContext } from "@/src/providers/AppProvider";
import { shortenString } from "@/utils/shortenString";
import { useAuth } from "../providers/AuthProvider";

const logo = require("../../assets/images/logo.png");

const ChatTopBar = ({ showChatOptions, setShowChatOptions }: any) => {
  const { client } = useChatContext();
  const { user } = useAuth();
  const { cid, name, online, lastseen, id } = useLocalSearchParams<{
    cid: string;
    name: string;
    online: string;
    lastseen: string;
    id: string;
  }>();
  // const { channelApp } = useAppContext();
  const [chatName, setChatName] = useState("");
  const [chatImg, setChatImg] = useState("");
  const [channel, setChannel] = useState<ChannelList | null>(null);
  const [clauseName, setClauseName] = useState<any | null>(null);
  const [clauseName2, setClauseName2] = useState<any | null>(null);
  const [userPresence, setUserPresence] = useState("");
  const [chatPresence, setChatPresence] = useState<any | null>(null);
  const [chatUserId, setChatUserId] = useState("");
  const [reason, setReason] = useState("no reason");

  useEffect(() => {
    const fetchChannel = async () => {
      // console.log("channelApp", channelApp);
      const channels = await client.queryChannels({ cid });
      const channel = channels[0];
      const membIds = Object.values(channel.state.members);
      const clause1 = channel?.data?.name;
      const clause2 = membIds[0].user?.name;

      console.log("name", shortenString(name));

      setChannel(channels[0]);
      // setChatImg(channel?.data?.image || membIds[0].user?.image);

      setClauseName(clause1);
      setClauseName2(clause2);

      const channelName = shortenString(channel?.data?.name);
      setChatName(channelName);

      setUserPresence(online);
      setChatUserId(id);
      // const inputDate = membIds[0].user?.last_active;
      const inputDate = lastseen;
      const dateObject = new Date(inputDate);
      const formattedDate = dateObject.toISOString().split("T")[0];

      const pres = userPresence
        ? "online"
        : `last seen: ${formattedDate}` || "offline";

      setChatPresence(pres);
    };
    fetchChannel();
  }, [cid]);

  const channelSettingFx = () => {
    !showChatOptions ? setShowChatOptions(true) : setShowChatOptions(false);
  };

  const leaveChannel = async () => {
    try {
      const res = await channel?.removeMembers([user.id]); // Replace 'user.id' with the actual user ID

      router.push("/(home)/chat");
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

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 16,
          height: RFValue(55),
          borderBottomWidth: 1,
          borderColor: "#ccc",
          backgroundColor: "#fff",
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

        {name && (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row", // Arrange image and text horizontally
                alignItems: "center", // Align items vertically in the center
              }}
            >
              <Image
                source={logo ? logo : { uri: chatImg }}
                style={{
                  width: RFValue(35), // Adjust width for the image
                  height: RFValue(35), // Adjust height for the image
                  borderRadius: RFPercentage(50), // Make the image circular
                  borderWidth: RFValue(1),
                  marginRight: RFValue(8), // Add space between image and text
                  borderColor: userPresence == "online" ? "green" : "grey",
                }}
              />
              <View>
                <Text style={{ fontSize: 15, color: "#262626" }}>
                  {/* {chatName ? chatName : shortenString(name)} */}
                  {shortenString(name)}
                </Text>

                {chatName ? (
                  ""
                ) : (
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
                      color={userPresence == "online" ? "green" : "grey"}
                    />
                    <Text
                      style={{
                        fontSize: 9.5,
                        marginLeft: 4,
                        color: userPresence == "online" ? "green" : "grey",
                      }}
                    >
                      {userPresence
                        ? userPresence
                        : `offline ${
                            new Date(lastseen).toISOString().split("T")[0]
                          }`}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        )}

        {/* Right Icon */}
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <TouchableOpacity onPress={() => channelSettingFx()}>
            <Ionicons name="ellipsis-vertical" size={RFValue(17)} />
          </TouchableOpacity>
        </View>
      </View>
      {showChatOptions && (
        <View style={styles.options}>
          {clauseName ? (
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
          ) : (
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

          {/* {clauseName && } */}
        </View>
      )}
    </View>
  );
};
export default ChatTopBar;
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
});
