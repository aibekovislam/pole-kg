import React, { useRef, useState, useEffect } from 'react';
import { Dimensions, Image, StyleSheet, View, Animated } from 'react-native';
import CustomDots from './CustomDot';
import { API_URL } from '../../utils/consts';

const { width: screenWidth } = Dimensions.get('window');

export default function CarouselImage({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: `${API_URL}${item}` }} style={styles.item_img} />
      </View>
    </View>
  );

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  useEffect(() => {
    const listener = scrollX.addListener(({ value }) => {
      const index = Math.floor(value / screenWidth);
      if (index !== activeIndex) {
        setActiveIndex(index);
      }
    });
    return () => {
      scrollX.removeListener(listener);
    };
  }, [activeIndex, scrollX]);

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <Animated.FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          snapToAlignment="center"
          decelerationRate="fast"
          snapToInterval={screenWidth}
        />
      </View>
      <View style={styles.dotsContainer}>
        <CustomDots
          length={data ? data.length : []} 
          activeIndex={activeIndex} 
          activeColor="black" 
          passiveColor="#B3B3B3" 
          dotSize={5}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    borderRadius: 10,
  },
  item: {
    backgroundColor: '#f5f5f5',
    height: 175,
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    overflow: 'hidden',
    width: screenWidth,
    height: 175,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  item_img: {
    width: '100%',
    height: '100%',
    objectFit: "cover"
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});