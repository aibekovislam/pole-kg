import React, { useCallback, useEffect, useState } from 'react'
import { View, ScrollView, Text, StyleSheet, Image, RefreshControl, Platform } from 'react-native'
import Navbar from '../../components/Header/Navbar'
import BookingCard from '../../components/MainCard/BookingCard'
import { useFonts } from 'expo-font'
import BottomNavbar from '../../components/bottomNavbar/BottomNavbar'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBookings } from '../../redux/slices/bookings/bookingSlice'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

function BookingScreen({ navigation }) {
  const bookings = useSelector((state => state.bookings.bookings));
  const [user, setUser] = useState(null);

  const getUser = async () => {
    const resultUser = await AsyncStorage.getItem('userInfo');
    if (resultUser) {
      const parsedUser = JSON.parse(resultUser);
      setUser(parsedUser);
    }
  };

  useFocusEffect(
    useCallback(() => {
        getUser();
    }, [])
  );

  const dispatch = useDispatch();

  const [fontsLoaded] = useFonts({
    'Rubik-500': require("../../../assets/fonts/Rubik-Medium.ttf"),
  });

  useEffect(() => {
    dispatch(fetchBookings())
  }, [dispatch])

  if (!fontsLoaded) {
    return null;
  }

  const [refreshing, setRefreshing] = useState(false); 

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(fetchBookings())
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={{ position: "relative", height: "100%" }}>
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#9Bd35A', '#689F38']} 
            tintColor={'#689F38'}
            progressBackgroundColor="#FFFFFF"
            style={Platform.OS === 'android' ? { backgroundColor: '#689F38' } : {}}
          />
        }>
            <Navbar />
            <View style={styles.container}>
              <View style={styles.booking}>
                <Text style={styles.booking_text}>Мои брони</Text>
              </View>
              <View style={[styles.cards, { paddingBottom: 100 }]}>
                { bookings.map((item, index) => (
                  <BookingCard key={index} data={item} user={user} />
                )) }
              </View>
            </View>
        </ScrollView>
        <View style={styles.bottom_navbar}>
          <BottomNavbar navigation={navigation} item={"booking"} />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15
  },
  booking_text: {
    textAlign: "left",
    fontFamily: "Rubik-500"
  },
  booking: {
    marginTop: 10,
    marginBottom: 10
  },
  cards: {
    rowGap: 10
  },
  bottom_navbar: {
    width: "100%",
    position: "absolute",
    height: "auto",
    bottom: 20,
    rowGap: 10,
    paddingHorizontal: 15,
  },
})

export default BookingScreen