import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  AppState,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { supabase } from "../../lib/supabase";
import { Button, Input } from "@rneui/themed";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
// import { CheckBox } from "react-native-elements";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Redirect, router } from "expo-router";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function ForgottenPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const backImg = require("../../../assets/images/authPaper.png");
  const logo = require("../../../assets/images/logo.png");
  const footer = require("../../../assets/images/footer.png");

  async function forgottenPasswordWithEmail() {
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "classic-app://resetPassword", // Update this URL to match your deep link
    });

    setLoading(false);
    // console.log("email", email)

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      // router.push("/(auth)/enterResetToken")
      router.push({
        pathname: "/screens/enterResetToken", // Adjust to your actual reset password screen route
      });
      Alert.alert(
        "Success",
        "Password reset token has been sent to your email."
      );
    }
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
            <View>
              <Text
                style={{
                  fontSize: RFValue(24),
                  fontWeight: "700",
                  color: "#303030",
                }}
              >
                Forgotten Password
              </Text>
              <Text style={{ color: "#8C8C8C", marginVertical: RFValue(5) }}>
                Please enter your email address
              </Text>

              <View style={[{ marginTop: RFValue(30) }]}>
                <Input
                  // label="Email"
                  // leftIcon={{ type: "font-awesome", name: "envelope" }}
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  placeholder="email@address.com"
                  autoCapitalize={"none"}
                />
              </View>
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
                {"  "}Only registered users will get a reset link
              </Text>
            </View>

            <View style={[{ marginTop: RFValue(20) }]}>
              <TouchableOpacity
                //   disabled={!isChecked || loading}
                onPress={forgottenPasswordWithEmail}
                style={[styles.button, { backgroundColor: "#6E00FF" }]}
              >
                <Text
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    alignSelf: "center",
                    justifyContent: "center",
                    fontWeight: "700",
                  }}
                >
                  {!loading ? (
                    "Reset Password"
                  ) : (
                    <ActivityIndicator color={"#fff"} />
                  )}
                </Text>
              </TouchableOpacity>
            </View>
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
                <TouchableOpacity onPress={() => router.push("/screens/login")}>
                  <Text style={{ textDecorationLine: "underline" }}>Login</Text>
                </TouchableOpacity>
                {"     |    "}
                <TouchableOpacity
                  onPress={() => router.push("/screens/signup")}
                >
                  <Text style={{ textDecorationLine: "underline" }}>
                    Create Account
                  </Text>
                </TouchableOpacity>
              </Text>
            </View>
          </View>
        </View>
        {/* </ScrollView> */}
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
  formPart: {
    backgroundColor: "#fff",
    padding: RFValue(20),
    borderRadius: RFValue(25),
    width: "100%",
  },
  formTitle: {
    fontSize: RFValue(24),
    fontWeight: "700",
    color: "#303030",
  },
  formSubtitle: {
    color: "#8C8C8C",
    marginVertical: RFValue(5),
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: RFValue(16),
  },
  checkbox: {
    margin: 0,
    padding: 0,
  },
  checkboxText: {
    color: "#555",
    fontSize: RFValue(12),
  },
  underlineText: {
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: "#6E00FF",
    padding: RFValue(10),
    width: RFValue(150),
    borderRadius: RFValue(8),
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },
  footer: {
    marginTop: RFValue(20),
    borderTopWidth: 1,
    borderTopColor: "#E7E7E7",
    paddingTop: RFValue(10),
    alignItems: "center",
  },
  footerText: {
    textAlign: "center",
  },
});
