import React, { useRef } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform, Animated } from 'react-native';
import Navbar from "../../components/Header/Navbar";
import BottomNavbar from "../../components/bottomNavbar/BottomNavbar";
import Button from '../../components/Button/Button';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import ReviewCard from '../../components/ReviewCard/ReviewCard';

export default function ReviewScreen({ route, navigation }) {
  const translateX = useRef(new Animated.Value(0)).current;
  const { reviews } = route.params

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
    <View style={{ height: "100%" }}>
      <ScrollView>
        <Navbar />
        <Text style={{ paddingHorizontal: 15, fontSize: 14, marginTop: 10}} >Отзывы</Text>
        <View style={{paddingHorizontal: 15, justifyContent: "center", alignItems: "center", marginTop: 15, rowGap: 10, paddingBottom: 20}}>
           { reviews.map((review) => (
            <ReviewCard data={review} />
           )) }
        </View>
      </ScrollView>
      <View style={styles.bottomNavbar_block}>
        <Button title={"Оплатить"} />
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