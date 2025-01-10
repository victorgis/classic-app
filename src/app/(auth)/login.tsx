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
import { ActivityIndicator } from "react-native";

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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const backImg = require("../../../assets/images/authPaper.png");
  const logo = require("../../../assets/images/logo.png");
  const footer = require("../../../assets/images/footer.png");

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert("Error", error.message);
    setLoading(false);
  }

  return (
    <ImageBackground
      source={backImg}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      {/* <ScrollView
        contentContainerStyle={{
          paddingHorizontal: RFValue(20),
          paddingBottom: RFValue(20),
          flexGrow: 1, // Makes content take up remaining space
        }}
      > */}
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            // marginTop: 100,
            top: RFValue(60),
            left: RFValue(20),
            position: "absolute",
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
        {/* <ScrollView
          style={{ maxHeight: RFValue(450) }}
          contentContainerStyle={{
            // paddingHorizontal: RFValue(20),
            // paddingBottom: RFValue(20),
            flexGrow: 1, // Makes content take up remaining space
            justifyContent: "center",
          }}
        > */}
        <View style={[styles.formPart]}>
          <View style={[styles.verticallySpaced]}>
            <Text
              style={{
                fontSize: RFValue(24),
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
                // label="Email"
                // leftIcon={{ type: "font-awesome", name: "envelope" }}
                onChangeText={(text) => setEmail(text)}
                value={email}
                placeholder="email@address.com"
                autoCapitalize={"none"}
              />
            </View>
          </View>
          <View>
            <Input
              // label="Password"
              // leftIcon={{ type: "font-awesome", name: "lock" }}
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
              placeholder="Password"
              autoCapitalize={"none"}
            />
          </View>
          <TouchableOpacity
            onPress={() => router.push("/(auth)/forgottenPassword")}
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

          <View style={[styles.verticallySpaced, { marginTop: RFValue(20) }]}>
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
                {!loading ? "Sign In" : <ActivityIndicator color={"#fff"} />}
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
              onPress={() => router.push("/(auth)/signup")}
              style={{
                paddingTop: RFValue(10),
                alignSelf: "center",
              }}
            >
              Don’t have an account yet?{" "}
              <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
                <Text style={{ textDecorationLine: "underline" }}>
                  Create Account
                </Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
        {/* </ScrollView> */}
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: RFValue(40),
          alignSelf: "center",
        }}
      >
        <View>
          <Image source={footer} />
        </View>
        <View style={{ marginLeft: 20 }}>
          <Text
            style={{
              marginBottom: RFValue(5),
              fontWeight: "700",
              fontSize: RFValue(15),
            }}
          >
            Explore Your Interests
          </Text>
          <Text>
            <Ionicons name="hand-right-outline" size={14} color="black" />
            Hey there, login to discover interests
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10),
    marginHorizontal: RFValue(5),
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
  },
});
