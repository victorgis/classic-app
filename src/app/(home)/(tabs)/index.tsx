import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import { ChannelList } from "stream-chat-expo";
import { useAuth } from "../../../providers/AuthProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AllChannelsScreen() {
  const { user } = useAuth();
  const userID = user.id;
  const [cachedChannels, setCachedChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  const filter = {}; // Example filter for channels with the user as a member.

  // Check and load cached channels on component mount
  useEffect(() => {
    const loadCachedChannels = async () => {
      try {
        const cachedData = await AsyncStorage.getItem("allChannels");
        if (cachedData) {
          setCachedChannels(JSON.parse(cachedData)); // Set cached data
        }
      } catch (error) {
        console.log("Error loading cached channels:", error);
      }
    };

    loadCachedChannels();
  }, []);

  // Fetch new channels and update the cache
  const fetchAndUpdateChannels = async (channels) => {
    try {
      // Save new channels to cache
      await AsyncStorage.setItem("allChannels", JSON.stringify(channels));
      setCachedChannels(channels); // Update UI with new data
      setLoading(false); // Set loading to false once data is loaded
    } catch (error) {
      console.log("Error caching channels:", error);
    }
  };

  return (
    <>
      <ChannelList
        filters={filter}
        onSelect={(channel) => router.push(`/channel/${channel.cid}`)}
        onDataFetched={(channels) => fetchAndUpdateChannels(channels)}
        loading={loading}
        // Display cached channels if data is still loading
        channels={loading ? cachedChannels : []}
      />
    </>
  );
}
