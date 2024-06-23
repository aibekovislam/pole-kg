import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform, Animated, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Switch } from 'react-native';
import Navbar from "../../components/Header/Navbar";
import BottomNavbar from "../../components/bottomNavbar/BottomNavbar";
import Button from '../../components/Button/Button';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import TimePickerComponent from '../../components/DateTimePicker/TimePickerComponent';
import MapSVG from '../../../assets/images/svgs/MapSVG';
import { formatSlot } from '../../helpers/format';

export default function FilterScreen({ navigation }) {
  const translateX = useRef(new Animated.Value(0)).current;
  const [reviewText, setReviewText] = useState('');
  const [ choosed_slot, set_choosed_slot ] = useState(null);
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const handle_choose_slot = (slot) => {
    if (choosed_slot === slot) {
        set_choosed_slot(null);
    } else {
        set_choosed_slot(slot);
        console.log(choosed_slot)
    }
}; 

  const [fontsLoaded] = useFonts({
    'Rubik-400': require("../../../assets/fonts/Rubik-Regular.ttf"),
    'Rubik-500': require("../../../assets/fonts/Rubik-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const onHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END && nativeEvent.translationX > 50) {
      navigation.goBack();
    }
  };

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );  

  const data = {
    "availability": [
        {
          "start_time": "2024-06-23T09:00:00Z",
          "end_time": "2024-06-23T10:00:00Z",
          "available": true
        },
        {
          "start_time": "2024-06-23T10:00:00Z",
          "end_time": "2024-06-23T11:00:00Z",
          "available": true
        },
        {
          "start_time": "2024-06-23T11:00:00Z",
          "end_time": "2024-06-23T12:00:00Z",
          "available": true
        },
        {
          "start_time": "2024-06-23T12:00:00Z",
          "end_time": "2024-06-23T13:00:00Z",
          "available": true
        },
        {
          "start_time": "2024-06-23T13:00:00Z",
          "end_time": "2024-06-23T14:00:00Z",
          "available": true
        },
        {
          "start_time": "2024-06-23T14:00:00Z",
          "end_time": "2024-06-23T15:00:00Z",
          "available": true
        },
        {
          "start_time": "2024-06-23T15:00:00Z",
          "end_time": "2024-06-23T16:00:00Z",
          "available": true
        },
        {
          "start_time": "2024-06-23T16:00:00Z",
          "end_time": "2024-06-23T17:00:00Z",
          "available": true
        }
    ]
  }

  const content = (
    <View style={{ height: "100%" }}>
      <ScrollView>
        <Navbar onPress={() => navigation.navigate('Home')} filterShow={true} />
        <Text style={{ textAlign: "left", fontSize: 20, marginTop: 10, paddingHorizontal: 15, fontFamily: "Rubik-400" }}>Фильтры</Text>
        <View style={{paddingHorizontal: 15}}>
            <TimePickerComponent  />
            <View style={{ marginTop: 10 }}>
                <Text style={{ fontSize: 14, fontFamily: "Rubik-400" }}>Адрес</Text>
                <View style={styles.review_input}>
                    <View style={styles.container_review}>
                        <View style={styles.leftSection}>
                            <MapSVG />
                            <TextInput
                                style={styles.input_review}
                                onChangeText={setReviewText}
                                value={reviewText}
                                placeholder="Киевская 59, Школа им.А.Канимаетова"
                                multiline
                            />
                        </View>
                    </View>
                </View>  
            </View>
            <View style={{ marginTop: 20 }}>
                <Text>Размеры поля</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap", columnGap: 5, rowGap: 6, marginTop: 10 }}>
                    { data?.availability.map((free_slot, index) => (
                        <TouchableOpacity onPress={() => handle_choose_slot(free_slot)} style={[ choosed_slot === free_slot ? styles.slot : styles.not_choosed_slot ]} key={index}>
                            <Text style={[ choosed_slot === free_slot ? styles.slot_text : styles.not_choosed_slot_text ]}>{ formatSlot(free_slot.start_time, free_slot.end_time) }</Text>
                        </TouchableOpacity>
                    )) }
                 </View>
            </View>
            <View style={{ marginTop: 20 }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                     <Text>Показать только свободные поля</Text>
                     <Switch
                        trackColor={{ false: "#767577", true: "#69B479" }}
                        thumbColor={isEnabled ? "#237133" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
            </View>
        </View>
      </ScrollView>
      <View style={styles.bottomNavbar_block}>
        <Button title={"Применить"} onPress={() => navigation.navigate('Home')} />
        <BottomNavbar navigation={navigation} item={"home"} />
      </View>
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <GestureHandlerRootView style={{ flex: 1, position: "relative", paddingBottom: 160 }}>
        {Platform.OS === 'ios' ? (
            <PanGestureHandler onGestureEvent={onGestureEvent} onHandlerStateChange={onHandlerStateChange}>
            <Animated.View style={{ transform: [{ translateX }] }}>
                {content}
            </Animated.View>
            </PanGestureHandler>
        ) : (
            content
        )}
        </GestureHandlerRootView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  pay_block: {
    marginTop: 10,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 15
  },
  detail_time_picker: {
    width: "100%"
  },
  calendar_block: {
    borderRadius: 20,
    width: "100%",
    backgroundColor: "#F0F0F0",
    marginTop: 10,
    height: 50,
    paddingLeft: 15,
    justifyContent: "center"
  },
  calendar: {
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
  },
  date: {
    fontWeight: "700"
  },
  sum_text: {
    fontSize: 14,
    color: "#828282",
    fontWeight: "700"
  },
  money: {
    fontSize: 14,
    color: "black",
    fontWeight: "700"
  },
  time_buttons: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  time_button: {
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    width: '47%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15,
    fontWeight: '700',
  },
  time: {
    fontWeight: "700",
    fontSize: 15
  },
  container_review: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
    marginTop: 5,
    height: 60,
    width: "100%"
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
    color: '#777777',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 1
  },
  bottomNavbar_block: {
    width: "100%",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    position: "absolute",
    top: '100%',
    paddingHorizontal: 15,
    rowGap: 10
  },
  input_review: {
    paddingHorizontal: 10
  },
  slot: {
    alignSelf: "flex-start",
    paddingVertical: '1.5%',
    paddingHorizontal: 10,
    backgroundColor: "#237133",
    borderRadius: 100,

    borderWidth: 1,
    borderColor: "#237133"
    },
    slot_text: {
        color: "#ffffff",
        fontSize: 12,
        fontFamily: "Rubik-400"
    },
    not_choosed_slot_text: {
        color: "#237133",
        fontSize: 12,
        fontFamily: "Rubik-500"
    },
    not_choosed_slot: {
        alignSelf: "flex-start",
        paddingVertical: '1.5%',
        paddingHorizontal: 10,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: "#237133"
    },
 });