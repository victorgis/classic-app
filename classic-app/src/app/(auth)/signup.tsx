import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  AppState,
  ImageBackground,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { supabase } from "../../lib/supabase";
import { Input } from "@rneui/themed";
import { RFValue } from "react-native-responsive-fontsize";
import { CheckBox } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { router, Redirect } from "expo-router";
import { useEffect } from "react";
import * as Linking from "expo-linking";
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

export default function SignUp() {
  const { session } = useAuth();
  if (session) return <Redirect href={"/(auth)/login"} />;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const backImg = require("../../../assets/images/authPaper.png");
  const logo = require("../../../assets/images/logo.png");

  useEffect(() => {
    // Listen for deeplink events
    const handleDeeplink = ({ url }: any) => {
      const parsed = Linking.parse(url);
      if (parsed.path === "login") {
        Alert.alert("Email Verified", "Your email has been confirmed!");
        router.replace("/login");
      }
    };

    const subscription = Linking.addEventListener("url", handleDeeplink);
    return () => subscription.remove();
  }, []);

  async function signUpWithEmail() {
    if (!email || !password || !isChecked) {
      Alert.alert("Error", "Please fill all fields and accept the terms.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: "classic-app://screens/login", // Deeplink for verification
        },
      });

      if (error) throw error;

      Alert.alert(
        "Success",
        "Check your email for a verification link. Once verified, you can log in!"
      );
    } catch (error: any) {
      Alert.alert("Error", error.message);
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
        <View style={styles.container}>
          <View style={{ alignSelf: "stretch" }}>
            <View style={styles.header}>
              <Image source={logo} />
              <Text style={styles.logoText}>Classic App</Text>
            </View>
          </View>

          <View style={styles.formPart}>
            <Text style={styles.formTitle}>Create Account</Text>
            <Text style={styles.formSubtitle}>Please enter your details</Text>

            <Input
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="email@address.com"
              autoCapitalize="none"
            />

            <Input
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
              placeholder="Password"
              autoCapitalize="none"
            />

            <View style={styles.checkboxContainer}>
              <CheckBox
                checked={isChecked}
                onPress={() => setIsChecked(!isChecked)}
                containerStyle={styles.checkbox}
              />
              <Text style={styles.checkboxText}>
                By signing up, you agree to our
                <Text style={styles.underlineText}> Terms & Conditions</Text>
              </Text>
            </View>

            <TouchableOpacity
              disabled={!isChecked || loading}
              onPress={signUpWithEmail}
              style={[
                styles.button,
                {
                  backgroundColor: !isChecked ? "#ccc" : "#6E00FF",
                  marginTop: RFValue(20),
                },
              ]}
            >
              <Text style={styles.buttonText}>
                {loading ? <ActivityIndicator color="#fff" /> : "Sign Up"}
              </Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Already have an account?{" "}
                <TouchableOpacity onPress={() => router.push("/login")}>
                  <Text style={styles.underlineText}>Login</Text>
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
