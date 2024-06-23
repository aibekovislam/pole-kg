import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SaveSVG from '../../../assets/images/svgs/SaveSVG';
import SizeSVG from '../../../assets/images/svgs/SizeSVG';
import MapSVG from '../../../assets/images/svgs/MapSVG';
import { API_URL } from '../../utils/consts';

export default function Card({ field, onPress, price_and_time }) {
    const price = parseInt(field.price);
    return (
        <View style={styles.card}>
            <View style={styles.container}>
                <View style={styles.card_items}>
                    <View style={styles.card_item}>
                        <Image source={{ uri: `${API_URL}${field.images[0]}` }} alt='pole' style={styles.card_image} />
                    </View>
                    <View style={styles.card_item}>
                        <Text style={styles.card_price}>Цена { price } в час</Text>
                        <View style={styles.info_card}>
                            <MapSVG/>
                            <Text style={styles.card_address}>{ field.address }</Text>
                        </View>
                        <View style={styles.info_card}>
                            <SizeSVG/>
                            <Text style={styles.card_address}>Стандарт { field.size }</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 370,
        flexShrink: 1,
        padding: 10,
        borderRadius: 20,
        backgroundColor: "#ffffff",
        marginBottom: 15,
    },
    container: {
        flex: 1,
    },
    card_items: {
        flexDirection: "row",
        columnGap: 10
    },
    card_image: {
        width: 170,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 10
    },
    card_price: {
        fontSize: 16,
        fontWeight: "400",
        marginBottom: 10
    },
    info_card: {
        flexDirection: "row",
        columnGap: 5,
        alignItems: "center"
    },
    card_address: {
        fontSize: 12,
        color: "#777777",
        marginBottom: 5
    }
});