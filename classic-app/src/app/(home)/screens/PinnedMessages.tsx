import { FlatList, Text, View, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function PinnedMessages() {
  const { data } = useLocalSearchParams(); // Retrieve passed params
  const router = useRouter();

  // Parse the JSON string back into an array/object
  const pinnedMessages = data ? JSON.parse(data) : [];

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() =>
        router.replace({
          pathname: "/channel/[cid]",
          params: { cid: item.userChannelsPinned },
        })
      } // Navigate to the channel screen with the CID
      style={{
        marginVertical: 10,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>
        {item.userPinned}
      </Text>
      <Text style={{ fontSize: 12, color: "grey" }}>
        {item.userChannelName ? item.userChannelName : item.userCreatedByName}
      </Text>
    </TouchableOpacity>
  );

  console.log();

  // const channelName = item.userChannelName
  //   ? item.userCreatedByName
  //   : item.userChannelName;

  return (
    <View style={{ padding: 16 }}>
      {pinnedMessages.length > 0 ? (
        <FlatList
          data={pinnedMessages}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text>No pinned messages found.</Text>
      )}
    </View>
  );
}
