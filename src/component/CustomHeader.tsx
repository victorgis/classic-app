import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { RFValue } from "react-native-responsive-fontsize";

const CustomHeader = ({ name }: { name: string }) => {
  return (
    <View style={styles.headerContainer}>
      <Link href="/(home)/homepage">
        <MaterialIcons name="arrow-back" size={24} style={styles.icon} />
      </Link>
      <Text style={styles.title}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    paddingHorizontal: RFValue(30),
    backgroundColor: "#fff",
    position: "relative",
    marginVertical: RFValue(20)
  },
  icon: {
    position: "absolute",
    left: 10,
    zIndex: 1,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CustomHeader;
