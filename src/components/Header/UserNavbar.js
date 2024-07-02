import React from 'react';
import { StyleSheet, Text, View, Platform, Image } from 'react-native';
import { useFonts } from 'expo-font';

export default function UserNavbar() {
  const [fontsLoaded] = useFonts({
    'Rubik-400': require("../../../assets/fonts/Rubik-Regular.ttf"),
    'Rubik-500': require("../../../assets/fonts/Rubik-Medium.ttf"),
  });

  return (
    <View style={[styles.safeArea]}>
      <View style={styles.navbar}>
        <View style={styles.container}>
          <View style={styles.navbar_flex}>
            <View style={styles.navbar_flex_row}>
                <Image source={{ uri: "https://tse1.mm.bing.net/th/id/OET.7252da000e8341b2ba1fb61c275c1f30?w=594&h=594&c=7&rs=1&o=5&pid=1.9" }} style={styles.avatar} />
            </View>
            <View style={styles.navbar_flex_row_text}>
              <Text style={{ fontSize: 20, fontWeight: "500", fontFamily: "Rubik-500", color: "#ffffff" }} >Ислам</Text>
              <Text style={{ fontSize: 16, fontWeight: "500", fontFamily: "Rubik-500", color: "#ffffff" }} >+996 706 91 61 65</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#237133',
    paddingTop: Platform.OS === 'android' ? 0 : 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  container: {
    flex: 1,
    borderRadius: 20,
  },
  navbar: {
    backgroundColor: '#237133',
    paddingTop: 15,
    paddingHorizontal: 15,
    paddingBottom: 15,
    width: "100%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  navbar_flex: {
    flexDirection: "row",
    backgroundColor: "#237133",
    alignItems: "center",
    columnGap: 20
  },
  navbar_flex_row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#237133"
  },
  navbar_flex_row_text: {
    flexDirection: "column",
    backgroundColor: "#237133",
    rowGap: 5
  },
  navbar_title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#ffffff",
    fontFamily: "Rubik-500",
    width: "90%"
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 100
  }
});