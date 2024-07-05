import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import Navbar from "../../components/Header/Navbar";
import MainCard from "../../components/MainCard/MainCard";
import BottomNavbar from "../../components/bottomNavbar/BottomNavbar";
import ListOrMap from '../../components/ListOrMap/ListOrMap';
import HomeMap from '../../components/map/HomeMap';

export default function MapScreen({ navigation, route }) {
  const { fields } = route.params || [];
  const [ selected, setSelected ] = useState('map');

  useEffect(() => {
    if (selected === 'list') {
      navigation.navigate('Home', { isFiltered: false });
    }
  }, [selected]);

  return (
    <View style={{ flex: 1, position: "relative", width: "100%" }}>
      <ScrollView>
        <Navbar onPress={() => navigation.navigate('Filter', { fields })} filterShow={true} />
        <View style={{ position: "absolute", zIndex: 2, top: "13%", left: "7%"}}>
          <ListOrMap selected={selected} setSelected={setSelected} />
        </View>
        <View style={styles.map_block}>
          <HomeMap fields={fields} navigation={navigation} />
        </View>
      </ScrollView>
      <View style={styles.bottomNavbar_block}>
        <BottomNavbar navigation={navigation} item={"home"} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNavbar_block: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "none",
    position: "absolute",
    bottom: 20,
    paddingHorizontal: 15
  },
  map_block: {
    flex: 1,
    zIndex: 1,
    height: Dimensions.get('window').height
  }
});