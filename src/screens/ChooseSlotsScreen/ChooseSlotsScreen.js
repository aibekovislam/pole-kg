import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, Platform, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import Navbar from '../../components/Header/Navbar';
import CalendarSVG from '../../../assets/images/svgs/CalendarSVG';
import Slider from '@react-native-community/slider';
import { useFonts } from 'expo-font';
import Button from '../../components/Button/Button';
import BottomNavbar from '../../components/bottomNavbar/BottomNavbar';
import { useDispatch, useSelector } from 'react-redux';
import CustomCalendar from '../../components/CustomCalendar/CustomCalendar';
import { fetchAvailable, fetchFieldByHour } from '../../redux/slices/fields/fieldSlice';
import { convertTimeStringToJSON, formatDateToYYYYMMDD } from '../../helpers/format';

const ChooseSlotsScreen = ({ route, navigation }) => {
    const { id } = route.params; 
    const field = useSelector((state => state.fields.field_by_hour))
    const fields_available_month = useSelector(state => state.fields.availabelFieldMonth);
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
        // dispatch(fetchFieldByHour({ id, hour: 2, minutes: 0, date: todayForFetch })).then(() => setLoading(false));
    }, [dispatch, id]);

    const [ todayOrTommorow, setTodayOrTommorow ] = useState('today');
    const [isCalendarVisible, setCalendarVisibility] = useState(false);
    const [sliderValue, setSliderValue] = useState(0);
    const [selectedHours, setSelectedHours] = useState(0);
    const [selectedMinutes, setSelectedMinutes] = useState(0);
    const [ choosed_slot, set_choosed_slot ] = useState(null);
    const [ access_to_pay, set_access_to_pay ] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [ selectedDateForFetch, setSelectedDateForFetch ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    const handleChangeTodayOrTommorow = (item) => {
        setTodayOrTommorow(item);
    }

    const showCalendar = useCallback(() => {
        setCalendarVisibility(true);
    }, []);
    
    const hideCalendar = useCallback(() => {
        setCalendarVisibility(false);
    }, []);

    const MAX_HOURS = 12;

    const handleSliderChange = (value) => {
        const hours = Math.floor(value / 2);
        const minutes = (value % 2) * 30;
        setSelectedHours(hours);
        setSelectedMinutes(minutes);
        setSliderValue(value);
    };

    const handleSliderComplete = (value) => {
        const hours = Math.floor(value / 2);
        const minutes = (value % 2) * 30;
        console.log(hours, minutes);
        dispatch(fetchFieldByHour({ id, hour: hours, minutes: minutes, date: selectedDateForFetch }))
        return value;
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
        setSelectedDateForFetch(date)
    }, []);

    useEffect(() => {
        if(todayOrTommorow === 'today') {
            setSelectedDate(today);
            setSelectedDateForFetch(todayForFetch)
        } else if (todayOrTommorow === 'tomorrow') {
            setSelectedDate(tomorrowForFetch)
            setSelectedDateForFetch(formatDateToYYYYMMDD(tomorrow))
        }
    }, [todayOrTommorow])

    useEffect(() => {
        dispatch(fetchFieldByHour({ id, hour: 2, minutes: 0, date: selectedDateForFetch }));
    }, [dispatch, id, selectedDateForFetch]);
    

    const formatTime = (hours, minutes) => {
        const formatHours = (hours) => {
            if (hours === 1) return "1 час";
            if (hours > 1 && hours < 5) return `${hours} часа`;
            return `${hours} часов`;
        };

        const formatMinutes = (minutes) => {
            if (minutes === 1) return "1 минута";
            if (minutes > 1 && minutes < 5) return `${minutes} минуты`;
            return `${minutes} минут`;
        };

        if (hours === 0) {
            return formatMinutes(minutes);
        } else if (minutes === 0) {
            return formatHours(hours);
        } else {
            return `${formatHours(hours)} ${formatMinutes(minutes)}`;
        }
    };

    const [fontsLoaded] = useFonts({
        'Rubik-400': require("../../../assets/fonts/Rubik-Regular.ttf"),
        'Rubik-500': require("../../../assets/fonts/Rubik-Medium.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    }

    const formatSelctedDate = useCallback((date) => {
        const options = { day: 'numeric', month: 'long' };
        return new Intl.DateTimeFormat('ru-RU', options).format(new Date(date));
    }, []);
    
    return (
        <View style={{ position: "relative", height: "100%", flex: 1, paddingBottom: 100 }}>
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
                            <TouchableOpacity onPress={() => showCalendar()} style={styles.calendar}>
                                <CalendarSVG/>
                                <Text style={{color: "#777777", fontFamily: "Rubik-400"}} >Выбрать дату</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 16, textAlign: "left", fontFamily: "Rubik-400" }}>Укажите время и дату</Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Slider
                            style={{ transform: [{ scaleY: 1 }], height: 40 }}
                            minimumValue={0}
                            maximumValue={MAX_HOURS * 2}
                            step={1}
                            value={sliderValue}
                            onValueChange={handleSliderChange}
                            onSlidingComplete={handleSliderComplete}
                            minimumTrackTintColor="#237133"
                            maximumTrackTintColor="#000000"
                            thumbTintColor="#237133"
                        />
                        <View style={{ position: 'relative' }}>
                            <View>
                                <Text style={{ textAlign: 'left', fontSize: 16, fontFamily: "Rubik-400" }}>
                                    {formatTime(selectedHours, selectedMinutes)}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 35 }}>
                        <Text style={{fontFamily: "Rubik-400"}}>Свободные поля на { selectedDate ? formatSelctedDate(selectedDate) : ( todayOrTommorow === 'today' ? "сегодня" : "завтра" ) }</Text>
                        <View style={{ flexDirection: "row", flexWrap: "wrap", columnGap: 5, rowGap: 6, marginTop: 10 }}>
                            {/* <Text></Text> */}
                            { field?.availability.map((free_slot, index) => (
                                <TouchableOpacity onPress={() => handle_choose_slot(free_slot)} style={[ choosed_slot === free_slot ? styles.slot : styles.not_choosed_slot ]} key={index}>
                                    <Text style={[ choosed_slot === free_slot ? styles.slot_text : styles.not_choosed_slot_text ]}>{ free_slot.nigga_pro_max }</Text>
                                </TouchableOpacity>
                            )) }
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.bottomNavbar_block}>
                <Button
                    pinTyped={access_to_pay}
                    title={"Перейти к оплате"}
                    onPress={() => {
                        const date = todayOrTommorow === 'today' ? new Date() : new Date(today.getTime() + 24 * 60 * 60 * 1000);
                        navigation.navigate('PayScreen', { field, selectedDate: selectedDateForFetch ? selectedDateForFetch : "", time: convertTimeStringToJSON(choosed_slot.nigga_pro_max)});
                    }}
                />
                <BottomNavbar navigation={navigation} item={"home"} />
            </View>
            <CustomCalendar
                isVisible={isCalendarVisible} 
                onClose={hideCalendar} 
                onDateSelect={handleDateSelect} 
                fields_available_month={fields_available_month}
            />
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
    sliderThumb: {
        // borderRadius: 20,
        // backgroundColor: '#237133',
    },
    bottomNavbar_block: {
        width: "100%",
        height: "auto",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        position: "absolute",
        // top: '100%',
        bottom: 20,
        paddingHorizontal: 15,
        rowGap: 10
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default ChooseSlotsScreen