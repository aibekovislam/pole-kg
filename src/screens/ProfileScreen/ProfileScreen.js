import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Navbar from '../../components/Header/Navbar';
import BottomNavbar from '../../components/bottomNavbar/BottomNavbar';

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={{ position: "relative" }}>
        <ScrollView style={{paddingBottom: 120}}>
            <Navbar/>
            <Text>profile</Text>
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
});

export default ProfileScreen;