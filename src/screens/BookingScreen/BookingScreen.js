import React from 'react'
import { View, ScrollView } from 'react-native'
import Navbar from '../../components/Header/Navbar'

function BookingScreen() {
  return (
    <View>
        <ScrollView>
            <Navbar />
        </ScrollView>
    </View>
  )
}

export default BookingScreen