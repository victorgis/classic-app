import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function getOrGenerateUniqueName() {
  const storageKey = "uniqueUserName";

  try {
    // Check if a unique name already exists in local storage
    const existingName = await AsyncStorage.getItem(storageKey);

    if (existingName) {
      // Return the existing name if it exists
      return existingName;
    }

    // Generate a new unique name
    const randomString = Math.random().toString(36).substring(2, 8); // 6 random characters
    const timestamp = Date.now().toString(36); // Convert timestamp to base 36
    const uniqueName = `${randomString}${timestamp}`;

    // Save the new unique name to local storage
    await AsyncStorage.setItem(storageKey, uniqueName);

    return uniqueName;
  } catch (error) {
    console.error("Error generating or retrieving unique name:", error);
    throw error;
  }
}

// Usage
(async () => {
  const userName = await getOrGenerateUniqueName();
  console.log("Unique User Name:", userName);
})();
