import { Link, Redirect, Stack, router } from "expo-router";
import { ChannelList } from "stream-chat-expo";
import { useAuth } from "../../../providers/AuthProvider";
import { FontAwesome5 } from "@expo/vector-icons";

export default function MainTabScreen() {
  const { user } = useAuth();
  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Link href={"/(home)/users"} asChild>
              <FontAwesome5
                name="users"
                size={22}
                color="gray"
                style={{ marginHorizontal: 15 }}
              />
            </Link>
          ),
        }}
      />
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Link href={"/(home)/channelScreen"} asChild>
              <FontAwesome5
                name="users"
                size={22}
                color="gray"
                style={{ marginHorizontal: 15 }}
              />
            </Link>
          ),
        }}
      />
      <ChannelList
        // filters={{ members: { $in: [user.id] } }}
        filters={{
          cid: {
            $in: [
              "messaging:classic-app-oj6pmgasy",
              "messaging:enesi",
              "messaging:channel_id2",
              "messaging:channel_id",
              "messaging:!members-Y9SlPavAIH58v_nqHxXoFWpqGP07A-QLpeRWuba5qxE",
            ],
          },
        }}
        onSelect={(channel) => router.push(`/channel/${channel.cid}`)}
      />
    </>
  );
}
