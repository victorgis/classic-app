import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  AppState,
  ImageBackground,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { CodeField, Cursor } from "react-native-confirmation-code-field";
import { supabase } from "@/src/lib/supabase";
import { useEffect } from "react";



export default function EnterResetToken() {

  const backImg = require("../../../assets/images/authPaper.png");
  const logo = require("../../../assets/images/logo.png");
  // const { email } = useLocalSearchParams();


  // // useEffect(() => {
  //     const verifyOtp = async () => {
  //       if (email && token) {
  //         const {
  //           data: { session },
  //           error,
  //         } = await supabase.auth.verifyOtp({
  //           email: email,
  //           token: 12345,
  //           type: "recovery",
  //         });
    
  //         if (error) {
  //           console.error("OTP verification failed:", error);
  //           Alert.alert("Error", "Failed to verify OTP.");
  //         } else {
  //           // setUsersession(session);
  //           if (session) {
  //             console.log("session", session)
  //             setAccess_token(session.access_token);
  //             setRefresh_token(session.refresh_token);
  //           }
  //         }
  //       }
  //     };
    
      
  //   // }, [email, token]);

  

  // const handleNavigateToResetPassword = () => {

  //   if (token?.length === 6) {
  //     verifyOtp();




 
  //     acess_token ? router.push({ pathname: "/(auth)/resetPassword", params: { acess_token, refresh_token } }) : null
  //   } else {
  //     Alert.alert("Invalid Token", "Please enter the full 6-digit token.");
  //   }
  // };






  return (
    <ImageBackground
      source={backImg}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
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
        <View style={[styles.formPart]}>
          <Text style={{fontSize: RFValue(14)}}>Kindly check your email for a reset link. Also check your spam folders if you haven't found it</Text>
          <ActivityIndicator color={"#fff"} style={{alignSelf: "center"}} />
          {/* <TouchableOpacity onPress={()=>router.back()} ><Text style={{fontSize: RFValue(14), fontWeight: "600", paddingTop: RFValue(20)}}> <MaterialIcons name="arrow-back" size={14} /> Go back</Text></TouchableOpacity> */}
          {/* <View style={[styles.verticallySpaced]}>
            <Text
              style={{
                fontSize: RFValue(24),
                fontWeight: "700",
                color: "#303030",
              }}
            >
              Enter Reset Token
            </Text>
            <Text style={{ color: "#8C8C8C", marginVertical: RFValue(5) }}>
              Please enter the 6-digit token sent to your email.
            </Text>
          </View> */}

          {/* Confirmation Code Field */}
          {/* <CodeField
            value={token}
            onChangeText={setToken}
            cellCount={6}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <View
                key={index}
                style={[
                  styles.cell,
                  isFocused && styles.focusedCell,
                ]}
              >
                <Text style={styles.cellText}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          /> */}


          {/* <View style={[styles.verticallySpaced, { marginTop: RFValue(20) }]}>
            <TouchableOpacity
              onPress={handleNavigateToResetPassword}
              style={[styles.button, { backgroundColor: "#6E00FF" }]}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  alignSelf: "center",
                  fontWeight: "700",
                }}
              >
                {!loading ? "Submit" : <ActivityIndicator />}
              </Text>
            </TouchableOpacity>
          </View> */}
          {/* <View
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
              <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                <Text style={{ textDecorationLine: "underline" }}>
                  Login
                </Text>
              </TouchableOpacity>
              {"     |    "}
              <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
                <Text style={{ textDecorationLine: "underline" }}>
                  Create Account
                </Text>
              </TouchableOpacity>
            </Text>
          </View> */}
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
    paddingTop: 14,
    paddingBottom: 14,
    alignSelf: "stretch",
  },
  formPart: {
    marginTop: RFValue(20),
    backgroundColor: "#fff",
    padding: RFValue(30),
    borderRadius: RFValue(25),
    width: "100%",
  },
  button: {
    color: "#fff",
    padding: RFValue(10),
    width: RFValue(150),
    borderRadius: RFValue(8),
    alignSelf: "center",
  },
  tokenContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: RFValue(20),
  },
  tokenBox: {
    width: RFValue(40),
    height: RFValue(50),
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(5),
  },
  tokenText: {
    fontSize: RFValue(20),
    fontWeight: "600",
    color: "#000",
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    width: 0,
    height: 0,
  },
  codeFieldRoot: {
    marginTop: RFValue(20),
    width: "100%",
    justifyContent: "space-between",
  },
  cell: {
    width: RFValue(40),
    height: RFValue(50),
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(5),
  },
  focusedCell: {
    borderColor: "#6E00FF",
  },
  cellText: {
    fontSize: RFValue(20),
    fontWeight: "600",
    color: "#000",
  },

});
