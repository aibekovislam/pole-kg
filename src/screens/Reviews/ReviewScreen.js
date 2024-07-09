import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform, Animated, TextInput, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import Navbar from "../../components/Header/Navbar";
import BottomNavbar from "../../components/bottomNavbar/BottomNavbar";
import Button from '../../components/Button/Button';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import RatingSVG from '../../../assets/images/svgs/Rating';
import RatingNoSVG from '../../../assets/images/svgs/RatingNo';
import { fetchField, reviewPost } from '../../redux/slices/fields/fieldSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function ReviewScreen({ route, navigation }) {
  const translateX = useRef(new Animated.Value(0)).current;
  const { id } = route.params
  const field = useSelector(state => state.fields.field);
  const [reviewText, setReviewText] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false); 

  useEffect(() => {
    dispatch(fetchField(id))
  }, [dispatch, id])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(fetchField(id));
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const onHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END && nativeEvent.translationX > 50) {
      navigation.goBack();
    }
  };

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );  

  const handleRatingPress = (rating) => {
    setSelectedRating(rating);
  };


  const handleReviewSubmit = () => {
    setReviewText('');
    if(reviewText.length > 0 && selectedRating > 0) {
      dispatch(reviewPost({ field: id, rating: selectedRating, comment: reviewText }));
    } else {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все данные отзыва.');
    }
  };  

  const content = (
    <View style={{ height: "100%" }}>
      <ScrollView refreshControl={
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
        <Text style={{ paddingHorizontal: 15, fontSize: 14, marginTop: 10}} >Отзывы</Text>
        <View style={{paddingHorizontal: 15, justifyContent: "center", alignItems: "center", marginTop: 15, rowGap: 10, paddingBottom: 20}}>
           { field?.reviews.map((review, index) => (
            <ReviewCard data={review} key={index} />
           )) }
        </View>
      </ScrollView>
      <View style={styles.bottomNavbar_block}>
        <View style={{ rowGap: 10, width: "100%" }}>
          <View style={styles.review_input}>
            <View style={styles.container_review}>
              <View style={styles.leftSection}>
                <TextInput
                  style={styles.input_review}
                  onChangeText={setReviewText}
                  value={reviewText}
                  placeholder="Оставить отзыв"
                  multiline
                />
                </View>
                <View style={styles.rightSection}>
                  {[...Array(5)].map((_, index) => (
                    <TouchableOpacity key={index} onPress={() => handleRatingPress(index + 1)}>
                      {index < selectedRating ? <RatingSVG /> : <RatingNoSVG />}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View> 
        <Button title={"Опубликовать"} onPress={handleReviewSubmit} />
        <BottomNavbar navigation={navigation} item={"home"} />
      </View>
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
  container_review: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 20,
    marginTop: 20,
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
  loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  input_review: {
      paddingHorizontal: 10,
      maxWidth: 200
  }
});