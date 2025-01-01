import { Redirect, Tabs } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const TabsLayout: React.FC = () => {
  //   const { session, mounting } = useAuth();
  //   if (mounting) return <ActivityIndicator />;
  //   if (!session) return <Redirect href="/auth" />;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#003249",
        tabBarInactiveTintColor: "grey",
        tabBarLabelStyle: { fontSize: 10 },
        tabBarStyle: { backgroundColor: "#fff" },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="home"
              size={24}
              style={{
                color: focused ? "#003249" : "gray",
                transform: [{ scale: focused ? 1.2 : 1 }],
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="settings"
              size={24}
              style={{
                color: focused ? "#003249" : "gray",
                transform: [{ scale: focused ? 1.2 : 1 }],
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
