import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Animated, ScrollView, Text, TouchableOpacity, View, Platform, ActivityIndicator, TextInput, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Navbar from '../../components/Header/Navbar';
import CarouselImage from '../../components/Carousel/CarouselImage';
import RatingNoSVG from '../../../assets/images/svgs/RatingNo';
import SaveSVG from '../../../assets/images/svgs/SaveSVG';
import SizeSVG from '../../../assets/images/svgs/SizeSVG';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAvailable, fetchField, reviewPost, saveToFavorite } from '../../redux/slices/fields/fieldSlice';
import FieldSVG from '../../../assets/images/svgs/Field';
import { styles } from './DetailScreenCSS';
import JustCarousel from '../../components/Carousel/JustCarousel';
import MapPole from '../../components/map/MapPole';
import MapSVG from '../../../assets/images/svgs/MapSVG';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import BottomNavbar from '../../components/bottomNavbar/BottomNavbar';
import Button from '../../components/Button/Button';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import { renderRating } from '../../helpers/renderRating';
import { getData } from '../../helpers/storeHelper';
import { useFonts } from 'expo-font';
import SaveFilledSVG from '../../../assets/images/svgs/SaveFilled';

export default function DetailScreen({ route, navigation }) {
  const { id } = route.params;
  const dispatch = useDispatch();
  const field = useSelector(state => state.fields.field);
  const [loading, setLoading] = useState(true);
  const scrollViewRef = useRef(null);

  const today = new Date();

  const [token, setToken] = useState(null);
  const [refreshing, setRefreshing] = useState(false); 

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(fetchField(id)).then(() => setLoading(false));
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const translateX = useRef(new Animated.Value(0)).current;

  const [fontsLoaded] = useFonts({
    'Rubik-400': require("../../../assets/fonts/Rubik-Regular.ttf"),
    'Rubik-500': require("../../../assets/fonts/Rubik-Medium.ttf"),
    'Rubik-600': require("../../../assets/fonts/Rubik-SemiBold.ttf"),
    'Rubik-700': require("../../../assets/fonts/Rubik-Bold.ttf")
  });

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
  }, [dispatch, id]);

  useFocusEffect(
    useCallback(() => {
      translateX.setValue(0);

      return () => {
        translateX.setValue(0);
      };
    }, [])
  );

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

  if (!fontsLoaded) {
    return null;
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#237133" />
      </View>
    );
  }

  const content = (
    <View style={[styles.detail, { position: "relative" }]}>
      <ScrollView ref={scrollViewRef} refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#9Bd35A', '#689F38']} 
            tintColor={'#689F38'}
            progressBackgroundColor="#FFFFFF"
            style={Platform.OS === 'android' ? { backgroundColor: '#689F38' } : {}}
          />
        }>
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
                  <Text style={[styles.title, { fontFamily: "Rubik-500" }]}>{ field?.name }</Text>
                  <TouchableOpacity onPress={() => dispatch(saveToFavorite(field?.id))}>
                    { field?.in_favorite ? (<SaveFilledSVG />) : (<SaveSVG/>) }
                  </TouchableOpacity>
                </View>
                <View style={styles.price_and_size}>
                  <Text style={[styles.price_title, { fontFamily: "Rubik-400" }]}>{ parseInt(field?.price) } в час</Text>
                  <View style={styles.size_block}>
                    <SizeSVG />
                    <Text style={[styles.size_title, { fontFamily: "Rubik-400" }]}>Размер: Стандарт ({ field?.size })</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.field_size_info}>
            <Text style={[styles.field_size_info_title, { fontFamily: "Rubik-400" }]}>Чертеж поля</Text>
            <FieldSVG />
            <Text style={[styles.field_size_text_height1, { fontFamily: "Rubik-400" }]}>{ field?.length } м</Text>
            <Text style={[styles.field_size_text_height2, { fontFamily: "Rubik-400" }]}>{ field?.length } м</Text>
            <Text style={[styles.field_size_text_width1, { fontFamily: "Rubik-400" }]}>{ field?.width } м</Text>
            <Text style={[styles.field_size_text_width2, { fontFamily: "Rubik-400" }]}>{ field?.width } м</Text>
          </View>
          <View style={styles.parametrs}>
            <Text style={{ fontSize: 16, fontFamily: "Rubik-400" }}>Параметры поля</Text>
            <JustCarousel data={field?.extra_info} />
          </View>
          <View style={styles.parametrs}>
            <Text style={{ fontSize: 16, fontFamily: "Rubik-400" }}>Описание поля</Text>
            <Text style={[styles.description, { fontFamily: "Rubik-400" }]}>{ field?.description }</Text>
          </View>
          <View style={styles.parametrs_map}>
            {field?.location && <MapPole location_one={Number(field?.location[0])} location_two={Number(field?.location[1])} />}
            <View style={styles.address_map}>
                <MapSVG />
                <Text style={[styles.address_map_title, { fontFamily: "Rubik-400" }]}>{field?.address}</Text>
            </View>
          </View>
          <View style={styles.reviews}>
            <Text style={[styles.review_title, { fontFamily: "Rubik-400" }]}>Отзывы</Text>
            { field?.reviews.slice(0, 3).map((item, index) => (
              <ReviewCard data={item} key={index} />
            )) }
          </View>
          { field?.reviews ? (
            <View style={{ width: "100%", marginTop: 5 }}>
              <TouchableOpacity onPress={() => navigation.navigate('Reviews', { id: id })} style={{ borderRadius: 6, height: 60, justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff" }}>
                <Text style={{ fontSize: 14, textDecorationLine: "underline", color: "#237133", padding: 0 }}>Больше</Text>
              </TouchableOpacity>
            </View>
          ) : (null) }
        </View>
      </ScrollView>
      <View style={styles.bottom_navbar}>
        <Button
          title={"Забронировать"}
          onPress={() => {
            navigation.navigate('ChooseSlot', { field, id });
          }}
        />
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
    </GestureHandlerRootView>
  );
}