import React, { useRef } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform, Animated } from 'react-native';
import Navbar from "../../components/Header/Navbar";
import BottomNavbar from "../../components/bottomNavbar/BottomNavbar";
import { useDispatch } from 'react-redux';
import Card from '../../components/MainCard/Card';
import CalendarSVG from '../../../assets/images/svgs/CalendarSVG';
import Button from '../../components/Button/Button';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import { toRent } from '../../redux/slices/bookings/bookingSlice';
import { convertTimeStringToJSON, formatSlotEnd, formatSlotStart } from '../../helpers/format';

export default function PayScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const { field, selectedDate, time } = route.params;

  const translateX = useRef(new Animated.Value(0)).current;

  const onHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END && nativeEvent.translationX > 50) {
      navigation.goBack();
    }
  };

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );  


  const handleSubmitPay = (field_id) => {
    // const data = convertTimeStringToJSON(time)
    dispatch(toRent({ 
      start_time: time.start_time,
      end_time: time.end_time,
      field: field_id
    }))
    
    navigation.navigate('Home');
  }

  const startHours = parseInt(formatSlotStart(time.start_time).hours, 10);
  const endHours = parseInt(formatSlotEnd(time.end_time).hours, 10);

  const hoursDiff = endHours - startHours;


  const content = (
    <View style={{ height: "100%" }}>
      <ScrollView>
        <Navbar />
        <Text style={{ textAlign: "center", fontSize: 20, marginTop: 10 }}>Оплата</Text>
        <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
            <Card field={field} />
        </View>
        <View style={{paddingHorizontal: 15}}>
            <View style={styles.pay_block}>
                <View style={styles.detail_time_picker}>
                  <View style={styles.time_buttons}>
                    <View style={styles.time_button}>
                      <View style={{ flexDirection: "row", columnGap: 5 }}>
                        <Text style={[styles.time, {  color: "#828282"}]}>c</Text>
                        <Text style={styles.time}>{ `${formatSlotStart(time.start_time).hours}:${formatSlotStart(time.start_time).minutes}` }</Text>
                      </View>
                    </View>
                    <View style={styles.time_button}>
                        <View style={{ flexDirection: "row", columnGap: 5 }}>
                          <Text style={[styles.time, {  color: "#828282"}]}>до</Text>
                          <Text style={styles.time}>{ `${formatSlotEnd(time.end_time).hours}:${formatSlotEnd(time.end_time).minutes}` }</Text>
                        </View>
                    </View>
                  </View>
                </View>
                <View style={styles.calendar_block}>
                    <View style={styles.calendar}>
                        <CalendarSVG />
                        <Text style={styles.date}>{ selectedDate }</Text>
                    </View>
                </View>
                <View style={[styles.calendar_block, { backgroundColor: "white", borderWidth: 0.5, borderColor: "#B3B3B3" }]}>
                    <Text style={styles.sum_text}>Сумма на оплату: <Text style={styles.money}>{ `${hoursDiff * field.price}` } сом</Text></Text>
                </View>
            </View>
        </View>
      </ScrollView>
      <View style={styles.bottomNavbar_block}>
        <Button title={"Оплатить"} onPress={(() => handleSubmitPay(field.id))} />
        <BottomNavbar navigation={navigation} item={"home"} />
      </View>
    </View>
  );

  return (
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
});