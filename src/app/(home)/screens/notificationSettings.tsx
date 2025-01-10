import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList, Switch } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const insightsData = [
  {
    id: "1",
    heading: "Message notification",
    text: "Show notification for new messages",
    toggle: false,
  },
  {
    id: "2",
    heading: "Show reaction notification",
    text: "Show notifications for reactions",
    toggle: false,
  },
];

const InsightItem = ({ item, onToggle }) => {
  return (
    <View style={styles.insightContainer}>
      <View style={styles.textLeft}>
        <Text style={styles.insightText}>{item.heading}</Text>
        <Text style={styles.dateText}>{item.text}</Text>
      </View>
      <View style={styles.textRight}>
        <Switch
          value={item.toggle}
          onValueChange={(value) => onToggle(item.id, value)}
        />
      </View>
    </View>
  );
};

export default function NotificationSettings() {
  const [data, setData] = useState(insightsData);

  const handleToggle = (id, value) => {
    console.log(`Toggle for item ${id}: ${value}`);
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, toggle: value } : item
      )
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <InsightItem item={item} onToggle={handleToggle} />
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    />
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
