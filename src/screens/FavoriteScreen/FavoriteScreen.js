import React, { useEffect } from 'react'
import { View, ScrollView, Text, StyleSheet, Image } from 'react-native'
import Navbar from '../../components/Header/Navbar'
import Card from '../../components/MainCard/Card'
import MapSVG from '../../../assets/images/svgs/MapSVG'
import SizeSVG from '../../../assets/images/svgs/SizeSVG'
import MoneySVG from '../../../assets/images/svgs/Money'
import BookingCard from '../../components/MainCard/BookingCard'
import { useFonts } from 'expo-font'
import Button from '../../components/Button/Button'
import BottomNavbar from '../../components/bottomNavbar/BottomNavbar'
import MainCard from '../../components/MainCard/MainCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFields } from '../../redux/slices/fields/fieldSlice'

function FavoriteScreen({ navigation }) {
    const dispatch = useDispatch();
    const fields = useSelector(state => state.fields.fields);

    useEffect(() => {
        dispatch(fetchFields())
    }, [dispatch]);

    const handlePress = (id) => {
        navigation.navigate('Detail', { id });
    };

    const [fontsLoaded] = useFonts({
        'Rubik-500': require("../../../assets/fonts/Rubik-Medium.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={{ position: "relative" }}>
            <ScrollView>
                <Navbar />
                <View style={styles.container}>
                <View style={styles.booking}>
                    <Text style={styles.booking_text}>Избранное</Text>
                </View>
                <View style={[styles.cards, { paddingBottom: 100 }]}>
                    { fields.map((field, index) => (
                        <MainCard field={field} onPress={handlePress} key={index} isFavorite={true} />
                    )) }
                </View>
                </View>
            </ScrollView>
            <View style={styles.bottom_navbar}>
                <BottomNavbar navigation={navigation} item={"favorite"} />
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

export default FavoriteScreen