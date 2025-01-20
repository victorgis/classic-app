import {
  StyleSheet,
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const staticImg1 = require("../../../../assets/images/avatar1.png");
const staticImg2 = require("../../../../assets/images/avatar2.png");
const staticImg3 = require("../../../../assets/images/avatar3.png");

const insightsData = [
  {
    id: "1",
    text: "Lorem Ipsum has been the industry's standard dummy text ever since the...",
    image: staticImg1,
    date: new Date("2023-01-01"),
  },
  {
    id: "2",
    text: "Lorem Ipsum has been the industry's standard dummy text ever since the...",
    image: staticImg2,
    date: new Date("2023-01-01"),
  },
  {
    id: "3",
    text: "Lorem Ipsum has been the industry's standard dummy text ever since the...",
    image: staticImg3,
    date: new Date("2023-01-01"),
  },
];

const InsightItem = ({ item, onPress }) => {
  // Format the date for better display
  const formattedDate = item.date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <TouchableOpacity
      onPress={() => onPress(item.id)}
      style={styles.insightContainer}
    >
      <Image source={item.image} style={styles.insightImage} />
      <View style={styles.textContainer}>
        <Text style={styles.insightText}>{item.text}</Text>
        <Text style={styles.dateText}>{formattedDate}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function Notifications() {
  // Handle item press
  const handlePress = (id) => {
    console.log("Item clicked: ", id);
    // Perform any action when an item is pressed, e.g., navigate or open modal
  };

  return (
    <FlatList
      data={insightsData}
      renderItem={({ item }) => (
        <InsightItem item={item} onPress={handlePress} />
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
    flexDirection: "row", // Arrange image and text horizontally
    alignItems: "flex-start", // Align items to the start (top)
    padding: 14,
    shadowColor: "#262626",
    marginBottom: RFValue(10), // Add spacing between items
    backgroundColor: "#f9f9f9", // Add a subtle background color to each item
    borderRadius: RFValue(8), // Rounded corners for the container
  },
  insightImage: {
    width: RFValue(40),
    height: RFValue(40),
    marginRight: RFValue(12),
    borderRadius: RFValue(20),
  },
  textContainer: {
    flex: 1, // Take up the remaining space for the text
  },
  insightText: {
    fontSize: RFValue(14),
    color: "#333",
    lineHeight: RFValue(20),
    marginBottom: RFValue(4), // Space between the text and the date
  },
  dateText: {
    fontSize: RFValue(10),
    color: "#999", // Lighter color for the date
  },
});
