import { router } from "expo-router";
import { ChannelList } from "stream-chat-expo";
import { useAuth } from "../../../providers/AuthProvider";
import { useEffect, useState } from "react";

export default function AllChannelsScreen({ searchQuery }: any) {
  const [filter, setFilter] = useState<any | null>(null); // Default to null or empty filter
  const { user } = useAuth();
  const userID = user.id;

  useEffect(() => {
    // Determine the filter dynamically
    const newFilter = searchQuery
      ? { name: { $autocomplete: searchQuery } } // Filter by query
      : {}; // Empty filter for all channels
    setFilter(newFilter);
    console.log("Updated filter:", newFilter);
  }, [searchQuery]);

  return (
    <>
      <ChannelList
        filters={filter}
        onSelect={(channel) => router.push(`/channel/${channel.cid}`)}
      />
    </>
  );
}
