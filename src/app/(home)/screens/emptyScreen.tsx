import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList, Switch } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export default function EmptyScreen() {
  const [data, setData] = useState();

  

  return (
    <View></View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: RFValue(10),
    paddingVertical: RFValue(10),
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: RFValue(20),
  },
  insightContainer: {
    flexDirection: "row", // Arrange text and toggle horizontally
    alignItems: "center", // Align items to the center
    padding: RFValue(14),
    shadowColor: "#262626",
    marginBottom: RFValue(10), // Add spacing between items
    backgroundColor: "#f9f9f9", // Add a subtle background color to each item
    borderRadius: RFValue(8), // Rounded corners for the container
  },
  textLeft: {
    flex: 1, // Take up the remaining space for the text
  },
  textRight: {
    marginLeft: RFValue(10),
  },
  insightText: {
    fontSize: RFValue(14),
    color: "#333",
    lineHeight: RFValue(20),
    marginBottom: RFValue(4), // Space between the text and the date
  },
  dateText: {
    fontSize: RFValue(10),
    color: "#999", // Lighter color for the text
  },
});
