import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from '../Button/Button';
import CarouselImage from '../Carousel/CarouselImage';
import RatingSVG from '../../../assets/images/svgs/Rating';
import RatingNoSVG from '../../../assets/images/svgs/RatingNo';
import SaveSVG from '../../../assets/images/svgs/SaveSVG';
import SizeSVG from '../../../assets/images/svgs/SizeSVG';
import ScheduleCarousel from '../Carousel/ScheduleCarousel';

export default function MainCard({ field, onPress }) {
    const slots = field.availability.map(slot => {
        const startTime = new Date(slot.start_time);
        const endTime = new Date(slot.end_time);
        const options = { hour: '2-digit', minute: '2-digit', hour12: false };

        return {
            time: `с ${startTime.toLocaleTimeString([], options)} до ${endTime.toLocaleTimeString([], options)}`,
            available: slot.available
        };
    });

    return (
        <View style={styles.card}>
            <View style={styles.container}>
                <View style={styles.card__items}>
                    <TouchableOpacity style={styles.carousel} onPress={() => onPress(field.id)}>
                        <CarouselImage data={field.images} />
                    </TouchableOpacity>
                    <View style={styles.rating}>
                        <RatingSVG/>
                        <RatingSVG/>
                        <RatingSVG/>
                        <RatingSVG/>
                        <RatingNoSVG/>
                    </View>
                    <TouchableOpacity onPress={() => onPress(field.id)} style={styles.title_save}>
                        <Text style={styles.title}>{ field.name }</Text>
                        <SaveSVG />
                    </TouchableOpacity>
                    <View style={styles.price_and_size}>
                        <Text style={styles.price_title}>{ field.price } час</Text>
                        <View style={styles.size_block}>
                            <SizeSVG/>
                            <Text style={styles.size_title}>Размер: Стандарт ({ field.size })</Text>
                        </View>
                    </View>
                    <View style={styles.schedule}>
                        <Text style={styles.ordered_title}>Занято / Свободно</Text>
                        <ScheduleCarousel data={slots} />
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <Button title={"Забронировать"} onPress={() => onPress(field.id)} />
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
    card__items: {
        flex: 1,
    },
    carousel: {
        height: 200,
    },
    rating: {
        flexDirection: "row",
        columnGap: 5
    },
    title_save: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    title: {
        fontSize: 18,
        fontWeight: "500",
        lineHeight: 27,
        maxWidth: 220,
    },
    price_and_size: {
        marginTop: 10,
        flexDirection: "row",
        columnGap: 20
    },
    size_block: {
        flexDirection: "row",
        alignItems: "center",
        columnGap: 5
    },
    price_title: {
        fontSize: 15,
        fontWeight: "500"
    },
    size_title: {
        fontSize: 12,
        color: "#777777"
    },
    schedule: {
        marginTop: 10
    },
    ordered_title: {
        fontSize: 15,
        fontWeight: "500",
    },
    ordered_blocks: {
        flexDirection: "row",
        columnGap: 10,
        marginTop: 10
    },
    ordered_block: {
        width: 110,
        height: 30,
        borderWidth: 1,
        borderColor: "#D46060",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    ordered_block__title: {
        color: "#D46060",
        fontSize: 12
    }
});