import React, { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, ScrollView, Text, TouchableOpacity, View, Platform } from 'react-native';
import Navbar from '../../components/Header/Navbar';
import CarouselImage from '../../components/Carousel/CarouselImage';
import RatingNoSVG from '../../../assets/images/svgs/RatingNo';
import SaveSVG from '../../../assets/images/svgs/SaveSVG';
import SizeSVG from '../../../assets/images/svgs/SizeSVG';
import CalendarSVG from '../../../assets/images/svgs/CalendarSVG';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAvailable, fetchAvailableDay, fetchField } from '../../redux/slices/fields/fieldSlice';
import ScheduleCarousel from '../../components/Carousel/ScheduleCarousel';
import TimePickerComponent from '../../components/DateTimePicker/TimePickerComponent';
import FieldSVG from '../../../assets/images/svgs/Field';
import { styles } from './DetailScreenCSS';
import JustCarousel from '../../components/Carousel/JustCarousel';
import MapPole from '../../components/map/MapPole';
import MapSVG from '../../../assets/images/svgs/MapSVG';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import FaveSVG from '../../../assets/images/svgs/FaceSVG';
import BottomNavbar from '../../components/bottomNavbar/BottomNavbar';
import Button from '../../components/Button/Button';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import { renderRating } from '../../helpers/renderRating';
import CustomCalendar from '../../components/CustomCalendar/CustomCalendar';

export default function DetailScreen({ route, navigation }) {
    const { id } = route.params;
    const dispatch = useDispatch();
    const field = useSelector(state => state.fields.field);
    const fields_available_month = useSelector(state => state.fields.availabelFieldMonth);
    const fields_available_day = useSelector(state => state.fields.availabelFieldDay);

    useEffect(() => {
        const today = new Date();
        const data = {
            field_id: id,
            year: today.getFullYear(),
            month: today.getMonth() + 1 
        }
        dispatch(fetchAvailable(data));
    }, [dispatch, id]);

    useEffect(() => {
        dispatch(fetchField(id));
    }, [dispatch, id]);

    const translateX = useRef(new Animated.Value(0)).current;

    const [isCalendarVisible, setCalendarVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        if (selectedDate) {
            const data = {
                field_id: id,
                date: selectedDate
            };
            dispatch(fetchAvailableDay(data));
        }
    }, [dispatch, id, selectedDate]);

    const showCalendar = () => {
        setCalendarVisibility(true);
    };

    const hideCalendar = () => {
        setCalendarVisibility(false);
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    const onGestureEvent = Animated.event(
        [{ nativeEvent: { translationX: translateX } }],
        { useNativeDriver: true }
    );

    const onHandlerStateChange = ({ nativeEvent }) => {
        if (nativeEvent.state === State.END) {
            if (nativeEvent.translationX > 50) {
                navigation.goBack();
            } else {
                Animated.spring(translateX, {
                    toValue: 0,
                    useNativeDriver: true,
                }).start();
            }
        }
    };

    const slots = field?.availability.map(slot => {
        const startTime = new Date(slot.start_time);
        const endTime = new Date(slot.end_time);
        const options = { hour: '2-digit', minute: '2-digit', hour12: false };

        return {
            time: `с ${startTime.toLocaleTimeString([], options)} до ${endTime.toLocaleTimeString([], options)}`,
            available: slot.available
        };
    }) || [];

    const slots2 = fields_available_day?.map(slot => {
        const startTime = new Date(slot.start_time);
        const endTime = new Date(slot.end_time);
        const options = { hour: '2-digit', minute: '2-digit', hour12: false };

        return {
            time: `с ${startTime.toLocaleTimeString([], options)} до ${endTime.toLocaleTimeString([], options)}`,
            available: slot.available
        };
    }) || [];

    const renderItem = ({ item }) => {
        return (
            <ReviewCard data={item} />
        );
    };

    const content = (
        <View style={[styles.detail, { position: "relative" }]}>
            <ScrollView>
                <Navbar />
                <View style={styles.detail_container}>
                    <View style={styles.card}>
                        <View style={styles.container}>
                            <View style={styles.card__items}>
                                <View style={styles.carousel}>
                                    <CarouselImage data={field?.images} />
                                </View>
                                <View style={styles.rating}>
                                    { renderRating(field?.average_rating) }
                                </View>
                                <View style={styles.title_save}>
                                    <Text style={styles.title}>{ field?.name }</Text>
                                    <SaveSVG />
                                </View>
                                <View style={styles.price_and_size}>
                                    <Text style={styles.price_title}>{ field?.price } час</Text>
                                    <View style={styles.size_block}>
                                        <SizeSVG />
                                        <Text style={styles.size_title}>Размер: Стандарт ({ field?.size })</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.detail_info}>
                        <View style={styles.detail_calendar}>
                            <View style={{ flexDirection: "row" }}>
                                <View style={styles.fill_detail_calendar}><Text style={{ color: "#ffffff" }}>Сегодня</Text></View>
                                <View style={[styles.fill_detail_calendar_available, { width: 70, borderColor: "#237133" }]}><Text style={{ color: "#237133" }}>Завтра</Text></View>
                            </View>
                            <View style={styles.choose_calendar} onTouchEnd={showCalendar}>
                                <Text>Выбрать дату</Text>
                                <CalendarSVG />
                            </View>
                        </View>
                        <Text style={{ fontSize: 16, marginTop: 15 }}>Свободные поля на сегодня</Text>
                        <View style={styles.availabel_slots}>
                            { fields_available_day ? <ScheduleCarousel data={slots2} /> : <ScheduleCarousel data={slots} /> }
                        </View>
                    </View>
                    <View style={styles.detail_other_info}>
                        <View style={styles.detail_time_picker}>
                            <TimePickerComponent />
                        </View>
                    </View>
                    <View style={styles.field_size_info}>
                        <Text style={styles.field_size_info_title}>Чертеж поля</Text>
                        <FieldSVG />
                        <Text style={styles.field_size_text_height1}>{ field?.length } м</Text>
                        <Text style={styles.field_size_text_height2}>{ field?.length } м</Text>
                        <Text style={styles.field_size_text_width1}>{ field?.width } м</Text>
                        <Text style={styles.field_size_text_width2}>{ field?.width } м</Text>
                    </View>
                    <View style={styles.parametrs}>
                        <Text style={{ fontSize: 16 }}>Параметры поля</Text>
                        <JustCarousel data={field?.extra_info} />
                    </View>
                    <View style={styles.parametrs}>
                        <Text style={{ fontSize: 16 }}>Описание поля</Text>
                        <Text style={styles.description}>{ field?.description }</Text>
                    </View>
                    <View style={styles.parametrs_map}>
                        <MapPole location={field?.location} />
                        <View style={styles.address_map}>
                            <MapSVG />
                            <Text style={styles.address_map_title}>{ field?.address }</Text>
                        </View>
                    </View>
                    <View style={styles.reviews}>
                        <Text style={styles.review_title}>Отзывы</Text>
                        <FlatList
                            data={field?.reviews}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.carouselContainer}
                        />
                    </View>
                    <View style={styles.review_input}>
                        <TouchableOpacity style={styles.container_review}>
                            <View style={styles.leftSection}>
                                <FaveSVG />
                                <Text style={styles.text}>Оставить отзыв</Text>
                            </View>
                            <View style={styles.rightSection}>
                                {[...Array(5)].map((_, index) => (
                                    <RatingNoSVG key={index} />
                                ))}
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.bottom_navbar}>
                <Button title={"Забронировать"} />
                <BottomNavbar navigation={navigation} item={"home"} />
            </View>
        </View>
    );

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            {Platform.OS === 'ios' ? (
                <PanGestureHandler onGestureEvent={onGestureEvent} onHandlerStateChange={onHandlerStateChange}>
                    <Animated.View style={{ transform: [{ translateX }] }}>
                        {content}
                    </Animated.View>
                </PanGestureHandler>
            ) : (
                content
            )}
            <CustomCalendar
                isVisible={isCalendarVisible} 
                onClose={hideCalendar} 
                onDateSelect={handleDateSelect} 
                fields_available_month={fields_available_month}
            />
        </GestureHandlerRootView>
    );
}