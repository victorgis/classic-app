import { useState, useEffect, useRef } from "react";
import { supabase } from "../../../lib/supabase";
import { StyleSheet, View, Alert, TouchableOpacity, Text } from "react-native";
import { Input } from "@rneui/themed";
import { useAuth } from "@/src/providers/AuthProvider";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Avatar from "@/src/component/Avatar";
import { RFValue } from "react-native-responsive-fontsize";

export default function ProfileScreen() {
  const { session } = useAuth();

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [website, setWebsite] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const fullNameInputRef = useRef(null);

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

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
        setFullName(data.full_name);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
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
        full_name,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      } else {
        Alert.alert("Profile updated successfully!");
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
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Avatar
          size={200}
          url={avatarUrl}
          onUpload={(url: string) => {
            setAvatarUrl(url);
            updateProfile({
              username,
              website,
              avatar_url: url,
              full_name: fullName,
            });
          }}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Full Name"
          value={fullName || ""}
          onChangeText={(text) => setFullName(text)}
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
            updateProfile({
              username,
              website,
              avatar_url: avatarUrl,
              full_name: fullName,
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
      <View style={styles.option}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#fff",
    paddingHorizontal: RFValue(25 ),
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