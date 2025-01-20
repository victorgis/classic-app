import { FlatList, Text, View, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { decryptMessage } from "@/utils/decryptTextUtil";
import { useState } from "react";
import { supabase } from "../../../lib/supabase"; // Ensure correct path
import { RFValue } from "react-native-responsive-fontsize";

export default function SavedMessages() {
  const { data } = useLocalSearchParams();
  const [savedMessages, setSavedMessages] = useState(
    data ? JSON.parse(data) : []
  );

  // Delete message function
  const deleteMessage = async (id: string) => {
    try {
      const { error } = await supabase
        .from("saved_messages")
        .delete()
        .eq("id", id);
      if (error) throw error;

      // Update local state to remove deleted message
      setSavedMessages(savedMessages.filter((msg) => msg.id !== id));
    } catch (error) {
      Alert.alert("Error", "Failed to delete message.");
      console.error("Delete Error:", error);
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16 }}>{decryptMessage(item.message)}</Text>
        <Text style={{ fontSize: 12, color: "grey" }}>{item.created_at}</Text>
      </View>

      {/* Delete Button */}
      <TouchableOpacity onPress={() => deleteMessage(item.id)}>
        <Text
          style={{ color: "red", fontWeight: "bold", fontSize: RFValue(15) }}
        >
          X
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ padding: 16 }}>
      {savedMessages.length > 0 ? (
        <FlatList
          data={savedMessages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text>No saved messages found.</Text>
      )}
    </View>
  );
}
