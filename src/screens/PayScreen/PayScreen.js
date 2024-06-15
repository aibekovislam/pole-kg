import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Navbar from "../../components/Header/Navbar";
import BottomNavbar from "../../components/bottomNavbar/BottomNavbar";
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/MainCard/Card';
import TimePickerComponent from '../../components/DateTimePicker/TimePickerComponent';
import CalendarSVG from '../../../assets/images/svgs/CalendarSVG';
import Button from '../../components/Button/Button';

export default function PayScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const { field, selectedDate } = route.params;

  return (
    <View style={{ flex: 1, position: "relative", paddingBottom: 100 }}>
      <ScrollView>
        <Navbar />
        <Text style={{ textAlign: "center", fontSize: 20, marginTop: 10 }}>Оплата</Text>
        <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
            <Card field={field} />
        </View>
        <View style={{paddingHorizontal: 15}}>
            <View style={styles.pay_block}>
                <View style={styles.detail_time_picker}>
                {/* <TimePickerComponent payBlocked={true} backgroundColor={"#F0F0F0"} fromTime={fromTime} setFromTime={setFromTime} toTime={toTime} setToTime={setToTime} /> */}
                </View>
                <View style={styles.calendar_block}>
                    <View style={styles.calendar}>
                        <CalendarSVG />
                        <Text style={styles.date}>{ selectedDate }</Text>
                    </View>
                </View>
                <View style={[styles.calendar_block, { backgroundColor: "white", borderWidth: 0.5, borderColor: "#B3B3B3" }]}>
                    <Text style={styles.sum_text}>Сумма на оплату: <Text style={styles.money}>3000 сом</Text></Text>
                </View>
            </View>
        </View>
      </ScrollView>
      <View style={styles.bottomNavbar_block}>
        <Button title={"Оплатить"} />
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
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 20,
    paddingHorizontal: 15
  },
  detail_time_picker: {
    width: "100%"
  },
  pay_block: {
    marginTop: 10,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 15
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
  }
});