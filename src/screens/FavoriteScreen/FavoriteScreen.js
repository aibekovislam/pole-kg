import React, { useEffect } from 'react'
import { View, ScrollView, Text, StyleSheet, Image } from 'react-native'
import Navbar from '../../components/Header/Navbar'
import { useFonts } from 'expo-font'
import Button from '../../components/Button/Button'
import BottomNavbar from '../../components/bottomNavbar/BottomNavbar'
import MainCard from '../../components/MainCard/MainCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSavedFields } from '../../redux/slices/fields/fieldSlice'

function FavoriteScreen({ navigation }) {
    const dispatch = useDispatch();
    const savedFields = useSelector((state => state.fields.savedFields));

    console.log(savedFields);

    useEffect(() => {
        dispatch(fetchSavedFields())
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
        <View style={{ position: "relative", height: "100%" }}>
            <ScrollView>
                <Navbar />
                <View style={styles.container}>
                <View style={styles.booking}>
                    <Text style={styles.booking_text}>Избранное</Text>
                </View>
                <View style={[styles.cards, { paddingBottom: 100 }]}>
                    { savedFields.map((field, index) => (
                        <MainCard field={field} onPress={handlePress} key={index} isFavorite={true} />
                    )) }
                    { savedFields.length === 0 ? (
                      <View style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center"}}>
                        <Text style={{ fontFamily: "Rubik-500", fontSize: 18, textAlign: "center" }}>Пока пусто</Text>
                      </View>
                    ) : (null) }
                </View>
                </View>
            </ScrollView>
            <View style={styles.bottom_navbar}>
                { savedFields.length === 0 ? (
                  <Button title='Выбрать поле' onPress={() => navigation.navigate('Home', { isFiltered: false })} />
                ) : (null) }
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