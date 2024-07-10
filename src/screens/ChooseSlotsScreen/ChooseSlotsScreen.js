import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Navbar from '../../components/Header/Navbar';
import CalendarSVG from '../../../assets/images/svgs/CalendarSVG';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useFonts } from 'expo-font';
import Button from '../../components/Button/Button';
import BottomNavbar from '../../components/bottomNavbar/BottomNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAvailable, fetchFieldByHour } from '../../redux/slices/fields/fieldSlice';
import { formatDateToYYYYMMDD } from '../../helpers/format';

const ChooseSlotsScreen = ({ route, navigation }) => {
    const { id } = route.params; 
    const field = useSelector(state => state.fields.field_by_hour);
    const dispatch = useDispatch();

    const today = new Date();
    const todayForFetch = formatDateToYYYYMMDD(today);
    const tomorrow = new Date(today);
    const tomorrowForFetch = tomorrow.setDate(today.getDate() + 1);

    useEffect(() => {
        const data = {
            field_id: id,
            year: today.getFullYear(),
            month: today.getMonth() + 1 
        };
        dispatch(fetchAvailable(data));
    }, [dispatch, id]);

    const [todayOrTommorow, setTodayOrTommorow] = useState('today');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
    const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(today);
    const [selectedStartTime, setSelectedStartTime] = useState(new Date());
    const [selectedEndTime, setSelectedEndTime] = useState(new Date());
    const [choosed_slot, set_choosed_slot] = useState(null);
    const [access_to_pay, set_access_to_pay] = useState(false);
    const [selectedDateForFetch, setSelectedDateForFetch] = useState(todayForFetch);

    const handleChangeTodayOrTommorow = (item) => {
        setTodayOrTommorow(item);
    }

    const showDatePicker = useCallback(() => {
        setDatePickerVisibility(true);
    }, []);
    
    const hideDatePicker = useCallback(() => {
        setDatePickerVisibility(false);
    }, []);

    const showStartTimePicker = useCallback(() => {
        setStartTimePickerVisibility(true);
    }, []);

    const hideStartTimePicker = useCallback(() => {
        setStartTimePickerVisibility(false);
    }, []);

    const showEndTimePicker = useCallback(() => {
        setEndTimePickerVisibility(true);
    }, []);

    const hideEndTimePicker = useCallback(() => {
        setEndTimePickerVisibility(false);
    }, []);

    const handleStartTimeConfirm = (date) => {
        setSelectedStartTime(date);
        hideStartTimePicker();
        const hours = date.getHours();
        const minutes = date.getMinutes();
    };

    const handleEndTimeConfirm = (date) => {
        setSelectedEndTime(date);
        hideEndTimePicker();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        dispatch(fetchFieldByHour({ id, hour: hours, minutes: minutes, date: selectedDateForFetch }));
    };

    const handle_choose_slot = (slot) => {
        if (choosed_slot === slot) {
            set_choosed_slot(null);
            set_access_to_pay(false);
        } else {
            set_choosed_slot(slot);
            set_access_to_pay(true);
        }
    };

    const handleDateSelect = useCallback((date) => {
        setSelectedDate(date);
        setTodayOrTommorow(null);
        setSelectedDateForFetch(date);
    }, []);

    useEffect(() => {
        if(todayOrTommorow === 'today') {
            setSelectedDate(today);
            setSelectedDateForFetch(todayForFetch);
        } else if (todayOrTommorow === 'tomorrow') {
            setSelectedDate(tomorrowForFetch);
            setSelectedDateForFetch(formatDateToYYYYMMDD(tomorrow));
        }
    }, [todayOrTommorow]);

    useEffect(() => {
        const startHours = selectedStartTime.getHours();
        const startMinutes = selectedStartTime.getMinutes();
        const endHours = selectedEndTime.getHours();
        const endMinutes = selectedEndTime.getMinutes();
        dispatch(fetchFieldByHour({ id, startHour: startHours, startMinutes: startMinutes, endHour: endHours, endMinutes: endMinutes, date: selectedDateForFetch }));
    }, [dispatch, id, selectedDateForFetch, selectedStartTime, selectedEndTime]);

    const formatTime = (hours, minutes) => {
        const formattedHours = hours < 10 ? `0${hours}` : hours;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${formattedHours}:${formattedMinutes}`;
    };
    
    const [fontsLoaded] = useFonts({
        'Rubik-400': require("../../../assets/fonts/Rubik-Regular.ttf"),
        'Rubik-500': require("../../../assets/fonts/Rubik-Medium.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    }

    const formatSelectedDate = useCallback((date) => {
        const options = { day: 'numeric', month: 'long' };
        return new Intl.DateTimeFormat('ru-RU', options).format(new Date(date));
    }, []);

    return (
        <View style={{ position: "relative", height: "100%" }}>
            <ScrollView>
                <Navbar/>
                <View style={styles.detail_info}>
                    <View style={styles.detail_date}>
                        <View style={styles.today_or_tomorrow}>
                            <TouchableOpacity onPress={() => handleChangeTodayOrTommorow('today')} style={[ todayOrTommorow === 'today' ? styles.slot : styles.not_choosed_slot ]}>
                                <Text style={[ todayOrTommorow === 'today' ? styles.slot_text : styles.not_choosed_slot_text ]}>Сегодня</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleChangeTodayOrTommorow('tomorrow')} style={[ todayOrTommorow === 'tomorrow' ? styles.slot : styles.not_choosed_slot ]}>
                                <Text style={[ todayOrTommorow === 'tomorrow' ? styles.slot_text : styles.not_choosed_slot_text ]}>Завтра</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.choose_date}>
                            <TouchableOpacity onPress={() => showDatePicker()} style={styles.calendar}>
                                <CalendarSVG/>
                                <Text style={{color: "#777777", fontFamily: "Rubik-400"}} >Выбрать дату</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 16, textAlign: "left", fontFamily: "Rubik-400" }}>Укажите время и дату</Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 16, fontFamily: "Rubik-400" }}>Начало:</Text>
                        <TouchableOpacity onPress={showStartTimePicker} style={styles.timePicker}>
                            <Text style={{ fontSize: 16, fontFamily: "Rubik-400" }}>
                                {formatTime(selectedStartTime.getHours(), selectedStartTime.getMinutes())}
                            </Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isStartTimePickerVisible}
                            mode="time"
                            date={selectedStartTime}
                            onConfirm={handleStartTimeConfirm}
                            onCancel={hideStartTimePicker}
                            minuteInterval={30}
                        />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 16, fontFamily: "Rubik-400" }}>Конец:</Text>
                        <TouchableOpacity onPress={showEndTimePicker} style={styles.timePicker}>
                            <Text style={{ fontSize: 16, fontFamily: "Rubik-400" }}>
                                {formatTime(selectedEndTime.getHours(), selectedEndTime.getMinutes())}
                            </Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isEndTimePickerVisible}
                            mode="time"
                            date={selectedEndTime}
                            onConfirm={handleEndTimeConfirm}
                            onCancel={hideEndTimePicker}
                            minuteInterval={30}
                        />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text>{ `Полe на время c ${formatTime(selectedStartTime.getHours(), selectedStartTime.getMinutes())} до ${formatTime(selectedEndTime.getHours(), selectedEndTime.getMinutes())} свободны` }</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.bottomNavbar_block}>
                <Button
                    title={"Перейти к оплате"}
                    onPress={() => {
                        const date = todayOrTommorow === 'today' ? new Date() : new Date(today.getTime() + 24 * 60 * 60 * 1000);
                        navigation.navigate('PayScreen', { field, selectedDate: selectedDateForFetch ? selectedDateForFetch : "", time: convertTimeStringToJSON(choosed_slot.nigga_pro_max)});
                    }}
                />
                <BottomNavbar navigation={navigation} item={"home"} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    detail_info: {
        marginTop: 15,
        paddingHorizontal: 15
    },
    detail_date: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    today_or_tomorrow: {
        flexDirection: "row",
        columnGap: 10
    },
    not_choosed_slot: {
        alignSelf: "flex-start",
        paddingVertical: '1.5%',
        paddingHorizontal: 10,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: "#237133"
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
    calendar: {
        flexDirection: "row",
        alignItems: "center",
        columnGap: 5,
        backgroundColor: "#ffffff",
        borderRadius: 100,
        paddingHorizontal: 10,
        paddingVertical: 4
    },
    timePicker: {
        backgroundColor: "#ffffff",
        borderRadius: 100,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: "#237133",
        marginTop: 10
    },
    bottomNavbar_block: {
        width: "100%",
        height: "auto",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        position: "absolute",
        bottom: 20,
        paddingHorizontal: 15,
        rowGap: 10
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ChooseSlotsScreen;