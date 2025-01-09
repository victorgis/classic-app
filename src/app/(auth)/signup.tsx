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
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";

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

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const backImg = require("../../../assets/images/authPaper.png");
  const logo = require("../../../assets/images/logo.png");
  const footer = require("../../../assets/images/footer.png");

  // async function signInWithEmail() {
  //   setLoading(true);
  //   const { error } = await supabase.auth.signInWithPassword({
  //     email: email,
  //     password: password,
  //   });

  //   if (error) Alert.alert("Error", error.message);
  //   setLoading(false);
  // }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert("Error", error.message);
    if (!session)
      Alert.alert("Success", "Please check your inbox for email verification!");
    setLoading(false);
  }

  return (
    <ImageBackground
      source={backImg}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: RFValue(20),
          paddingBottom: RFValue(20),
          flexGrow: 1, // Makes content take up remaining space
        }}
      >
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
          <View
            style={[styles.formPart, { maxHeight: RFValue(400) }]}
            // contentContainerStyle={{
            //   paddingHorizontal: RFValue(20),
            //   paddingBottom: RFValue(20),
            //   flexGrow: 1, // Makes content take up remaining space
            //   height: RFValue(300)
            // }}
          >
            <View style={[styles.verticallySpaced]}>
              <Text
                style={{
                  fontSize: RFValue(24),
                  fontWeight: "700",
                  color: "#303030",
                }}
              >
                Create Account
              </Text>
              <Text style={{ color: "#8C8C8C", marginVertical: RFValue(5) }}>
                Please enter your details
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
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingRight: RFValue(16),
              }}
            >
              <CheckBox
                checked={isChecked}
                onPress={() => setIsChecked(!isChecked)} // Manage state for the checkbox
                containerStyle={{ margin: 0, padding: 0 }}
              />
              <Text style={{ color: "#555", fontSize: RFValue(12) }}>
                By signing up, you agree to our
                <Text style={{ textDecorationLine: "underline" }}>
                  {" "}
                  Terms & Conditions
                </Text>
              </Text>
            </View>

            <View style={[styles.verticallySpaced, { marginTop: RFValue(20) }]}>
              <TouchableOpacity
                disabled={!isChecked || loading}
                onPress={signUpWithEmail}
                style={[
                  styles.button,
                  { backgroundColor: !isChecked ? "#ccc" : "#6E00FF" },
                ]}
              >
                <Text
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    fontWeight: "700",
                  }}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignSelf: "center",
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
                Already have an account?{" "}
                <Text style={{ textDecorationLine: "underline" }}>Login</Text>
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: RFValue(20),
          }}
        >
          <View>
            <Image source={footer} />
          </View>
          <View style={{ marginLeft: 20 }}>
            <Text style={{marginBottom: RFValue(5), fontWeight: "700", fontSize: RFValue(15)}}>Explore Your Interests</Text>
            <Text>
              <Ionicons name="hand-right-outline" size={14} color="black" />
              Hey there, login to discover interests
            </Text>
          </View>
        </View>
      </ScrollView>
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
