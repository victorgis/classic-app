import React from "react";
import {
  useMessageInputContext,
  ImageUploadPreview,
  FileUploadPreview,
} from "stream-chat-expo";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useChatContext } from "stream-chat-expo";
import { useLocalSearchParams } from "expo-router";
import CryptoJS from "react-native-crypto-js";

const CustomInput = () => {
  const { cid } = useLocalSearchParams<{ cid: string }>();
  const encryptionKey = "shared-secret-key";
  const {
    text,
    sendMessage,
    setText,
    toggleAttachmentPicker,
    openCommandsPicker,
  } = useMessageInputContext();
  const { client } = useChatContext();

  const handleSendCustomMessage = () => {
    if (!text) return;

    console.log("text1", text);
    console.log("cid1", cid);

    // Process the message here if needed (e.g., encryption)
    const processedMessage = text.trim();

    const handleSendMessage = async (messageText: string) => {
      try {
        console.log("messageText", messageText); // Ensure this is executed

        // Query the channels
        const channels = await client.queryChannels({ cid });
        if (channels.length === 0) {
          console.error("No channels found for the provided CID");
          return;
        }

        const channel = channels[0];

        // Encrypt the message using react-native-crypto-js
        const encryptedMessage = CryptoJS.AES.encrypt(
          messageText,
          encryptionKey
        ).toString();

        // Send the encrypted message
        const response = await channel.sendMessage({ text: encryptedMessage });

        // console.log("Message sent successfully:", response.message.text);
      } catch (error) {
        console.error("Error in handleSendMessage:", error);
      }
    };

    handleSendMessage(processedMessage);

    // Send the message
    // sendMessage({ text: processedMessage });

    // Clear the input after sending
    setText("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      {/* Image and File Previews */}
      <ImageUploadPreview />
      <FileUploadPreview />

      <View style={styles.inputRow}>
        {/* Attachment Icon */}
        <TouchableOpacity onPress={toggleAttachmentPicker} style={styles.icon}>
          <Ionicons name="attach-outline" size={24} color="#7B7B7B" />
        </TouchableOpacity>

        {/* Text Input */}
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          placeholderTextColor="#A9A9A9"
          value={text}
          onChangeText={setText}
        />

        {/* Commands Icon */}
        <TouchableOpacity onPress={openCommandsPicker} style={styles.icon}>
          <MaterialIcons name="add-box" size={24} color="#7B7B7B" />
        </TouchableOpacity>

        {/* Send Icon */}
        <TouchableOpacity
          onPress={handleSendCustomMessage}
          style={[styles.icon, text ? styles.activeSend : null]}
          disabled={!text}
        >
          <Ionicons
            name="send"
            size={24}
            color={text ? "#1D72F3" : "#BEBEBE"}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 8,
    borderTopWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#FFF",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 25,
    paddingHorizontal: 12,
    // paddingVertical: 8,
    width: "100%",
  },
  icon: {
    padding: 8,
  },
  activeSend: {
    backgroundColor: "#E6F4FF",
    borderRadius: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 8,
    color: "#333",
  },
});

export default CustomInput;
