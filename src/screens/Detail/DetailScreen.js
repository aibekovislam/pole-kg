import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { Animated, FlatList, ScrollView, Text, TouchableOpacity, View, Platform, TouchableHighlight, ActivityIndicator } from 'react-native';
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
import { getData } from '../../helpers/storeHelper';

export default function DetailScreen({ route, navigation }) {
  const { id } = route.params;
  const dispatch = useDispatch();
  const field = useSelector(state => state.fields.field);
  const fields_available_month = useSelector(state => state.fields.availabelFieldMonth);
  const fields_available_day = useSelector(state => state.fields.availabelFieldDay);
  const [loading, setLoading] = useState(true);

  const today = new Date();

  const [todaySlots, setTodaySlots] = useState([]);
  const [tomorrowSlots, setTomorrowSlots] = useState([]);
  const [selectedDateSlots, setSelectedDateSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarVisible, setCalendarVisibility] = useState(false);
  const [todayOrTomorrow, setTodayOrTomorrow] = useState('today');
  const [token, setToken] = useState(null);

  const translateX = useRef(new Animated.Value(0)).current;
  const colorAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    async function fetchToken() {
      const token = await getData('token');
      setToken(token);
    }

    fetchToken();

    const data = {
      field_id: id,
      year: today.getFullYear(),
      month: today.getMonth() + 1 
    };
    dispatch(fetchAvailable(data));
    dispatch(fetchField(id)).then(() => setLoading(false));
    fetchTodaySlots();
    fetchTomorrowSlots();
  }, [dispatch, id]);

  const fetchTodaySlots = useCallback(() => {
    const todayDate = today.toISOString().split('T')[0];
    const data = {
      field_id: id,
      date: todayDate
    };
    dispatch(fetchAvailableDay(data));
  }, [dispatch, id, today]);

  const fetchTomorrowSlots = useCallback(() => {
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const tomorrowDate = tomorrow.toISOString().split('T')[0];
    const data = {
      field_id: id,
      date: tomorrowDate
    };
    dispatch(fetchAvailableDay(data));
  }, [dispatch, id, today]);

  useEffect(() => {
    if (fields_available_day && !selectedDate) {
      if (todayOrTomorrow === 'today') {
        setTodaySlots(transformSlots(fields_available_day));
      } else if (todayOrTomorrow === 'tomorrow') {
        setTomorrowSlots(transformSlots(fields_available_day));
      }
    } else if (fields_available_day && selectedDate) {
      setSelectedDateSlots(transformSlots(fields_available_day));
    }
  }, [fields_available_day, todayOrTomorrow, selectedDate]);

  useEffect(() => {
    if (selectedDate) {
      const data = {
        field_id: id,
        date: selectedDate
      };
      dispatch(fetchAvailableDay(data));
    }
  }, [dispatch, id, selectedDate]);

  const transformSlots = useCallback((slots) => {
    return slots.map(slot => {
      const startTime = new Date(slot.start_time);
      const endTime = new Date(slot.end_time);
      const options = { hour: '2-digit', minute: '2-digit', hour12: false };

      return {
        time: `с ${startTime.toLocaleTimeString([], options)} до ${endTime.toLocaleTimeString([], options)}`,
        available: slot.available
      };
    });
  }, []);

  const showCalendar = useCallback(() => {
    setCalendarVisibility(true);
  }, []);

  const hideCalendar = useCallback(() => {
    setCalendarVisibility(false);
  }, []);

  const handleDateSelect = useCallback((date) => {
    setSelectedDate(date);
    setTodayOrTomorrow(null);
  }, []);

  const formatDate = useCallback((date) => {
    const options = { day: 'numeric', month: 'long' };
    return new Intl.DateTimeFormat('ru-RU', options).format(new Date(date));
  }, []);

  const handleChangeTodayOrTommorow = useCallback((item) => {
    setTodayOrTomorrow(item);
    setSelectedDate(null);
    Animated.timing(colorAnimation, {
      toValue: item === 'today' ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    fetchTodaySlots();
    fetchTomorrowSlots();
  }, [fetchTodaySlots, fetchTomorrowSlots]);

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

  const renderItem = useCallback(({ item }) => {
    return (
      <ReviewCard data={item} />
    );
  }, []);

  const todayBackgroundColor = selectedDate ? 'transparent' : colorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#237133', 'transparent']
  });

  const tomorrowBackgroundColor = selectedDate ? 'transparent' : colorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', '#237133']
  });

  const todayTextColor = selectedDate ? '#237133' : colorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ffffff', '#237133']
  });

  const tomorrowTextColor = selectedDate ? '#237133' : colorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#237133', '#ffffff']
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#237133" />
      </View>
    );
  }

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
                <TouchableHighlight underlayColor={"#f2f2f2"} onPress={() => handleChangeTodayOrTommorow('today')} style={styles.calendar_button}>
                  <Animated.View style={[styles.calendar_not_fill, { backgroundColor: todayBackgroundColor }]}>
                    <Animated.Text style={{ color: todayTextColor }}>Сегодня</Animated.Text>
                  </Animated.View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor={"#f2f2f2"} onPress={() => handleChangeTodayOrTommorow('tomorrow')} style={styles.calendar_button}>
                  <Animated.View style={[styles.calendar_not_fill, { backgroundColor: tomorrowBackgroundColor }]}>
                    <Animated.Text style={{ color: tomorrowTextColor }}>Завтра</Animated.Text>
                  </Animated.View>
                </TouchableHighlight>
              </View>
              <TouchableOpacity style={styles.choose_calendar} onPress={showCalendar}>
                <Text>Выбрать дату</Text>
                <CalendarSVG />
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 16, marginTop: 15 }}>Свободные поля на {selectedDate ? formatDate(selectedDate) : todayOrTomorrow === 'today' ? 'сегодня' : 'завтра'}</Text>
            <View style={styles.availabel_slots}>
              { selectedDate ? (<ScheduleCarousel data={selectedDateSlots} />) : (
                todayOrTomorrow === 'today' ? (<ScheduleCarousel data={todaySlots} />) : (<ScheduleCarousel data={tomorrowSlots} />)
              )}
            </View>
          </View>
          <View style={styles.detail_other_info}>
            <View style={styles.detail_time_picker}>
              <TimePickerComponent
                backgroundColor={'#ffffff'}
                payBlocked={false}
              />
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
            {field?.location && <MapPole location_one={Number(field?.location[0])} location_two={Number(field?.location[1])} />}
            <View style={styles.address_map}>
                <MapSVG />
                <Text style={styles.address_map_title}>{field?.address}</Text>
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
          { token ? (
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
          ) : (null) }
        </View>
      </ScrollView>
      <View style={styles.bottom_navbar}>
        <Button title={"Забронировать"} onPress={() => navigation.navigate('PayScreen', { field, selectedDate })} />
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