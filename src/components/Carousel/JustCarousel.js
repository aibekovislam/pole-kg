import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

const JustCarousel = ({ data }) => {
  const renderItem = ({ item }) => {
    return (
      <View style={[styles.ordered_block, { borderColor: "#237133" }]}>
        <Text style={[styles.ordered_block__title, { color: "#237133" }]}>{item}</Text>
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
    borderWidth: 1.5,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
    marginTop: 10,
    paddingVertical: 3,
    paddingHorizontal: 8
  },
  ordered_block__title: {
    fontSize: 12,
    fontWeight: "700"
  }
});

export default JustCarousel;