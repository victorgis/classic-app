import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  AppState,
  ImageBackground,
  Dimensions,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { supabase } from "../../lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import { Input } from "@rneui/themed";
import { router, Redirect } from "expo-router";
import { ActivityIndicator } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useAuth } from "../../providers/AuthProvider";

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

export default function Login() {
  const { session } = useAuth();
  if (session) return <Redirect href={"/(home)/chat"} />;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginSession, setLoginSession] = useState(false);

  const backImg = require("../../../assets/images/authPaper.png");
  const logo = require("../../../assets/images/logo.png");
  const footer = require("../../../assets/images/footer.png");

  async function signInWithEmail() {
    if (!email || !password) {
      Alert.alert("Error", "Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) throw error;
      router.replace("/chat");
    } catch (error: any) {
      Alert.alert("Login Failed", error.message);
    } finally {
      setLoading(false);
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
        {/* <ScrollView
        contentContainerStyle={{
          paddingHorizontal: RFValue(20),
          paddingBottom: RFValue(20),
          flexGrow: 1, // Makes content take up remaining space
        }}
      > */}
        <View style={styles.container}>
          <View style={[styles.part]}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                // justifyContent: "center",
                marginBottom: RFValue(60),
                // top: RFValue(60),
                // left: RFValue(20),
                // position: "absolute",
              }}
            >
              <Image source={logo} />
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "600",
                  fontSize: RFValue(14),
                  marginLeft: 8,
                }}
              >
                Classic App
              </Text>
            </View>
            <View style={styles.formPart}>
              <View style={[styles.verticallySpaced]}>
                <Text
                  style={{
                    fontSize: RFValue(20),
                    fontWeight: "700",
                    color: "#303030",
                  }}
                >
                  Let’s get you in
                </Text>
                <Text style={{ color: "#8C8C8C", marginVertical: RFValue(5) }}>
                  Please enter your email and password
                </Text>

                <View style={[{ marginTop: RFValue(10) }]}>
                  <Input
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    placeholder="email@address.com"
                    autoCapitalize={"none"}
                  />
                </View>
              </View>
              <View>
                <Input
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  secureTextEntry={true}
                  placeholder="Password"
                  autoCapitalize={"none"}
                />
              </View>
              <TouchableOpacity
                onPress={() => router.push("/forgottenPassword")}
              >
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
                  <Text
                    style={[
                      { color: "#555", fontSize: RFValue(12) },
                      { textDecorationLine: "underline" },
                    ]}
                  >
                    {"  "}Forgot Password
                  </Text>
                </View>
              </TouchableOpacity>

              <View
                style={[styles.verticallySpaced, { marginTop: RFValue(20) }]}
              >
                <TouchableOpacity
                  //   disabled={!isChecked || loading}
                  onPress={signInWithEmail}
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
                    {loading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text>Sign In</Text>
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
                  onPress={() => router.push("/signup")}
                  style={{
                    paddingTop: RFValue(10),
                    alignSelf: "center",
                  }}
                >
                  Don’t have an account yet?{" "}
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

          {/* </ScrollView> */}
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
    marginTop: RFValue(30),
    // justifyContent: "center",
    alignItems: "center",
    // padding: RFValue(10),
    marginHorizontal: RFValue(5),
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },

  formPart: {
    // flex: 1,
    backgroundColor: "#fff",
    padding: RFValue(20),
    borderRadius: RFValue(25),
    // maxHeight: 400,
    width: "100%",
  },
  part: {},
  button: {
    backgroundColor: "#6E00FF",
    color: "#fff",
    padding: RFValue(10),
    width: RFValue(150),
    borderRadius: RFValue(8),
    alignSelf: "center",
  },
});
