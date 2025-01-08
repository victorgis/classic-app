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
import { useAuth } from "@/src/providers/AuthProvider";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Avatar from "@/src/component/Avatar";
import { RFValue } from "react-native-responsive-fontsize";

export default function CreateInterestScreen() {
  const { session } = useAuth();

  const [loading, setLoading] = useState(false);
  const [interestId, setInterestId] = useState("");
  const [interestName, setInterestName] = useState("");
  //   const [website, setWebsite] = useState("");
  const [interestAvatarUrl, setInterestAvatarUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const fullNameInputRef = useRef(null);

  useEffect(() => {
    if (session) getInterest();
  }, [session]);

  async function getInterest() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("interests")
        .select(`interest_name, interest_avatar_url, interest_id`)
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setInterestId(data.interest_id);
        setInterestAvatarUrl(data.interest_avatar_url);
        setInterestName(data.interest_name);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      }
    } finally {
      setLoading(false);
    }
  }

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

      const updates = {
        id: session?.user.id,
        interest_id,
        interest_avatar_url,
        interest_name,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("interests").upsert(updates);

      if (error) {
        throw error;
      } else {
        Alert.alert("Success", "Interest updated successfully!");
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
            createInterest({
              interest_id: interestId,
              interest_avatar_url: url,
              interest_name: interestName,
            });
          }}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Interest Name"
          value={interestName || ""}
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
          onSubmitEditing={() =>
            createInterest({
              interest_id: interestId,
              interest_avatar_url: interestAvatarUrl,
              interest_name: interestName,
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

      {/* <View style={styles.option}>
        <Ionicons name="notifications-outline" size={24} color="#555" />
        <Text style={styles.optionText}>Notification</Text>
      </View>
      <View style={styles.option}>
        <Ionicons name="key" size={24} color="#555" />
        <Text style={styles.optionText}>Change Password</Text>
      </View>
      <View style={styles.option}>
        <Ionicons name="person-outline" size={24} color="#555" />
        <Text style={styles.optionText}>Moderator in interest</Text>
      </View>
      <View style={styles.option}>
        <MaterialIcons name="block" size={24} color="#555" />
        <Text style={styles.optionText}>Block List</Text>
      </View>
      <View style={styles.verticallySpaced}>
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
      </View> */}
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
