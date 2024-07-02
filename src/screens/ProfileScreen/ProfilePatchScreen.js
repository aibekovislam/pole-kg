import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import BottomNavbar from '../../components/bottomNavbar/BottomNavbar';
import UserNavbar from '../../components/Header/UserNavbar';
import OutSvg from '../../../assets/images/svgs/OutSvg';

const ProfilePatchScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    return (
        <View style={{ position: "relative" }}>
            <ScrollView style={{paddingBottom: 120}}>
                <UserNavbar/>
                <View style={styles.profile_options_block}>
                <View style={[styles.options, { position: "relative" } ]}>
                    <Text style={{ color: "#237133", fontSize: 20, textAlign: 'left', marginTop: 10, fontFamily: "Rubik-500" }}>Редактировать аккаунт</Text>
                    <View style={{ flexDirection: "column", rowGap: 15 }}>
                        <View style={{ width: "100%", alignItems: "center", marginTop: 10 }} >
                            <Image source={{ uri: "https://tse1.mm.bing.net/th/id/OET.7252da000e8341b2ba1fb61c275c1f30?w=594&h=594&c=7&rs=1&o=5&pid=1.9" }} style={styles.avatar} />
                            <Text style={{ color: "#0085FF", fontWeight: "500", marginTop: 5 }}>Изменить фото</Text>
                        </View>
                        <FloatingLabelInput
                            label="Имя"
                            value={name}
                            onChangeText={value => setName(value)}
                            containerStyles={styles.inputContainer}
                            customLabelStyles={styles.labelStyles}
                            inputStyles={styles.inputStyles}
                        />
                        <FloatingLabelInput
                            label="Номер телефона"
                            value={phoneNumber}
                            onChangeText={value => setPhoneNumber(value)}
                            containerStyles={styles.inputContainer}
                            customLabelStyles={styles.labelStyles}
                            inputStyles={styles.inputStyles}
                            keyboardType="phone-pad"
                        />
                    </View>
                    <TouchableOpacity style={{ flexDirection: "row", columnGap: 10, position: "absolute", bottom: 20, left: 20 }}>
                        <OutSvg/>
                        <Text style={{ color: "#CA3737", fontWeight: "500", fontSize: 16 }}>Удалить аккаунт</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </ScrollView>
            <View style={styles.bottom_navbar}>
                <BottomNavbar navigation={navigation} item={"profile"} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    bottom_navbar: {
        width: "100%",
        position: "absolute",
        height: "auto",
        bottom: 20,
        rowGap: 10,
        paddingHorizontal: 15,
    },
    profile_options_block: {
      flex: 1,
      width: "100%",
      paddingHorizontal: 15,
      marginTop: 10
    },
    options: {
      width: "100%",
      height: 625,
      backgroundColor: "#ffffff",
      borderRadius: 20,
      paddingHorizontal: 15,
    },
    option: {
      flexDirection: "row",
      columnGap: 10,
      width: "100%",
      borderBottomWidth: 1,
      borderBottomColor: "#B3B3B3",
      paddingVertical: 20
    },
    inputContainer: {
        borderWidth: 0.5,
        borderRadius: 10,
        height: 60,
        borderColor: "#B3B3B3",
        paddingLeft: 10,
        paddingTop: 10
    },
    labelStyles: {
        paddingTop: 10,
        color: "#828282"
    },
    inputStyles: {
        color: "#181818",
        fontWeight: "500",
        fontSize: 16
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 100
    }
});

export default ProfilePatchScreen;