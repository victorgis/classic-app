import { Redirect, Slot, Stack } from "expo-router";
import { StyleSheet } from "react-native";
import ChatProvider from "../../providers/ChatProvider";
import { useAuth } from "@/src/providers/AuthProvider";
import SafeAreaWrapper from "@/src/hook/SafeAreaWrapper";
import CustomHeader from "@/src/component/CustomHeader";
import { MaterialIcons } from "@expo/vector-icons";

const HomeLayout: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href={"/(auth)/login"} />;
  }

  return (
    <SafeAreaWrapper>
      <ChatProvider>
        <Stack>
          <Stack.Screen
            name="homepage"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="channel"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="screens/profile"
            options={{
              headerShown: true,
              title: "Profile",
              headerBackTitle: "back",
            }}
          />
          <Stack.Screen
            name="screens/notifications"
            options={{ headerShown: true, title: "Notification" }}
          />
          <Stack.Screen
            name="screens/notificationSettings"
            options={{ headerShown: true, title: "Manage Notification" }}
          />
          <Stack.Screen
            name="screens/changePassword"
            options={{ headerShown: true, title: "Change Password" }}
          />
          <Stack.Screen
            name="screens/privacypolicy"
            options={{ headerShown: true, title: "Privacy Policy" }}
          />
          <Stack.Screen
            name="screens/ModeratorInInterest"
            options={{ headerShown: true, title: "Moderator in interest" }}
          />
          <Stack.Screen
            name="screens/BlockedList"
            options={{ headerShown: true, title: "Blocked List" }}
          />
          <Stack.Screen
            name="screens/termscondition"
            options={{
              headerShown: true,
              title: "Terms & Conditions",
              headerBackTitle: "back",
            }}
          />

          <Stack.Screen
            name="screens/createInterest"
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: "#fff", // Customize background color
              },
              // headerTintColor: "#333", // Customize text/icon color
              headerTitleStyle: {
                // fontSize: 20,
                // fontWeight: "bold",
                // padding: 34
              },
              headerTitle: "Create Interest", // Custom title
              // headerRight: () => (
              //   <MaterialIcons
              //     name="add"
              //     size={24}
              //     style={{ marginRight: 10 }}
              //     onPress={() => console.log("Add pressed")}
              //   />
              // ),
            }}
          />
        </Stack>
        {/* <Slot /> */}
      </ChatProvider>
    </SafeAreaWrapper>
  );
};

export default HomeLayout;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
