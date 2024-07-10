import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Platform, TouchableOpacity } from 'react-native';
import NotificationSVG from '../../../assets/images/svgs/Notification';
import FilterSVG from '../../../assets/images/svgs/FilterSVG';
import { useFonts } from 'expo-font';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchFields } from '../../redux/slices/fields/fieldSlice';
import { useNavigation } from '@react-navigation/native';

export default function Navbar({ onPress, filterShow }) {
  const [search_text, setSearch_text] = useState('');
  const [ changing, setChanging ] = useState(false);
  const fields = useSelector(state => state.fields.searchFields);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  useEffect(() => {
      if (search_text) {
          dispatch(fetchSearchFields({ search_filters: search_text }));
      }
  }, [dispatch, search_text]);

  const onChangeText = (text) => {
    setSearch_text(text);
    setChanging(true);
  };

  const [fontsLoaded] = useFonts({
    'Rubik-400': require("../../../assets/fonts/Rubik-Regular.ttf"),
  });

  return (
    <View style={[styles.safeArea, changing ? { paddingBottom: 15 } : {}]}>
      <View style={styles.navbar}>
        <View style={styles.container}>
          <View style={styles.navbar_flex}>
            <View style={styles.navbar_flex_row}>
              <Text style={styles.navbar_title}>Pole.kg</Text>
              <View style={styles.notification_block}>
                <NotificationSVG style={styles.notification_svg} />
              </View>
            </View>
            <View style={styles.navbar_flex_row}>
              <TextInput
                placeholderTextColor={"gray"}
                style={[styles.input, filterShow ? {} : { width: "100%" }]}
                placeholder="Поиск"
                onChangeText={onChangeText}
                value={search_text}
              />
              {filterShow ? (
                <TouchableOpacity onPress={() => onPress()}>
                  <FilterSVG />
                </TouchableOpacity>
              ) : (null)}
            </View>
          </View>
        </View>
      </View>
      { changing ? (
        <View style={{ paddingHorizontal: 15 }}>
          <View style={styles.search_result}>
            { fields.map((field, index) => (
              <TouchableOpacity onPress={() => {
                setChanging(false)
                setSearch_text('')
                navigation.navigate('Detail', { id: field.id })
              }} key={index} style={{ backgroundColor: index % 2 !== 0 ? "#F0F0F0" : "#ffffff", height: 35, width: "100%", justifyContent: "center", paddingHorizontal: 15, borderRadius: 6, }}>
                <Text style={styles.search_text}>{ field.name }</Text>
              </TouchableOpacity>
            )) }
          </View>
        </View>
      ) : (null) }
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#237133',
    paddingTop: Platform.OS === 'android' ? 10 : 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  container: {
    flex: 1,
    borderRadius: 20,
  },
  navbar: {
    backgroundColor: '#237133',
    paddingTop: 15,
    paddingHorizontal: 15,
    paddingBottom: 15,
    width: "100%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  navbar_flex: {
    flexDirection: "column",
    rowGap: 15,
    backgroundColor: "#237133"
  },
  navbar_flex_row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#237133"
  },
  navbar_title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#ffffff",
    fontFamily: "Rubik-500",
    width: "90%"
  },
  notification_block: {
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10
  },
  notification_svg: {
    width: 36,
    height: 36
  },
  input: {
    width: "90%",
    height: 40,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    paddingLeft: 15
  },
  search_result: {
    maxHeight: 110,
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 6,
  },
  search_text: {
    fontSize: 14,
    color: "#828282",
    fontFamily: "Rubik-400"
  }
});