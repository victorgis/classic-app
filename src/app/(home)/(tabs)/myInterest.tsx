import { Link, Redirect, Stack, router } from "expo-router";
import { ChannelList } from "stream-chat-expo";
import { useAuth } from "../../../providers/AuthProvider";
import { FontAwesome5 } from "@expo/vector-icons";
import CustomHeader from "@/src/component/CustomHeader";

export default function MyInterestChannelsScreen() {
  const { user } = useAuth();
  const userID = user.id;
  const filter = {
    // last_message_at: { $exists: true },
    members: { $in: [userID] },
  };

  return (
    <>
      {/* <CustomHeader name="My Interests" /> */}
      <ChannelList
        filters={filter}
        onSelect={(channel) => router.push(`/channel/${channel.cid}`)}
      />
    </>
  );
}
