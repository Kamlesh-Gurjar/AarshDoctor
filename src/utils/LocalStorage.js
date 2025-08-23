import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to store a value in local storage
export default class LocalStorage {
  static storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      console.log('Data stored successfully.', key, value);
    } catch (error) {
      console.error('Error storing data:', error);
    }
  };

  static getData = async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value != null) {
        console.log('Data stored successfully,value', value);
        return value;
      } else {
        // Data not found
        // console.log('No data found for the key:', key);
        return null;
      }
    } catch (error) {
      // Error retrieving data
      console.error('Error retrieving data:', error);
      return null;
    }
  };

  static clearAllData = async () => {
    try {
      await AsyncStorage.clear();
      console.log('All data cleared successfully.');
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  };
}
