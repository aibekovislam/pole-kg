import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.error(e);
    }
}
  
export const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      }
    } catch (e) {
      console.error(e);
    }
}  

export const getToken = async (key) => {
  try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
          return JSON.parse(value);
      }
  } catch (e) {
      console.error(e);
  }
  return null;
};


export const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('AsyncStorage has been cleared');
  } catch (error) {
    console.error('Error clearing AsyncStorage: ', error);
  }
};