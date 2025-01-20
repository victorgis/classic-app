import { Thread, Channel, MessageList } from "stream-chat-expo";
import { useState, useEffect } from "react";
import { useAppContext } from "../../../providers/AppProvider";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const ThreadScreen = () => {
  const { thread, channel } = useAppContext();

  if (!channel) {
    return null;
  }

  console.log("chanelAA", channel);
  console.log("threadAA", thread);

  return (
    <Channel channel={channel} thread={thread} threadList>
      <Thread />
    </Channel>
  );
};
export default ThreadScreen;
const styles = StyleSheet.create({});
