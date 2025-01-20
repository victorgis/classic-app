import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  AppState,
  ImageBackground,
  Dimensions,
  ScrollView,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { supabase } from "../../lib/supabase";
import { Button, Input } from "@rneui/themed";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { CheckBox } from "react-native-elements";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// onAuthStateChange events with the TOKEN_REFRESHED or SIGNED_OUT event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

type Params = {
  access_token: string;
  refresh_token: string;
};

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { access_token, refresh_token } = useLocalSearchParams<Params>();
  const [sessionInitialized, setSessionInitialized] = useState(false);

  const backImg = require("../../../assets/images/authPaper.png");
  const logo = require("../../../assets/images/logo.png");
  const footer = require("../../../assets/images/footer.png");

  // useEffect(() => {
  //   const handleAppStateChange = (state) => {
  //     if (state === "active") {
  //       supabase.auth.startAutoRefresh();
  //     } else {
  //       supabase.auth.stopAutoRefresh();
  //     }
  //   };

  //   AppState.addEventListener("change", handleAppStateChange);

  //   return () => {
  //     // AppState.removeEventListener("change", handleAppStateChange);
  //     console.log("error that I don't know")
  //   };
  // }, []);

  // Initialize session using access_token
  useEffect(() => {
    const setSession = async () => {
      if (access_token && refresh_token) {
        const { error } = await supabase.auth.setSession({
          access_token: access_token,
          refresh_token: refresh_token, // No refresh token needed for password reset
        });

        if (error) {
          Alert.alert("Error", "Failed to initialize session.");
        } else {
          setSessionInitialized(true);
        }
      } else {
        Alert.alert("Error", "Access token is missing.");
      }
    };

    setSession();
  }, [access_token]);

  const handleResetPassword = async () => {
    if (!password || password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert(
        "Success",
        "Password reset successful! Redirecting to login."
      );
      router.replace("/login");
    }
  };

  // Show a loading message until the session is initialized
  if (!sessionInitialized) {
    return (
      <View style={styles.container}>
        <Text>Initializing...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={backImg}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: RFValue(20),
          paddingBottom: RFValue(20),
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={{ alignSelf: "stretch" }}>
            <View style={styles.header}>
              <Image source={logo} />
              <Text style={styles.logoText}>Classic App</Text>
            </View>
          </View>
          <View style={[styles.formPart]}>
            <View style={[styles.verticallySpaced]}>
              <Text
                style={{
                  fontSize: RFValue(24),
                  fontWeight: "700",
                  color: "#303030",
                }}
              >
                Reset Password
              </Text>
              <Text style={{ color: "#8C8C8C", marginVertical: RFValue(5) }}>
                Please enter your new password
              </Text>

              <TextInput
                style={styles.input}
                placeholder="New Password"
                secureTextEntry
                onChangeText={setPassword}
              />

              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry
                onChangeText={setConfirmPassword}
              />

              <TouchableOpacity
                style={styles.button}
                onPress={handleResetPassword}
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {loading ? "Updating..." : "Reset Password"}
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingRight: RFValue(16),
              }}
            >
              <Ionicons
                name="information-circle-outline"
                size={24}
                color="black"
              />
              {"  "}
              <Text style={{ color: "#555", fontSize: RFValue(12) }}>
                {"  "}Store your password securely
              </Text>
            </View>

            {/* <View style={[styles.verticallySpaced, { marginTop: RFValue(20) }]}>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: "#6E00FF" },
              ]}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontWeight: "700",
                }}
              >
                Confirm Reset
              </Text>
            </TouchableOpacity>
          </View> */}
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: RFValue(15),
                // paddingTop: RFValue(15),
                borderTopWidth: 1,
                borderTopColor: "#E7E7E7",
                width: "100%",
              }}
            >
              <Text
                style={{
                  paddingTop: RFValue(10),
                  alignSelf: "center",
                }}
              >
                <TouchableOpacity onPress={() => router.push("/login")}>
                  <Text style={{ textDecorationLine: "underline" }}>Login</Text>
                </TouchableOpacity>
                {"     |    "}
                <TouchableOpacity
                  onPress={() => router.push("/signup")}
                >
                  <Text style={{ textDecorationLine: "underline" }}>
                    Create Account
                  </Text>
                </TouchableOpacity>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: RFValue(30),
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },

  formPart: {
    // flex:  1,
    backgroundColor: "#fff",
    padding: RFValue(20),
    borderRadius: RFValue(25),
    width: "100%",
  },
  button: {
    backgroundColor: "#6E00FF",
    color: "#fff",
    padding: RFValue(10),
    width: RFValue(150),
    borderRadius: RFValue(8),
    alignSelf: "center",
    marginTop: RFValue(20),
  },
  input: {
    width: RFValue(260),
    borderBottomWidth: RFValue(1),
    borderBottomColor: "#262626",
    padding: 12,
    marginBottom: 16,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 8,
    fontSize: 16,
    color: "#000",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: RFValue(60),
  },
  logoText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: RFValue(14),
    marginLeft: 8,
  },
});
