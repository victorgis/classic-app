import { useState, useEffect, useRef } from "react";
import { supabase } from "../../../lib/supabase";
import { StyleSheet, View, Alert, TouchableOpacity, Text } from "react-native";
import { Input } from "@rneui/themed";
import { useAuth } from "@/src/providers/AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import Avatar from "@/src/component/Avatar";
import { RFValue } from "react-native-responsive-fontsize";
import { useChatContext } from "stream-chat-expo";
import { router } from "expo-router";

export default function CreateInterestScreen() {
  const { session, user } = useAuth();
  const { client } = useChatContext();
  const [loading, setLoading] = useState(false);
  const [interestId, setInterestId] = useState("");
  const [interestName, setInterestName] = useState("");
  const [interestAvatarUrl, setInterestAvatarUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const fullNameInputRef = useRef(null);

  // Generate unique interestId on component mount
  useEffect(() => {
    const generateInterestId = () => {
      // const timestamp = new Date().toISOString();
      const randomPart = Math.random().toString(36).substr(2, 9); // Random alphanumeric
      return `classic-app-${randomPart}`;
    };

    setInterestId(generateInterestId());
  }, []);

  async function createInterest({
    interest_id,
    interest_avatar_url,
    interest_name,
  }: {
    interest_id: string;
    interest_avatar_url: string;
    interest_name: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const newChannel = client.channel("messaging", interest_id, {
        name: interest_name,
        // members: [user.id],
        watch: true, // this is the default
        state: true,
      });
      await newChannel.watch();

  

      if (newChannel){
        router.push(`/(home)/homepage`);
      }

    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
      setIsEditing(false);
    }
  }

  const handleIconPress = () => {
    if (isEditing) {
      createInterest({
        interest_id: interestId,
        interest_avatar_url: interestAvatarUrl,
        interest_name: interestName,
      });
    } else {
      setIsEditing(true);
      setTimeout(() => {
        fullNameInputRef.current?.focus();
      }, 100);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Avatar
          size={200}
          url={interestAvatarUrl}
          onUpload={(url: string) => {
            setInterestAvatarUrl(url);
            // createInterest({
            //   interest_id: interestId,
            //   interest_avatar_url: url,
            //   interest_name: interestName,
            // });
          }}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Interest Name"
          value={interestName}
          onChangeText={(text) => setInterestName(text)}
          editable={isEditing}
          ref={fullNameInputRef}
          rightIcon={
            <TouchableOpacity onPress={handleIconPress}>
              <Ionicons
                name={isEditing ? "checkmark" : "pencil"}
                size={20}
                color={isEditing ? "green" : "#6E00FF"}
              />
            </TouchableOpacity>
          }
          // onSubmitEditing={() =>
          //   createInterest({
          //     interest_id: interestId,
          //     interest_avatar_url: interestAvatarUrl,
          //     interest_name: interestName,
          //   })
          // }
          // returnKeyType="done"
          labelStyle={{
            color: "#555",
            fontSize: 14,
          }}
          inputStyle={{
            color: "#333",
            fontSize: 15,
            paddingVertical: 4,
          }}
          inputContainerStyle={{
            borderBottomWidth: 1,
            borderBottomColor: "#ddd",
          }}
        />
      </View>
      <View style={[{alignItems:"center", backgroundColor: "#ccc"}]}>
        <TouchableOpacity>
          <Ionicons name="checkmark" size={25} />
        </TouchableOpacity>
      </View>
    </View>
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
});
