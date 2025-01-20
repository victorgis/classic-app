import { Alert, Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const APP_STORE_URL = "https://play.google.com/store/apps?hl=en"; // Replace with your app's App Store URL
const FIRST_USE_KEY = "appFirstUseDate";
const LAST_PROMPT_KEY = "lastRatingPrompt";

export const checkAndPromptForRating = async () => {
  const today = new Date();

  try {
    // Get stored dates
    const firstUseDate = await AsyncStorage.getItem(FIRST_USE_KEY);
    const lastPromptDate = await AsyncStorage.getItem(LAST_PROMPT_KEY);

    if (!firstUseDate) {
      // Store the first use date if not set
      await AsyncStorage.setItem(FIRST_USE_KEY, today.toISOString());
      return; // Exit, since it's the first day of use
    }

    const firstUse = new Date(firstUseDate);
    const lastPrompt = lastPromptDate ? new Date(lastPromptDate) : null;

    // Calculate days since first use and last prompt
    const daysSinceFirstUse = Math.floor(
      (today - firstUse) / (1000 * 60 * 60 * 24)
    );
    const daysSinceLastPrompt = lastPrompt
      ? Math.floor((today - lastPrompt) / (1000 * 60 * 60 * 24))
      : null;

    // Conditions for prompting the user
    const shouldPrompt =
      (daysSinceFirstUse >= 3 && !lastPrompt) || // 3 days after first use
      (daysSinceLastPrompt && daysSinceLastPrompt >= 365); // 365 days since last prompt

    if (shouldPrompt) {
      // Show the rating alert
      Alert.alert(
        "Enjoying the app?",
        "We'd love to hear your feedback! Please rate us on the App Store.",
        [
          { text: "Not Now", style: "cancel" },
          {
            text: "Rate Now",
            onPress: () => {
              Linking.openURL(APP_STORE_URL);
            },
          },
        ]
      );

      // Update the last prompt date
      await AsyncStorage.setItem(LAST_PROMPT_KEY, today.toISOString());
    }
  } catch (error) {
    console.error("Error checking or prompting for app rating:", error);
  }
};
