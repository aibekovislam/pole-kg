import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

const ScheduleCarousel = ({ data }) => {
  const renderItem = ({ item }) => {
    return (
      <View style={[styles.ordered_block, item.available ? { borderColor: "#237133" } : { borderColor: "#B3B3B3" }]}>
        <Text style={[styles.ordered_block__title, item.available ? { color: "#237133" } : { color: "#B3B3B3" }]}>{item.time}</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.carouselContainer}
    />
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    alignItems: 'center',
  },
  ordered_block: {
    alignSelf: "flex-start",
    height: 30,
    borderWidth: 1,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
    marginTop: 10,
    paddingHorizontal: 10
  },
  ordered_block__title: {
    fontSize: 12
  }
});

export default ScheduleCarousel;