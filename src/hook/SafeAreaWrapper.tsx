import React from "react";
import { Platform, StatusBar, ViewStyle, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface SafeAreaWrapperProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const SafeAreaWrapper: React.FC<SafeAreaWrapperProps> = ({
  children,
  style,
}) => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="#fff"
        barStyle="dark-content" // Use "light-content" if you want the status bar text to be light
      />
      <SafeAreaView
        edges={["top", "left", "right"]}
        style={[
          { flex: 1 },
          // Platform.OS === "android"
          //   ? { paddingTop: StatusBar.currentHeight }
          //   : {},
          style,
          {backgroundColor: "#fff"}
        ]}
      >
        {children}
      </SafeAreaView>
    </>
  );
};

export default SafeAreaWrapper;
