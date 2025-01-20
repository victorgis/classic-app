import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useAppContext } from "../../../providers/AppProvider";
import { useAuth } from "../../../providers/AuthProvider";
import { useChatContext } from "stream-chat-expo";

export default function ModeratorInInterest() {
  const { client } = useChatContext();
  const { user } = useAuth();

  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const fetchModeratorChannels = async () => {
      try {
        const filters = {
          members: { $in: [user?.id] },
        };
        const sort = { last_message_at: -1 }; // Sort channels by last message
        const options = { watch: true, state: true }; // Load initial channel state

        const channelList = await client.queryChannels(filters, sort, options);

        // Filter channels where the user is a moderator
        const moderatedChannels = channelList
          .filter((channel) => channel.data.moderators?.includes(user?.id))
          .map((channel) => ({
            channelId: channel.data.id,
            channelName: channel.data.name,
            moderators: channel.data.moderators,
            avatar: channel.data.image,
          }));

        setChannels(moderatedChannels);
      } catch (error) {
        console.error("Error fetching moderator channels:", error);
      }
    };

    fetchModeratorChannels();
  }, [user?.id]);

  const renderChannel = ({ item }) => (
    <View style={styles.channelContainer}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <Text style={styles.channelName}>{item.channelName}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {channels.length > 0 ? (
        <FlatList
          data={channels}
          keyExtractor={(item) => item.channelId}
          renderItem={renderChannel}
          contentContainerStyle={styles.contentContainer}
        />
      ) : (
        <Text style={styles.emptyText}>No channels found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: RFValue(10),
  },
  title: {
    fontSize: RFValue(18),
    fontWeight: "bold",
    marginBottom: RFValue(10),
    color: "#333",
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: RFValue(20),
  },
  channelContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: RFValue(14),
    backgroundColor: "#f9f9f9",
    borderRadius: RFValue(8),
    marginBottom: RFValue(10),
    shadowColor: "#262626",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: RFValue(10),
  },
  channelName: {
    fontSize: RFValue(16),
    // fontWeight: "bold",
    color: "#333",
  },
  emptyText: {
    textAlign: "center",
    fontSize: RFValue(16),
    color: "#999",
    marginTop: RFValue(20),
  },
});
