import React from 'react';
import { StyleSheet, Text, TextInput, View, Platform, TouchableOpacity } from 'react-native';
import NotificationSVG from '../../../assets/images/svgs/Notification';
import FilterSVG from '../../../assets/images/svgs/FilterSVG';
import { useFonts } from 'expo-font';

export default function Navbar({ onPress, filterShow }) {

  const [fontsLoaded] = useFonts({
    'Rubik-500': require("../../../assets/fonts/Rubik-Medium.ttf"),
  });

  return (
    <View style={[styles.safeArea]}>
      <View style={styles.navbar}>
        <View style={styles.container}>
          <View style={styles.navbar_flex}>
            <View style={styles.navbar_flex_row}>
              <Text style={styles.navbar_title}>Pole.kg</Text>
              <View style={styles.notification_block}>
                <NotificationSVG style={styles.notification_svg} />
              </View>
            </View>
            <View style={styles.navbar_flex_row}>
              <TextInput placeholderTextColor={"gray"} style={[styles.input, filterShow ? {} : {width: "100%"}]} placeholder="Поиск" />
              { filterShow ? (
                <TouchableOpacity onPress={() => onPress()}>
                  <FilterSVG/>
                </TouchableOpacity>
              ) : (null) }
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#237133',
    paddingTop: Platform.OS === 'android' ? 40 : 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  container: {
    flex: 1,
    borderRadius: 20,
  },
  navbar: {
    backgroundColor: '#237133',
    padding: 15,
    width: "100%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  navbar_flex: {
    flexDirection: "column",
    rowGap: 15,
    backgroundColor: "#237133"
  },
  navbar_flex_row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#237133"
  },
  navbar_title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#ffffff",
    fontFamily: "Rubik-500",
    width: "90%"
  },
  notification_block: {
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10
  },
  notification_svg: {
    width: 36,
    height: 36
  },
  input: {
    width: "90%",
    height: 40,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    paddingLeft: 15
  }
});