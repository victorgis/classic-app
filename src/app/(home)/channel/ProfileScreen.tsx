import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { useChatContext } from "stream-chat-expo";
import { router } from "expo-router";

export default function ProfileScreen() {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const { client } = useChatContext();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await client.queryUsers({ id: { $eq: userId } });
        setUser(response.users[0]);
      } catch (error) {
        console.error("Failed to fetch user", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  const startDirectChat = async () => {
    try {
      const channel = client.channel("messaging", {
        members: [userId, client.userID],
      });
      await channel.watch();
      router.push({
        pathname: "/channel",
        params: { cid: channel.id },
      });
    } catch (error) {
      console.error("Failed to start chat", error);
    }
  };

  if (loading) return <ActivityIndicator />;

  if (!user) {
    return <Text>User not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user.name || user.id}</Text>
      <Text style={styles.details}>Email: {user.email || "N/A"}</Text>
      <Button title="Start Chat" onPress={startDirectChat} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  name: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  details: { fontSize: 16, marginBottom: 20 },
});
