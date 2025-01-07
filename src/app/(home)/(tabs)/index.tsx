import { router } from "expo-router";
import { ChannelList } from "stream-chat-expo";
import { useAuth } from "../../../providers/AuthProvider";
import CustomHeader from "@/src/component/CustomHeader";

export default function AllChannelsScreen() {
  const { user } = useAuth();
  const userID = user.id;
  const filter = {}; // Example filter for channels with the user as a member.

  return (
    <>
      {/* <CustomHeader name="Interests" /> */}

      <ChannelList
        filters={filter}
        onSelect={(channel) => router.push(`/channel/${channel.cid}`)}
      />
    </>
  );
}
