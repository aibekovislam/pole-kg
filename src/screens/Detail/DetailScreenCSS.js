import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    detail_container: {
        width: "100%",
        height: "auto",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
        paddingHorizontal: 15,
        paddingBottom: "43%"
    },
    card: {
        width: "100%",
        // height: 520,
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
    },
    detail_info: {
        // paddingHorizontal: 15
    },
    detail_calendar: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center"
    },
    fill_detail_calendar: {
        width: 70,
        height: 30,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 5,
        marginTop: 10,
        backgroundColor: "#237133",
    },
    fill_detail_calendar_available: {
        width: 110,
        height: 30,
        borderWidth: 1.5,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 5,
        marginTop: 10
    },
    calendar_not_fill: {
        width: 70,
        height: 30,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 5,
        marginTop: 10,
        borderWidth: 1.5,
        borderColor: "#237133",
        color: "#237133"
    },
    notFill_detail_calendar: {
        width: 110,
        height: 30,
        borderWidth: 1,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 5,
        marginTop: 10,
        borderColor: "#B3B3B3",
        color: "#B3B3B3"
    },
    choose_calendar: {
        width: 135,
        height: 30,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        backgroundColor: "#ffffff",
        flexDirection: "row",
        columnGap: 5,
    },
    availabel_slots: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 5
    },
    detail_time_picker: {
        width: "100%",
        flexDirection: "row",
        marginTop: 10
    },
    field_size_info: {
        width: "100%",
        backgroundColor: "#ffffff",
        marginTop: 15,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        position: "relative",
        paddingBottom: 30
    },
    field_size_info_title: {
        marginBottom: 30,
        fontSize: 16
    },
    field_size_text_width1: {
        fontSize: 16,
        fontWeight: '700',
        position: "absolute",
        top: 35,
        color: "#237133"
    },
    field_size_text_width2: {
        fontSize: 16,
        fontWeight: '700',
        position: "absolute",
        bottom: 5,
        color: "#237133"
    },
    field_size_text_height1: {
        fontSize: 16,
        fontWeight: '700',
        position: "absolute",
        left: 0,
        bottom: 117,
        color: "#237133",
        transform: [{ rotate: '270deg' }]
    },
    field_size_text_height2: {
        fontSize: 16,
        fontWeight: '700',
        position: "absolute",
        right: 0,
        bottom: 117,
        color: "#237133",
        transform: [{ rotate: '-270deg' }]
    },
    parametrs: {
        width: "100%",
        marginTop: 10,
        backgroundColor: "#ffffff",
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderRadius: 20
    },
    parametrs_block: {
        flexDirection: "row",
        marginTop: 10,
        columnGap: 5,
        flexWrap: 'wrap'
    },
    fill_detail_mini_card: {
        alignSelf: "flex-start",
        borderRadius: 60,
        borderColor: "#237133",
        borderWidth: 1.5,
        paddingHorizontal: 8,
        paddingVertical: 3
    },
    description: {
        color: "#828282",
        fontWeight: "700",
        fontSize: 12,
        lineHeight: 18,
        marginTop: 5,
        width: "95%"
    },
    parametrs_map: {
        position: "relative",
        width: "100%",
        height: 350,
        alignItems: "center",
        marginTop: 10,
        backgroundColor: "#ffffff",
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        rowGap: 10
    },
    address_map: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "#B3B3B3",
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        columnGap: 10,
        borderRadius: 10
    },
    reviews: {
        height: 245,
        marginTop: 10,
        rowGap: 10,
    },
    review_title: {
        fontSize: 16
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
      bottom_navbar: {
        width: "100%",
        position: "absolute",
        height: "auto",
        bottom: 20,
        rowGap: 10,
        paddingHorizontal: 15
    },
});