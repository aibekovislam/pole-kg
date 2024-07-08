import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { calculateTimeDifference, formatDateTimeEnd, formatDateTimeStart, formatSlotEnd, formatSlotStart, formatTimeDifference } from '../../helpers/format';

export default function BookingCard({ data, user }) {

    const [fontsLoaded] = useFonts({
        'Rubik-400': require("../../../assets/fonts/Rubik-Regular.ttf"),
        'Rubik-500': require("../../../assets/fonts/Rubik-Medium.ttf"),
        'Rubik-600': require("../../../assets/fonts/Rubik-SemiBold.ttf"),
        'Rubik-700': require("../../../assets/fonts/Rubik-Bold.ttf")
    });

    const timeDifference = calculateTimeDifference(data.end_time);
    const formattedTimeDifference = formatTimeDifference(timeDifference);

    const startHours = parseInt(formatSlotStart(data.start_time).hours, 10);
    const endHours = parseInt(formatSlotEnd(data.end_time).hours, 10);

    const hoursDiff = endHours - startHours;

    return (
        <View>
            <View style={styles.card}>
                <View style={styles.container}>
                    <View style={styles.card_items}>
                        <View style={styles.card_item}>
                            <Image source={{ uri: user?.avatar ? user?.avatar : "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" }} alt='pole' style={styles.card_image} />
                        </View>
                        <View style={styles.card_item}>
                            <Text style={styles.name}>{ user?.name }</Text>
                            <View style={styles.card_slots}>
                                <View style={styles.slot}><Text style={styles.slot_text}>{ formatDateTimeStart(data?.start_time) }</Text></View>
                                <View style={styles.slot}><Text style={styles.slot_text}>{ formatDateTimeEnd(data?.end_time) }</Text></View>
                                <View style={styles.slot}><Text style={styles.slot_text_address}>{ data?.field.address }</Text></View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.card_bottom}>
                <View style={styles.container}>
                    <View style={styles.card_bottom_items}>
                        <View style={styles.card_bottom_item}>
                            <Text style={styles.card_bottom_item_title}>Игра через </Text>
                            <Text style={styles.card_bottom_item_title_green}>{ formattedTimeDifference }</Text>
                        </View>
                        <View style={styles.card_bottom_item}>
                            <Text style={styles.card_bottom_item_title}>Итого</Text>
                            <Text style={styles.card_bottom_item_title_green}>{ data?.field.price * hoursDiff }</Text>
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
        borderRadius: 6,
        backgroundColor: "#ffffff",
        marginBottom: 2,
    },
    container: {
        flex: 1,
    },
    card_items: {
        flexDirection: "row",
        columnGap: 10
    },
    card_image: {
        width: 50,
        height: 50,
        resizeMode: 'cover',
        borderRadius: 6
    },
    card_price: {
        fontSize: 14,
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
    },
    name: {
        fontSize: 16,
        fontWeight: "500",
        color: "#237133",
        marginBottom: 5,
        fontFamily: "Rubik-500"
    },
    card_slots: {
        flexDirection: "row",
        flexWrap: "wrap",
        columnGap: 5,
        rowGap: 5
    },
    slot: {
        alignSelf: "flex-start",
        backgroundColor: "#EFEFEF",
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 100
    },
    slot_text: {
        color: "#828282",
        fontFamily: "Rubik-400"
    },
    slot_text_address: {
        color: "#237133"
    },
    card_bottom: {
        width: 370,
        backgroundColor: "#ffffff",
        borderRadius: 6
    },
    card_bottom_items: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection :"row",
        justifyContent: "space-between"
    },
    card_bottom_item: {
        flexDirection: "row",
        columnGap: 5
    },
    card_bottom_item_title: {
        color: "#828282",
        fontFamily: "Rubik-400"
    },
    card_bottom_item_title_green: {
        color: "#237133",
        fontFamily: "Rubik-400"
    }
})