import React, { useState, useEffect } from "react";
import { ChannelList } from "stream-chat-expo";
import { useAuth } from "../../../providers/AuthProvider";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyInterestChannelsScreen = () => {
  const { user } = useAuth();
  const [cachedChannels, setCachedChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const userID = user.id;

  const filter = {
    members: { $in: [userID] },
  };

  // Check and load cached channels on component mount
  useEffect(() => {
    const loadCachedChannels = async () => {
      try {
        const cachedData = await AsyncStorage.getItem("channels");
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
      await AsyncStorage.setItem("channels", JSON.stringify(channels));
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
};

export default MyInterestChannelsScreen;
