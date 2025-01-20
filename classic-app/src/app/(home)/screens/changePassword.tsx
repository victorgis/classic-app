import { router } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import { supabase } from "../../../lib/supabase";
import { Ionicons } from "@expo/vector-icons";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New Password and Confirm Password do not match");
      return;
    }
    // Perform password change logic here

    // setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    // setLoading(false);

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      router.replace("/screens/profile");
      Alert.alert("Success", "Password changed successfully!");
    }
    // alert("Password changed successfully!");
  };

  return (
    <View style={styles.container}>
      {/* Current Password */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Current Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your current password"
          secureTextEntry
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
        <TouchableOpacity
          onPress={async () => await supabase.auth.signOut()}
          style={styles.forgotPassword}
        >
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      {/* New Password */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>New Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your new password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
      </View>

      {/* Confirm Password */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm your new password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      {/* Change Password Button */}

      <View style={{ alignSelf: "center" }}>
        <TouchableOpacity onPress={handleChangePassword} style={styles.button}>
          <Ionicons name="checkmark" color={"#fff"} size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: RFValue(20),
    paddingTop: RFValue(40),
  },
  inputContainer: {
    marginBottom: RFValue(20),
  },
  label: {
    fontSize: RFValue(14),
    color: "#333",
    marginBottom: RFValue(5),
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    borderRadius: RFValue(8),
    padding: RFValue(10),
    fontSize: RFValue(14),
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: RFValue(5),
  },
  forgotText: {
    fontSize: RFValue(12),
    color: "#262626",
  },
  button: {
    marginTop: RFValue(30),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1BDB9E",
    borderRadius: RFPercentage(50),
    padding: RFValue(5),
    width: RFValue(50),
    height: RFValue(50),
  },

  buttonText: {
    color: "#fff",
    fontSize: RFValue(16),
    fontWeight: "bold",
  },
});
