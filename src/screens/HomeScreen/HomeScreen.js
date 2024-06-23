import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Navbar from "../../components/Header/Navbar";
import MainCard from "../../components/MainCard/MainCard";
import BottomNavbar from "../../components/bottomNavbar/BottomNavbar";
import { useDispatch, useSelector } from 'react-redux';
import { fetchFields } from '../../redux/slices/fields/fieldSlice';
import ListOrMap from '../../components/ListOrMap/ListOrMap';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const fields = useSelector(state => state.fields.fields);

  useEffect(() => {
    dispatch(fetchFields())
  }, [dispatch]);

  const handlePress = (id) => {
    navigation.navigate('Detail', { id });
  };

  return (
    <View style={{ flex: 1, position: "relative", paddingBottom: 100 }}>
      <ScrollView>
        <Navbar onPress={() => navigation.navigate('Filter')} filterShow={true} />
        <ListOrMap />
        <View style={styles.card_list}>
          {fields.map((field, index) => (
            <MainCard key={index} field={field} onPress={() => handlePress(field.id)} />
          ))}
        </View>
      </ScrollView>
      <View style={styles.bottomNavbar_block}>
        <BottomNavbar navigation={navigation} item={"home"} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card_list: {
    width: "100%",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    rowGap: 15
  },
  bottomNavbar_block: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "none",
    position: "absolute",
    bottom: 20,
    paddingHorizontal: 15
  }
});