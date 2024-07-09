import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform, Animated, TouchableOpacity, Switch } from 'react-native';
import Navbar from "../../components/Header/Navbar";
import BottomNavbar from "../../components/bottomNavbar/BottomNavbar";
import Button from '../../components/Button/Button';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch, useSelector } from 'react-redux';
import { fetchFields, fetchFilterFields } from '../../redux/slices/fields/fieldSlice';

export default function FilterScreen({ navigation }) {
  const dispatch = useDispatch();
  const fields = useSelector((state => state.fields.fieldsForFilter))

  useEffect(() => {
    dispatch(fetchFilterFields())
  }, [dispatch])

  const formatTime = (date) => {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  const translateX = useRef(new Animated.Value(0)).current;
  const [choosed_slot, set_choosed_slot] = useState(null);
  const [isEnabled, setIsEnabled] = useState(true);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [fromTime, setFromTime] = useState(new Date());
  const [toTime, setToTime] = useState(new Date());
  const [fromTimeString, setFromTimeString] = useState(formatTime(new Date()));
  const [toTimeString, setToTimeString] = useState(formatTime(new Date()));

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const handle_choose_slot = (slot) => {
    if (choosed_slot === slot) {
      set_choosed_slot(undefined);
    } else {
      set_choosed_slot(slot);
    }
  };

  const handleClick = () => {
    dispatch(fetchFields({
      length: choosed_slot ? choosed_slot.length : undefined,
      width: choosed_slot ? choosed_slot.width : undefined,
      start_time: fromTimeString,
      end_time: toTimeString
    }))
    navigation.navigate('Home', { isFiltered: true })
  }

  const showFromTimePicker = () => {
    setShowFromPicker(true);
  };

  const hideFromTimePicker = () => {
    setShowFromPicker(false);
  };

  const handleFromTimeConfirm = (date) => {
    const formattedTime = formatTime(date);
    setFromTime(date);
    setFromTimeString(formattedTime);
    hideFromTimePicker();
  };  

  const showToTimePicker = () => {
    setShowToPicker(true);
  };

  const hideToTimePicker = () => {
    setShowToPicker(false);
  };

  const handleToTimeConfirm = (date) => {
    const formattedTime = formatTime(date);
    setToTime(date);
    setToTimeString(formattedTime);
    hideToTimePicker();
  };  

  const [fontsLoaded] = useFonts({
    'Rubik-400': require("../../../assets/fonts/Rubik-Regular.ttf"),
    'Rubik-500': require("../../../assets/fonts/Rubik-Medium.ttf"),
    'Rubik-700': require("../../../assets/fonts/Rubik-Bold.ttf")
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

  const content = (
    <View style={{ position: "relative", height: "80%" }}>
      <ScrollView>
        <Navbar onPress={() => navigation.navigate('Home')} filterShow={true} />
        <Text style={{ textAlign: "left", fontSize: 20, marginTop: 10, paddingHorizontal: 15, fontFamily: "Rubik-400" }}>Фильтры</Text>
        <View style={{ paddingHorizontal: 15 }}>
          <View style={[styles.timePickerRow, { marginTop: 15 }]}>
            <TouchableOpacity style={[styles.timeButton]} onPress={showFromTimePicker}>
              <Text style={{ fontSize: 12, fontWeight: "400", fontFamily: "Rubik-400", color: "#828282" }}>Время начала</Text>
              <Text style={styles.timeButton_text}>{`с ${fromTimeString}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.timeButton]} onPress={showToTimePicker}>
              <Text style={{ fontSize: 12, fontWeight: "400", fontFamily: "Rubik-400", color: "#828282" }}>Время конца</Text>
              <Text style={styles.timeButton_text}>{`до ${toTimeString}`}</Text>
            </TouchableOpacity>
          </View>

          <DateTimePickerModal
            isVisible={showFromPicker}
            mode="time"
            display="spinner"
            locale="ru"
            is24Hour={true}
            onConfirm={handleFromTimeConfirm}
            onCancel={hideFromTimePicker}
            buttonTextColorIOS="#237133"
            isDarkModeEnabled={false}
            textColor='#237133'
            minuteInterval={30}
          />
          <DateTimePickerModal
            isVisible={showToPicker}
            mode="time"
            display="spinner"
            locale="ru"
            is24Hour={true}
            onConfirm={handleToTimeConfirm}
            onCancel={hideToTimePicker}
            buttonTextColorIOS="#237133"
            isDarkModeEnabled={false}
            textColor='#237133'
            minuteInterval={30}
          />
          <View style={{ marginTop: 20 }}>
            <Text>Размеры поля</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", columnGap: 5, rowGap: 6, marginTop: 15 }}>
              {
                fields.map((field, index) => (
                  <TouchableOpacity
                    onPress={() => handle_choose_slot(field)}
                    style={[choosed_slot === field ? styles.slot : styles.not_choosed_slot]}
                    key={index}
                  >
                    <Text style={[choosed_slot === field ? styles.slot_text : styles.not_choosed_slot_text]}>
                      {field.length + 'x' + field.width}
                    </Text>
                  </TouchableOpacity>
                ))                
              }
            </View>
          </View>
          {/* <View style={{ marginTop: 20 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={{ fontSize: 14, fontFamily: "Rubik-400" }}>Показать только <Text style={{ color: "#2F80ED" }}>свободные поля</Text></Text>
              <Switch
                trackColor={{ false: '#767577', true: '#237133' }}
                thumbColor={isEnabled ? '#fff' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View> */}
        </View>
      </ScrollView>
      <View style={styles.bottomNavbar_block}>
        <Button title={"Применить"} onPress={() => handleClick()} />
        <BottomNavbar navigation={navigation} item={"home"} />
      </View>
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler onHandlerStateChange={onHandlerStateChange} onGestureEvent={onGestureEvent}>
        <Animated.View style={{ flex: 1 }}>
          {content}
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
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
    label: {
      fontSize: 16,
      marginBottom: 10,
      textAlign: 'left',
      width: '100%',
      marginTop: 10,
    },
    timePickerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    timeButton: {
      backgroundColor: '#ffffff',
      borderRadius: 20,
      width: '47%',
      height: 50,
      justifyContent: 'center',
      paddingHorizontal: 15,
      paddingVertical: 0
    },
    timeButton_text: {
      fontSize: 15,
      color: '#237133',
      fontFamily: "Rubik-700"
    },
 });