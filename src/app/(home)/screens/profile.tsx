import { useState, useEffect, useRef } from "react";
import { supabase } from "../../../lib/supabase";
import {
  StyleSheet,
  View,
  Alert,
  Button,
  TouchableOpacity,
  Text,
  FlatList,
  ScrollView,
} from "react-native";
import { Input } from "@rneui/themed";
import { useAuth } from "@/src/providers/AuthProvider";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Avatar from "@/src/component/Avatar";
import { RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAvatar } from "@/src/providers/AvatarContext";
import { router } from "expo-router";
import getOrGenerateUniqueName from "@/src/utils/uniqueName";
import { useChatContext } from "stream-chat-expo";
import { ScreenHeight } from "react-native-elements/dist/helpers";

export default function ProfileScreen() {
  const { session, user } = useAuth();
  const { client } = useChatContext();
  const { setAvatarUrl2, avatarUrl2 } = useAvatar();

  const fullNameInputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [anonName, setAnonName] = useState("");
  const [website, setWebsite] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [userPinnedObjects, setUserPinnedObjects] = useState([]);
  // const [userId, setUserId] = useState("");
  // setUserId(user?.id);

  // const [asyncAvatar, setAsyncAvatar] = useState("")

  useEffect(() => {
    if (session) getProfile();

    (async () => {
      const userName = await getOrGenerateUniqueName();
      setAnonName(userName);
      console.log("Unique User Name:", userName, fullName);
    })();
  }, [session]);

  useEffect(() => {
    const fetchPinnedMessagesAcrossAllChannels = async () => {
      try {
        const response = await client.search(
          { members: { $in: [user.id] } }, // Filter for channels the user is a member of
          { pinned: true } // Filter for pinned messages
        );

        // Extract and collect relevant information
        const pinnedObjects = response.results.map((result) => {
          const message = result.message;
          const channel = message.channel;

          if (user?.id === message.user?.id) {
            // console.log("help", channel?.created_by?.name);

            return {
              userPinned: message.text,
              userChannelsPinned: channel?.cid,
              userChannelName: channel?.name, // Name from channel object
              userCreatedByName: channel?.created_by?.name, // Access name from created_by object
            };
          }

          return null;
        });

        // Filter out null values and update state
        setUserPinnedObjects(pinnedObjects.filter((item) => item !== null));
      } catch (error) {
        console.error("Error fetching pinned messages:", error);
      }
    };

    fetchPinnedMessagesAcrossAllChannels();

    console.log("userPinnedObjects", userPinnedObjects);
  }, []);


  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url, full_name`)
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
        setFullName(anonName);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
    full_name,
  }: {
    username: string;
    website: string;
    avatar_url: string;
    full_name: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        username,
        website,
        avatar_url,
        full_name: full_name,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      } else {
        Alert.alert("Success", "Profile updated successfully!");
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      }
    } finally {
      setLoading(false);
      setIsEditing(false);
    }
  }

  // const res =
  // console.log("res", res)

  // Save avatar URL to AsyncStorage whenever it's updated
  const saveAvatarToStorage = async (url: string) => {
    try {
      const link = `https://xqcfakcvarfbtfngawsd.supabase.co/storage/v1/object/public/avatars/${url}`;
      setAvatarUrl2(link);
      await AsyncStorage.setItem("avatarUrl", link); // Store avatar URL in AsyncStorage
    } catch (error) {
      console.error("Failed to save avatar to storage", error);
    }
  };

  const handleIconPress = () => {
    if (isEditing) {
      updateProfile({
        username,
        website,
        avatar_url: avatarUrl,
        full_name: fullName,
      });
    } else {
      setIsEditing(true);
      setTimeout(() => {
        fullNameInputRef.current?.focus();
      }, 100);
    }
  };

  return (
    <ScrollView>
      <View style={[styles.container, { height: ScreenHeight * 1 }]}>
        <View style={styles.avatar}>
          <Avatar
            size={200}
            url={avatarUrl ? avatarUrl : avatarUrl2}
            onUpload={(url: string) => {
              // console.log("uploadImage", url);
              setAvatarUrl(url);
              setFullName(anonName);
              saveAvatarToStorage(url); // Save the avatar URL to AsyncStorage

              updateProfile({
                username,
                website,
                avatar_url: url,
                full_name: anonName,
              });
            }}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="Display name"
            value={fullName || anonName}
            // onChangeText={(text) => setFullName(text)}
            editable={isEditing}
            ref={fullNameInputRef}
            disabled
            // rightIcon={
            //   <TouchableOpacity onPress={handleIconPress}>
            //     <Ionicons
            //       name={isEditing ? "checkmark" : "pencil"}
            //       size={20}
            //       color={isEditing ? "green" : "#6E00FF"}
            //     />
            //   </TouchableOpacity>
            // }
            onSubmitEditing={() =>
              updateProfile({
                username,
                website,
                avatar_url: avatarUrl,
                full_name: anonName,
              })
            }
            returnKeyType="done"
            labelStyle={{
              color: "#555", // Label color
              fontSize: 14, // Label font size
              fontWeight: "light", // Label font weight
              // marginBottom: 8, // Spacing between label and input
            }}
            inputStyle={{
              color: "#333", // Input text color
              fontSize: 15, // Input font size
              paddingVertical: 4, // Adjust padding
            }}
            inputContainerStyle={{
              borderBottomWidth: 1, // Underline width
              borderBottomColor: "#ddd", // Underline color
            }}
          />
        </View>
        {/* <FlatList
        data={channels}
        keyExtractor={(channel) => channel.id}
        renderItem={({ item }) => (
          <View style={styles.channelItem}>
            <Text style={styles.channelName}>{item.data.name || item.id}</Text>
          </View>
        )}
      /> */}
        <TouchableOpacity
          onPress={() => router.push("/(home)/screens/notificationSettings")}
        >
          <View style={styles.option}>
            <Ionicons name="notifications-outline" size={24} color="#555" />
            <Text style={styles.optionText}>Notification</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(home)/screens/changePassword")}
        >
          <View style={styles.option}>
            <Ionicons name="key" size={24} color="#555" />
            <Text style={styles.optionText}>Change Password</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(home)/screens/ModeratorInInterest")}
        >
          <View style={styles.option}>
            <Ionicons name="person-outline" size={24} color="#555" />
            <Text style={styles.optionText}>Moderator in interest</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/(home)/screens/PinnedMessages",
              params: { data: JSON.stringify(userPinnedObjects) }, // Pass data as string
            })
          }
        >
          <View style={styles.option}>
            <Ionicons name="pin-sharp" size={24} color="#555" />
            <Text style={styles.optionText}>Pinned Messages</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(home)/screens/BlockedList")}
        >
          <View style={styles.option}>
            <MaterialIcons name="block" size={24} color="#555" />
            <Text style={styles.optionText}>Block List</Text>
          </View>
        </TouchableOpacity>

        {/* <View style={styles.verticallySpaced}>
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
      </View> */}
      </View>
    </ScrollView>
  );
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
  channelItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  channelName: {
    fontSize: 16,
  },
});
