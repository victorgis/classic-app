import { Link, Redirect, Stack, router } from "expo-router";
import { ChannelList } from "stream-chat-expo";
import { useAuth } from "../../../providers/AuthProvider";

export default function MyInterestChannelsScreen() {
  const { user } = useAuth();
  const userID = user?.id;
  const filter = {
    members: { $in: [userID] },
  };

  return (
    <ChannelList
      filters={filter}
      onSelect={(channel) => {
        console.log("chanelInterest", channel);
        const membIds = Object.values(channel.state.members);
        const memName = channel.data?.created_by;
        const clause1 = channel?.data?.name;
        const clause2 = membIds[0].user?.name;
        const clause3 = channel?.data?.config;

        console.log("memName: ", memName);
        // router.push(`/channel/${channel.cid}`);
        router.push({
          pathname: "/channel/[cid]",
          params: {
            cid: channel.cid,
            name: memName.name,
            online: memName.online,
            lastseen: memName.last_active,
            id: memName.id,
          },
        });
      }}
    />
  );
}
