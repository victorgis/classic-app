import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export default function EnterResetToken() {
  const backImg = require("../../../assets/images/authPaper.png");
  const logo = require("../../../assets/images/logo.png");
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
          <Text style={{ fontSize: RFValue(14) }}>
            Kindly check your email for a reset link. Also check your spam
            folders if you haven't found it
          </Text>
          <ActivityIndicator color={"#fff"} style={{ alignSelf: "center" }} />
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
