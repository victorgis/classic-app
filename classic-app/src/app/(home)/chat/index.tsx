import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import {
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Link, router, Redirect } from "expo-router";
import MyInterestChannelsScreen from "./interest";
import AllChannelsScreen from "./discover";
import { useAuth } from "../../../providers/AuthProvider";
import { supabase } from "../../../lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkAndPromptForRating } from "@/utils/feedbackUtil";

const MainScreen = () => {
  const [activeTab, setActiveTab] = useState("Tab1");
  const [showSearch, setShowSearch] = useState(false);
  const { profile, user } = useAuth();
  const [showOptions, setShowOptions] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeButton, setActiveButton] = useState("");
  const [asyncUrl, setAsyncUrl] = useState("");
  const [query, setQuery] = useState("");

  const staticImg = require("../../../../assets/images/logo.png");
  // const profileImg = `https://xqcfakcvarfbtfngawsd.supabase.co/storage/v1/object/public/avatars/${profile.avatar_url}`;
  // const finalUrl = profileImg ? { uri: profileImg || asyncUrl } : staticImg;

  useEffect(() => {
    checkAndPromptForRating();
  }, []);

  if (!user) {
    return <Redirect href={"/(auth)/login"} />;
  }

  // Function to handle the search query
  const handleSearch = (text: string) => {
    setActiveTab("Tab2");
    setQuery(text);
    console.log("Searching for:", text); // Your search logic goes here

    if (text == "") {
      setShowSearch(false);
    }
  };

  // Function to handle when "done" is pressed
  const handleDone = () => {
    handleSearch(query);
    Keyboard.dismiss(); // Dismiss keyboard after "done"
  };

  const loadAvatarFromStorage = async () => {
    // console.log("profile", profileImg);
    try {
      const storedAvatarUrl = await AsyncStorage.getItem("avatarUrl");
      if (storedAvatarUrl) {
        // console.log("errorGuy", storedAvatarUrl);
        setAsyncUrl(storedAvatarUrl); // Set the avatar URL if it exists in AsyncStorage
      }
    } catch (error) {
      console.error("Failed to load avatar from storage", error);
    }
  };
  // loadAvatarFromStorage();

  const showSearchFx = () => {
    if (showSearch == false) setShowSearch(true);
    else setShowSearch(false);
  };

  const notificationsFx = () => {
    router.push("/screens/notifications");
  };

  const optionsFx = () => {
    console.log("options pressed");
    if (showOptions == false) setShowOptions(true);
    else setShowOptions(false);
    setActiveButton(null);
  };

  const privacyFX = () => {
    setActiveButton("privacy");
    router.push("/screens/privacypolicy");
    setShowOptions(false);
  };

  const termsConditionFX = () => {
    setActiveButton("terms");
    router.push("/screens/termscondition");
    setShowOptions(false);
  };

  const logoutFX = async () => {
    setActiveButton("logout");
    await AsyncStorage.clear();
    await supabase.auth.signOut();
    // router.replace("/screens/login")
  };

  const createInterestFx = () => {
    router.push("/screens/createInterest");
  };

  const renderContent = () => {
    if (activeTab === "Tab1") {
      return <MyInterestChannelsScreen />;
    } else if (activeTab === "Tab2") {
      return <AllChannelsScreen searchQuery={query} />;
    }
  };
  return (
    <View style={styles.container}>
      {(showOptions || showSearch || showNotifications) && (
        <TouchableWithoutFeedback
          onPress={() => {
            setShowOptions(false);
            setShowSearch(false);
            setShowNotifications(false);
          }}
        >
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}

      {/* Top menu section */}
      <View style={styles.topMenuContainer}>
        <View style={styles.topMenuLeft}>
          <Link
            // style={{ borderWidth: 2, borderColor: "red",  }}
            href={"/screens/profile"}
          >
            <Image
              source={staticImg}
              style={{
                width: RFValue(40),
                height: RFValue(40),
                borderRadius: RFPercentage(50),
                // borderWidth: 1,
                // borderColor: "#6E00FF",
              }}
            />
          </Link>
        </View>
        <View style={styles.topMenuRight}>
          <TouchableOpacity onPress={showSearchFx}>
            <View style={{ paddingLeft: RFValue(20) }}>
              <MaterialIcons name="search" size={RFValue(20)} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={notificationsFx}>
            <View style={{ paddingLeft: RFValue(20) }}>
              <Ionicons name="notifications-outline" size={RFValue(17)} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={optionsFx}>
            <View style={{ paddingLeft: RFValue(20) }}>
              <Ionicons name="ellipsis-vertical" size={RFValue(17)} />
            </View>
          </TouchableOpacity>

          {showOptions && (
            <View style={styles.options}>
              <TouchableOpacity
                style={[
                  styles.button,
                  activeButton === "privacy" && styles.activeButton,
                ]}
                onPress={privacyFX}
                onPressIn={() => setActiveButton("privacy")} // Change background color on press
                onPressOut={() => setActiveButton(null)} // Reset when press is released
              >
                <Text style={{ paddingVertical: RFValue(8) }}>
                  Privacy Policy
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  activeButton === "terms" && styles.activeButton,
                ]}
                onPress={termsConditionFX}
                onPressIn={() => setActiveButton("terms")}
                onPressOut={() => setActiveButton(null)}
              >
                <Text style={{ paddingVertical: RFValue(8) }}>
                  Terms & Conditions
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  activeButton === "logout" && styles.activeButton,
                ]}
                onPress={logoutFX}
                onPressIn={() => setActiveButton("logout")}
                onPressOut={() => setActiveButton(null)}
              >
                <Text style={{ paddingVertical: RFValue(8) }}>Logout</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Add button section  */}
      <TouchableOpacity style={styles.addButton} onPress={createInterestFx}>
        <MaterialIcons
          name="add-circle"
          color={"#6E00FF"}
          style={{ backgroundColor: "#fff" }}
          size={RFValue(50)}
        />
      </TouchableOpacity>

      {/* Hidden search box section */}
      {showSearch && (
        <KeyboardAvoidingView behavior="padding" style={{ zIndex: 3 }}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
            <View style={styles.searchMenuContainer}>
              <View style={styles.searchContainer}>
                <MaterialIcons
                  name="search"
                  size={20}
                  color="#888"
                  style={styles.searchIcon}
                />

                <TextInput
                  style={styles.textInput}
                  placeholder="Search"
                  placeholderTextColor="#888"
                  value={query}
                  onChangeText={handleSearch} // Fires search query while typing
                  onSubmitEditing={handleDone} // Fires when "done" is pressed
                  returnKeyType="search" // Makes sure "done" is visible as the return key
                />
              </View>
              <MaterialIcons
                name="filter-list"
                size={24}
                color="#6E00FF"
                style={styles.filterIcon}
              />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}

      {/* Tabs section */}
      <View style={styles.twoTabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Tab1" && styles.activeTab]}
          onPress={() => setActiveTab("Tab1")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Tab1" && { color: "#6E00FF" },
            ]}
          >
            {"   "}My Interests{"   "}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Tab2" && styles.activeTab]}
          onPress={() => setActiveTab("Tab2")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Tab2" && { color: "#6E00FF" },
            ]}
          >
            {"   "}Discover{"   "}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Rendered Content */}
      {renderContent()}
    </View>
    //</TouchableWithoutFeedback>
  );
};
export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: RFValue(10),
    // height: "100%"
  },
  topMenuContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: RFValue(5),
    height: RFValue(50),
    borderRadius: RFValue(15),
    marginHorizontal: RFValue(10),
    marginTop: RFValue(10),
  },
  topMenuLeft: { flexDirection: "row", alignItems: "center" },
  topMenuRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchMenuContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: RFValue(17),
    borderColor: "#cccccc",
    borderWidth: RFValue(1),
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    height: RFValue(35),
  },
  filterIcon: {
    marginLeft: 10,
  },
  twoTabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#f2f2f2",
    marginTop: RFValue(15),
  },
  tab: {
    // flex: 1,
    alignItems: "center",
    paddingVertical: RFValue(7),
    // borderBottomWidth: 2,
    // borderBottomColor: "#f2f2f2",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#6E00FF",
  },
  tabText: {
    fontSize: RFValue(16),
    color: "#555",
  },
  screenContent: {},
  tabContentText: {
    fontSize: RFValue(18),
    color: "#333",
  },
  addButton: {
    position: "absolute",
    right: RFValue(20),
    bottom: RFValue(70),
    width: RFValue(60),
    zIndex: 1,
  },
  options: {
    position: "absolute",
    right: RFValue(0),
    top: RFValue(40),
    backgroundColor: "#fff",
    zIndex: 1,
    borderColor: "#262626",
    // padding: RFValue(15),
    paddingVertical: RFValue(8),

    // Shadow for Android
    elevation: 5, // Adjust as needed

    // Shadow for iOS
    shadowColor: "#262626",
    shadowOffset: { width: 0, height: 2 }, // Horizontal and vertical offset
    shadowOpacity: 0.25, // Opacity of the shadow
    shadowRadius: 4,
    borderRadius: 8,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0)",
    zIndex: 1,
  },
  button: {
    backgroundColor: "#fff",
    paddingHorizontal: RFValue(20),
  },
  activeButton: {
    backgroundColor: "rgb(228,207,255)",
  },
});
