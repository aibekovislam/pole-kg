import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import BottomNavbar from '../../components/bottomNavbar/BottomNavbar';
import UserNavbar from '../../components/Header/UserNavbar';
import PenSvg from '../../../assets/images/svgs/PenSvg';
import TimeSvg from '../../../assets/images/svgs/TimeSvg';
import ShareSvg from '../../../assets/images/svgs/ShareSvg';
import SettingsSvg from '../../../assets/images/svgs/Settings';
import { useFonts } from 'expo-font';

const ProfileScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'Rubik-400': require("../../../assets/fonts/Rubik-Regular.ttf"),
  });

  return (
    <View style={{ position: "relative" }}>
        <ScrollView style={{paddingBottom: 120}}>
            <UserNavbar/>
            <View style={styles.profile_options_block}>
              <View style={styles.options}>
                <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Patch')}>
                  <PenSvg/>
                  <Text style={{ fontSize: 16, fontFamily: "Rubik-400" }}>Редактировать аккаунт</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                  <TimeSvg/>
                  <Text style={{ fontSize: 16, fontFamily: "Rubik-400" }}>История броней</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                  <ShareSvg/>
                  <Text style={{ fontSize: 16, fontFamily: "Rubik-400" }}>Пригласить друзей</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Settings')}>
                  <SettingsSvg/>
                  <Text style={{ fontSize: 16, fontFamily: "Rubik-400" }}>Настройки</Text>
                </TouchableOpacity>
              </View>
            </View>
        </ScrollView>
        <View style={styles.bottom_navbar}>
            <BottomNavbar navigation={navigation} item={"profile"} />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    bottom_navbar: {
        width: "100%",
        position: "absolute",
        height: "auto",
        bottom: 20,
        rowGap: 10,
        paddingHorizontal: 15,
    },
    profile_options_block: {
      flex: 1,
      width: "100%",
      paddingHorizontal: 15,
      marginTop: 10
    },
    options: {
      width: "100%",
      height: 625,
      backgroundColor: "#ffffff",
      borderRadius: 20,
      paddingHorizontal: 15,
    },
    option: {
      flexDirection: "row",
      columnGap: 10,
      width: "100%",
      borderBottomWidth: 1,
      borderBottomColor: "#B3B3B3",
      paddingVertical: 20,
      alignItems: "center"
    }
});

export default ProfileScreen;