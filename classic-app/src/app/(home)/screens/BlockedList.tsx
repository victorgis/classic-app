import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useAuth } from "../../../providers/AuthProvider";
import { useAppContext } from "../../../providers/AppProvider";
import { useChatContext } from "stream-chat-expo";

export default function BlockedList() {
  const { client } = useChatContext();
  const [blockedUsers, setBlockedUsers] = useState([]);
  const { user } = useAuth();

  // useEffect(() => {
  //   // console.log(user.id)
  //   const blockUser = async (userId: string) => {
  //     try {
  //       await client.blockUser(userId);
  //     } catch (err) {
  //       console.log("Error blocking user:", err);
  //     }
  //   };
  //   blockUser("c8b9db33-c7ad-4f5c-ab78-15d832493a00");
  // }, []);

  useEffect(() => {
    const getBlockedUsers = async () => {
      try {
        const users = await client.getBlockedUsers();
        setBlockedUsers(users.blocks);
      } catch (error) {
        console.log("Error getting blocked users:", error);
      }
    };
    getBlockedUsers();
  }, []);

  const unBlockUser = async (userId: string) => {
    try {
      await client.unBlockUser(userId);
      const filteredUsers = blockedUsers.filter(
        (user) => user.blocked_user_id !== userId
      );
      setBlockedUsers(filteredUsers);
    } catch (err) {
      console.log("Error unblocking user:", err);
    }
  };

  const renderItem = ({ item }: any) => {
    const { blocked_user } = item;

    return (
      <View style={styles.userContainer}>
        <Image source={{ uri: blocked_user.image }} style={styles.image} />
        <Text style={styles.name}>{blocked_user.name}</Text>
        <Pressable
          onPress={() => unBlockUser(blocked_user.id)}
          style={styles.unblockButton}
        >
          <Text style={styles.unblockText}>X</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={blockedUsers}
        keyExtractor={(item) => item.blocked_user_id}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No blocked users found.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: RFValue(10),
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: RFValue(20),
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: RFValue(14),
    // backgroundColor: "#f9f9f9",
    borderRadius: RFValue(8),
    marginBottom: RFValue(10),
    shadowColor: "#262626",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: RFValue(20),
  },
  name: {
    flex: 1,
    fontSize: RFValue(16),
    // fontWeight: "bold",
    color: "#333",
  },
  unblockButton: {
    // backgroundColor: "#ff4d4d",
    paddingVertical: RFValue(6),
    paddingHorizontal: RFValue(12),
    borderRadius: RFValue(6),
  },
  unblockText: {
    color: "#262626",
    fontSize: RFValue(14),
    fontWeight: "600",
  },
  emptyText: {
    textAlign: "center",
    fontSize: RFValue(16),
    color: "#999",
    marginTop: RFValue(20),
  },
});
