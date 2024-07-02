import React, { useEffect } from 'react'
import { View, ScrollView, Text, StyleSheet, Image } from 'react-native'
import Navbar from '../../components/Header/Navbar'
import BookingCard from '../../components/MainCard/BookingCard'
import { useFonts } from 'expo-font'
import BottomNavbar from '../../components/bottomNavbar/BottomNavbar'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBookings } from '../../redux/slices/bookings/bookingSlice'

function BookingScreen({ navigation }) {
  const bookings = useSelector((state => state.bookings.bookings));
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

  console.log(bookings)
  return (
    <View style={{ position: "relative" }}>
        <ScrollView>
            <Navbar />
            <View style={styles.container}>
              <View style={styles.booking}>
                <Text style={styles.booking_text}>Мои брони</Text>
              </View>
              <View style={[styles.cards, { paddingBottom: 100 }]}>
                <BookingCard/>
                <BookingCard/>
                <BookingCard/>
                <BookingCard/>
                <BookingCard/>
                <BookingCard/>
                <BookingCard/>
                <BookingCard/>
                <BookingCard/>
                <BookingCard/>
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