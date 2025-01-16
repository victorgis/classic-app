import CryptoJS from "react-native-crypto-js";

const encryptionKey = "shared-secret-key";
export const decryptMessage = (encryptedText: any) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedText, encryptionKey);
      const originalText = bytes.toString(CryptoJS.enc.Utf8);
      return originalText || encryptedText; // Return original text if decryption is successful, else fallback to encrypted text
    } catch (error) {
      console.error("Error decrypting message:", error);
      return encryptedText; // Fallback in case of an error
    }
  };