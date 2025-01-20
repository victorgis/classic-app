import { StyleSheet, View, Text, ScrollView } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export default function PrivacyPolicy() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Privacy Policy</Text>
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.sectionHeader}>Introduction</Text>
        <Text style={styles.text}>
          We value your privacy and are committed to protecting your personal
          information. This Privacy Policy explains how we collect, use, and
          safeguard your data when you use our app.
        </Text>

        <Text style={styles.sectionHeader}>Information We Collect</Text>
        <Text style={styles.text}>
          - Personal Information: Name, email address, and other information you
          provide during registration.
          {"\n"}- Usage Data: Details about how you use the app, including
          actions performed and preferences set.
        </Text>

        <Text style={styles.sectionHeader}>How We Use Your Information</Text>
        <Text style={styles.text}>
          We use the information collected to:
          {"\n"}- Provide and improve our services.
          {"\n"}- Communicate with you about updates, features, and offers.
          {"\n"}- Ensure compliance with our terms and policies.
        </Text>

        <Text style={styles.sectionHeader}>Sharing Your Information</Text>
        <Text style={styles.text}>
          We do not sell or rent your personal information. We may share your
          information with trusted partners only to provide essential services
          on our behalf, such as payment processing or customer support.
        </Text>

        <Text style={styles.sectionHeader}>Your Rights</Text>
        <Text style={styles.text}>
          You have the right to:
          {"\n"}- Access the personal information we hold about you.
          {"\n"}- Request corrections to your personal data.
          {"\n"}- Delete your account and associated information.
        </Text>

        <Text style={styles.sectionHeader}>Contact Us</Text>
        <Text style={styles.text}>
          If you have any questions or concerns about this Privacy Policy, feel
          free to contact us at privacy@example.com.
        </Text>

        <Text style={styles.text}>
          By using our app, you agree to this Privacy Policy. We reserve the
          right to update this policy as needed. Please review it regularly.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: RFValue(20),
  },
  header: {
    fontSize: RFValue(24),
    fontWeight: "bold",
    marginBottom: RFValue(20),
    textAlign: "center",
    color: "#333",
  },
  contentContainer: {
    flex: 1,
  },
  sectionHeader: {
    fontSize: RFValue(18),
    fontWeight: "600",
    marginVertical: RFValue(10),
    color: "#555",
  },
  text: {
    fontSize: RFValue(14),
    lineHeight: RFValue(20),
    color: "#666",
    marginBottom: RFValue(15),
  },
});
