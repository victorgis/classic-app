import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";

const staticImg = require("../../assets/images/avatar.png");

export default function ProfileImage({ profileUrl }: { profileUrl: string }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <Image
        source={{ uri: profileUrl }}
        style={[styles.image, !isImageLoaded && styles.hiddenImage]}
        onLoad={() => setIsImageLoaded(true)}
        onError={() => setIsImageLoaded(false)} // Fallback to staticImg on error
      />

      {/* Fallback Static Image */}
      {!isImageLoaded && <Image source={staticImg} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 25,
    height: 25,
    borderRadius: 20,
    overflow: "hidden", // Ensure images stay within rounded corners
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  hiddenImage: {
    display: "none", // Hide the image until it loads
  },
});
