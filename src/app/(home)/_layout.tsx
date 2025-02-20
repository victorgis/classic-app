import { Redirect, Slot, Stack } from "expo-router";
import { ActivityIndicator, StyleSheet } from "react-native";
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
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="homepage"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="screens/profile"
            options={{ headerShown: true, title: "Profile" }}
          />
          <Stack.Screen
            name="screens/notifications"
            options={{ headerShown: true, title: "Notification" }}
          />
          <Stack.Screen
            name="screens/privacypolicy"
            options={{ headerShown: true, title: "Privacy Policy" }}
          />
          <Stack.Screen
            name="screens/termscondition"
            options={{ headerShown: true, title: "Terms & Conditions" }}
          />

          <Stack.Screen
            name="screens/createInterest"
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: "#fff", // Customize background color
              },
              headerTintColor: "#333", // Customize text/icon color
              headerTitleStyle: {
                fontSize: 20,
                fontWeight: "bold",
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
