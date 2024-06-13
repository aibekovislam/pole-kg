import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { renderRating } from '../../helpers/renderRating';

const ReviewCard = ({ data }) => {
  const formattedDate = formatDistanceToNow(new Date(data.created_at), { addSuffix: true, locale: ru });

  return (
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
              <Text>{ data.user.name }</Text>
              <Text>{formattedDate}</Text>
            </View>
          </View>
          <View style={styles.rating}>{renderRating(data.rating)}</View>
        </View>
        <View style={styles.text}>
          <Text style={styles.description}>{data.comment}</Text>
        </View>
      </View>
    </View>
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
  },
  description: {
    width: 240,
  },
});

export default ReviewCard;