import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Alert,
  Button,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export default function TermsConditions() {

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.header}>Terms and Conditions</Text>
        <Text style={styles.subHeader}>Last Updated: January 2025</Text>

        <View style={styles.policySection}>
          <Text style={styles.sectionTitle}>Introduction</Text>
          <Text style={styles.sectionText}>
            These terms and conditions outline the rules and regulations for the
            use of our services. By accessing this application, you accept these
            terms. If you do not agree with any part of these terms, please do
            not use our services.
          </Text>
        </View>

        <View style={styles.policySection}>
          <Text style={styles.sectionTitle}>Acceptance of Terms</Text>
          <Text style={styles.sectionText}>
            By using our services, you agree to comply with and be bound by
            these terms and conditions. You represent that you are legally
            capable of entering into a contract.
          </Text>
        </View>

        <View style={styles.policySection}>
          <Text style={styles.sectionTitle}>User Responsibilities</Text>
          <Text style={styles.sectionText}>
            You agree to use the services only for lawful purposes and in a
            manner that does not infringe the rights of, restrict, or inhibit
            the use of this app by any third party. You are responsible for
            maintaining the confidentiality of your account and any activities
            under your account.
          </Text>
        </View>

        <View style={styles.policySection}>
          <Text style={styles.sectionTitle}>Service Availability</Text>
          <Text style={styles.sectionText}>
            We aim to provide uninterrupted services but cannot guarantee that
            the service will always be available without faults, errors, or
            interruptions. We reserve the right to suspend or discontinue any
            part of the service at any time.
          </Text>
        </View>

        <View style={styles.policySection}>
          <Text style={styles.sectionTitle}>Intellectual Property</Text>
          <Text style={styles.sectionText}>
            All content, logos, trademarks, and intellectual property rights
            associated with the app are owned by us or our licensors. You are
            granted a limited license to access and use the app for personal,
            non-commercial use only.
          </Text>
        </View>

        <View style={styles.policySection}>
          <Text style={styles.sectionTitle}>Limitation of Liability</Text>
          <Text style={styles.sectionText}>
            We are not liable for any direct, indirect, incidental, or
            consequential damages arising from the use of this app or any other
            related service. Use the services at your own risk.
          </Text>
        </View>

        <View style={styles.policySection}>
          <Text style={styles.sectionTitle}>Termination</Text>
          <Text style={styles.sectionText}>
            We may suspend or terminate your access to the services at any time,
            without notice, if we believe you have violated any of these terms
            or for any other reason at our discretion.
          </Text>
        </View>

        <View style={styles.policySection}>
          <Text style={styles.sectionTitle}>Changes to the Terms</Text>
          <Text style={styles.sectionText}>
            We may update these terms and conditions from time to time. Any
            changes will be posted on this page, and the revised terms will
            become effective immediately upon posting.
          </Text>
        </View>

        {/* <TouchableOpacity style={styles.acceptButton}> */}
        <Text style={styles.acceptText}>
          By proceeding to use the application, it means that you accept the
          Terms & Conditions of the application.
        </Text>
        {/* </TouchableOpacity> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#fff",
    paddingHorizontal: RFValue(25),
  },
  contentContainer: {
    paddingBottom: 20,
  },
  header: {
    fontSize: RFValue(24),
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: RFValue(14),
    color: "#777",
    marginBottom: 20,
  },
  policySection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: RFValue(18),
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  sectionText: {
    fontSize: RFValue(14),
    color: "#555",
    lineHeight: 22,
    textAlign: "justify",
  },
  acceptButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 20,
  },
  acceptText: {
    fontSize: RFValue(16),
    // color: "#fff",
    fontWeight: "bold",
  },
});
