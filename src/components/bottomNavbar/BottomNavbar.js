import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import HomeSVG from '../../../assets/images/svgs/HomeSVG';
import OrderSVG from '../../../assets/images/svgs/OrderSVG';
import FavoriteSVG from '../../../assets/images/svgs/FavoriteSVG';
import ProfileSVG from '../../../assets/images/svgs/ProfileSVG';

const BottomNavbar = ({ item, navigation }) => {
  return (
    <View style={styles.bottomNavbar}>
      <View style={styles.navigation}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.navigation__item}>
          <HomeSVG/>
          <Text style={[styles.navigation__text, item === 'home' && styles.main_text]}>Главная</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Booking')} style={styles.navigation__item}>
          <OrderSVG/>
          <Text style={[styles.navigation__text, item === 'booking' && styles.main_text]}>Брони</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Favorite')} style={styles.navigation__item}>
          <FavoriteSVG/>
          <Text style={[styles.navigation__text, item === 'favorite' && styles.main_text]}>Избранные</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.navigation__item}>
          <ProfileSVG/>
          <Text style={[styles.navigation__text, item === 'profile' && styles.main_text]}>Профиль</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  main_text: {
    fontWeight: "600"
  },
  bottomNavbar: {
    width: "100%",
    height: 70,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "#B3B3B3"
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  navigation__item: {
    width: 70,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 5,
    marginTop: 10
  },
  navigation__text: {
    fontSize: 12
  }
});

export default BottomNavbar