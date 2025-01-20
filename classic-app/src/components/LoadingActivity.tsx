import { View, Text, Animated, StyleSheet, Image } from "react-native";
import { useEffect, useState, useRef } from "react";

const profileUrl = require("../../assets/images/logo.png");

const LoadingActivity = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current; // Initial scale
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2, // Scale up
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1, // Scale back down
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.overlay}>
      <Animated.Image
        source={profileUrl}
        style={[styles.image, { transform: [{ scale: scaleAnim }] }]}
      />
    </View>
  );
};
export default LoadingActivity;
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(255, 255, 255)", // Optional for dimming effect
  },

  image: {
    width: 50,
    height: 50,
  },
});
