import { useState, useEffect, useRef } from "react";
import { supabase } from "../../../lib/supabase";
import {
  StyleSheet,
  View,
  Alert,
  Button,
  TouchableOpacity,
  Text,
} from "react-native";
import { Input } from "@rneui/themed";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Avatar from "@/src/component/Avatar";
import { RFValue } from "react-native-responsive-fontsize";
import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  OverlayProvider,
} from "stream-chat-expo";
import { useChatContext } from "stream-chat-expo";
import { FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useAuth } from "@/src/providers/AuthProvider";

export default function CreateInterestScreen() {
  console.log();
  const { session } = useAuth();
  const { client } = useChatContext();
  const [loading, setLoading] = useState(false);
  const [interestId, setInterestId] = useState("");
  const [interestName, setInterestName] = useState("");
  // const [interests, setInterests] = useState([]);
  const [interestAvatarUrl, setInterestAvatarUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const fullNameInputRef = useRef(null);
  const [channel, setChannel] = useState();
  const { cid } = useLocalSearchParams<{ cid: string }>();

  // useEffect(() => {
  //   if (session) getInterest();
  // }, [session]);

  async function getInterest() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("interests")
        .select(`interest_name, interest_avatar_url, interest_id`);
      // .select("*");
      // .eq("id", session?.user.id)
      // .single();
      if (error && status !== 406) {
        throw error;
      }

      // setInterests(interests);

      if (data) {
        setInterestId(data.interest_id);
        setInterestAvatarUrl(data.interest_avatar_url);
        setInterestName(data.interest_name);
      }

      // setChannel(newChannel)
      // show a channel based on channel ID
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  // useEffect(() => {
  // const filter = {  members: { $in: session?.user.id } };
  const filter = { cid: { $in: ["messaging:classic-app-oj6pmgasy"] } };
  const sort = [{ last_message_at: -1 }];
  const connect = async () => {
    const channels = await client.queryChannels(filter, sort, {
      watch: true, // this is the default
      state: true,
    });
    console.log("text", channels);
  };
  connect();

  // console.log("channels", channels);

  // connect();
  // }, []);

  return <Text>Hello</Text>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#fff",
    paddingHorizontal: RFValue(25),
  },
  avatar: {
    alignItems: "center",
  },
  verticallySpaced: {
    marginTop: 24,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    paddingVertical: 8,
    // borderBottomWidth: 1,
    // borderBottomColor: "#ddd",
  },
  optionText: {
    marginLeft: 16,
    fontSize: 16,
    color: "#333",
  },
});
