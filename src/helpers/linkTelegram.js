import { Linking } from "react-native";

export const openTelegramBot = () => {
    const url = 'https://t.me/proverok123123_bot';
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
};  