import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { renderRating } from '../../helpers/renderRating';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';

const ReviewCard = ({ data = {} }) => {
  let formattedDate = formatDistanceToNow(new Date(data.created_at), { addSuffix: true, locale: ru });
  formattedDate = formattedDate.replace('около ', '');

  return (
    <GestureHandlerRootView>
      <View style={styles.review_card}>
        <View style={styles.container}>
          <View style={styles.user_info}>
            <View style={styles.user}>
              <Image
                style={styles.user_img}
                alt="image"
                source={{ uri: 'https://assets-global.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg' }}
              />
              <View>
                <Text style={styles.user_title}>{data.user.name}</Text>
                <Text style={styles.user_review_date}>{formattedDate}</Text>
              </View>
            </View>
            <View style={styles.rating}>{renderRating(data.rating)}</View>
          </View>
          <ScrollView style={styles.text} contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.description}>{data.comment}</Text>
          </ScrollView>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  review_card: {
    width: 280,
    height: 'auto',
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#ffffff',
    marginRight: 10,
  },
  user_img: {
    width: 45,
    height: 45,
    resizeMode: 'cover',
    borderRadius: 100,
  },
  user_info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rating: {
    flexDirection: 'row',
    columnGap: 1,
    alignItems: 'center',
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  text: {
    marginTop: 10,
    height: 120,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  description: {
    width: 240,
    fontSize: 12,
  },
  user_title: {
    fontSize: 14
  },
  user_review_date: {
    fontSize: 12,
    fontWeight: "300",
    color: "#828282"
  }
});

export default ReviewCard;