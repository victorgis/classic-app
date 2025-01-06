import { View, Text, Pressable } from "react-native";
import React from "react";
import { useChatContext } from "stream-chat-expo";
import { useAuth } from "../providers/AuthProvider";
import { router } from "expo-router";
import { useEffect, useState } from "react";

const ChannelListItem = ({ user }) => {
  const [newChannel, setNewChannel] = useState()
  const { client } = useChatContext();
  const { user: me } = useAuth();

  useEffect(() => {
    const createAndWatchChannel = async () => {
      const newChannel1 = client.channel("messaging", "channel_id2", {
        name: "Global01"
      });
      await newChannel1.watch();
      setNewChannel(newChannel1);
    };
    createAndWatchChannel();
  }, []);

  console.log("what's here", newChannel)

  const onPress = async () => {
    //start a chat with him
    // const channel = client.channel("messaging", {
    //   // members: [me.id, user.id],
    // });
    // await channel.watch();
    router.replace(`/(home)/channel/${newChannel.cid}`);
    console.log("test")
  };

  return (
    <Pressable
      onPress={onPress}
      style={{ padding: 15, backgroundColor: "white" }}
    >
      {/* <Text style={{ fontWeight: "600" }}>{user.full_name}</Text> */}
      <Text style={{ fontWeight: "600" }}>{"newChannel"}</Text>
    </Pressable>
  );
};

export default ChannelListItem;
