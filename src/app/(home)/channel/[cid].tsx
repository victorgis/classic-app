import { router, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  Image,
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
import {
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
  const [userPresence, setUserPresence] = useState("");
  // const navigation = useNavigation();
  // navigation.setOptions({ title: chatName || "" });

  useEffect(() => {
    const fetchChannel = async () => {
      const channels = await client.queryChannels({ cid });
      const channel = channels[0];
      const myID = user?.id;
      const membIds = Object.values(channel.state.members);
      const clause1 = channel?.data?.name;
      setClauseName(clause1);

      setChatName(channel?.data?.name || membIds[0].user?.name);
      setChatImg(channel?.data?.image || membIds[0].user?.image);

      setUserPresence(membIds[0].user?.online);
      const inputDate = membIds[0].user?.last_active;
      const dateObject = new Date(inputDate);
      const formattedDate = dateObject.toISOString().split("T")[0];

      const pres = userPresence ? "online" : `last seen: ${formattedDate}`;

      setChatPresence(pres);

      console.log("user", membIds[0].user);

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
    <>
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
          <MaterialIcons name="people" size={25} />
        </View>
      </View>

      <Channel channel={channel}>
        <MessageList />

        <SafeAreaView edges={["bottom"]} style={{marginBottom: RFValue(58)}}>
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
