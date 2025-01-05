// import { RFValue } from "react-native-responsive-fontsize";
// import {
//   StyleSheet,
//   Image,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   ViewBase,
// } from "react-native";
// import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import { useEffect, useState } from "react";
// import { ChannelList } from "stream-chat-expo";
// import { Link, router } from "expo-router";
// import MainTabScreen from "./(tabs)";
// // import Indexs from "../(home)/(tabs)/index"
// // import { StreamChat } from "stream-chat";
// // const client = StreamChat.getInstance("dwfrzvgbasbd");

// const MainScreen = () => {
//   const [activeTab, setActiveTab] = useState("Tab1");

//   const staticImg = require("../../../assets/images/avatar.png");
//   const renderContent = () => {
//     if (activeTab === "Tab1") {
//       return (
//         <>
//           {/* <MainTabScreen /> */}
//           {/* <Indexs /> */}
//         </>
//       );
//     } else if (activeTab === "Tab2") {
//       return (
//         <>
//           <MainTabScreen />
//         </>
//       );
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Top menu section */}
//       <View style={styles.topMenuContainer}>
//         <View style={styles.topMenuLeft}>
//           <Link href={'/(home)/screens/profile'}>
//             <Image
//               source={staticImg}
//               style={{ width: 25, height: 25, borderRadius: 20 }}
//             />
//           </Link>
//         </View>
//         <View style={styles.topMenuRight}>
//           <View style={{ paddingLeft: RFValue(20) }}>
//             <MaterialIcons name="search" size={RFValue(20)} />
//           </View>
//           <View style={{ paddingLeft: RFValue(20) }}>
//             <Ionicons name="notifications-outline" size={RFValue(17)} />
//           </View>
//           <View style={{ paddingLeft: RFValue(20) }}>
//             <Ionicons name="ellipsis-vertical" size={RFValue(17)} />
//           </View>
//         </View>
//       </View>

//       {/* Add button section  */}
//       <View style={styles.addButton}>
//         <MaterialIcons name="add-circle" color={"#6E00FF"} size={RFValue(50)} />
//       </View>

//       {/* Hidden search box section */}
//       <View style={styles.searchMenuContainer}>
//         <View style={styles.searchContainer}>
//           <MaterialIcons
//             name="search"
//             size={20}
//             color="#888"
//             style={styles.searchIcon}
//           />
//           <TextInput
//             style={styles.textInput}
//             placeholder="Search"
//             placeholderTextColor="#888"
//           />
//         </View>
//         <MaterialIcons
//           name="filter-list"
//           size={24}
//           color="#555"
//           style={styles.filterIcon}
//         />
//       </View>

//       {/* Tabs section */}
//       <View style={styles.twoTabs}>
//         <TouchableOpacity
//           style={[styles.tab, activeTab === "Tab1" && styles.activeTab]}
//           onPress={() => setActiveTab("Tab1")}
//         >
//           <Text
//             style={[
//               styles.tabText,
//               activeTab === "Tab1" && { color: "#6E00FF" },
//             ]}
//           >
//             {"   "}My Interests{"   "}
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.tab, activeTab === "Tab2" && styles.activeTab]}
//           onPress={() => setActiveTab("Tab2")}
//         >
//           <Text
//             style={[
//               styles.tabText,
//               activeTab === "Tab2" && { color: "#6E00FF" },
//             ]}
//           >
//             {"   "}Discover{"   "}
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* Rendered Content */}
//       {renderContent()}
//     </View>
//   );
// };
// export default MainScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     paddingHorizontal: RFValue(10),
//     // height: "100%"
//   },
//   topMenuContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: RFValue(5),
//     height: RFValue(45),
//     borderRadius: RFValue(15),
//     marginHorizontal: RFValue(10),
//     marginTop: RFValue(10),
//   },
//   topMenuLeft: { flexDirection: "row", alignItems: "center" },
//   topMenuRight: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   searchMenuContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 10,
//   },
//   searchContainer: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     borderRadius: RFValue(17),
//     borderColor: "#cccccc",
//     borderWidth: RFValue(1),
//     paddingHorizontal: 10,
//   },
//   searchIcon: {
//     marginRight: 8,
//   },
//   textInput: {
//     flex: 1,
//     fontSize: 16,
//     color: "#333",
//     height: RFValue(35),
//   },
//   filterIcon: {
//     marginLeft: 10,
//   },
//   twoTabs: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     borderBottomWidth: 2,
//     borderBottomColor: "#f2f2f2",
//   },
//   tab: {
//     // flex: 1,
//     alignItems: "center",
//     paddingVertical: RFValue(7),
//     // borderBottomWidth: 2,
//     // borderBottomColor: "#f2f2f2",
//   },
//   activeTab: {
//     borderBottomWidth: 2,
//     borderBottomColor: "#6E00FF",
//   },
//   tabText: {
//     fontSize: RFValue(16),
//     color: "#555",
//   },
//   screenContent: {
//     // flex: 1,
//     // alignItems: "center",
//     // justifyContent: "center",
//   },
//   tabContentText: {
//     fontSize: RFValue(18),
//     color: "#333",
//   },
//   addButton: {
//     position: "absolute",
//     right: RFValue(20),
//     bottom: RFValue(70),
//     width: RFValue(60),
//   },
// });
