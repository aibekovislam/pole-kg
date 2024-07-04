import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import BottomNavbar from '../../components/bottomNavbar/BottomNavbar';
import UserNavbar from '../../components/Header/UserNavbar';
import OutSvg from '../../../assets/images/svgs/OutSvg';
import { useDispatch } from 'react-redux';
import { deleteUser, patchUser } from '../../redux/slices/auth/authSlice';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

const defaultAvatar = "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";

const ProfilePatchScreen = ({ navigation, route }) => {
    const { user } = route.params;

    const [name, setName] = useState(user.name);
    const [phoneNumber, setPhoneNumber] = useState(user.phone_number);
    const [avatar, setAvatar] = useState(user.avatar || defaultAvatar);

    const dispatch = useDispatch();

    useEffect(() => {
        getGalleryPermission();
    }, []);

    const getGalleryPermission = async () => {
        if (Constants.platform?.ios) {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Нет разрешений', 'Извините, но вам нужно разрешить доступ к галерее, чтобы выбирать изображения.');
            }
        }
    };

    const handleBlur = () => {
        dispatch(patchUser({ name: name, phone_number: phoneNumber, avatar: avatar }));
    };

    const handleChooseAvatar = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
            
            if (!result.canceled) {
                setAvatar(result.uri);
                handleBlur();
            } else {
                if (!avatar) {
                    setAvatar(defaultAvatar);
                }
            }
        } catch (error) {
            console.log('ImagePicker Error: ', error);
            Alert.alert('Ошибка', 'Не удалось выбрать изображение. Попробуйте снова.');
        }
    };

    return (
        <View style={{ position: "relative" }}>
            <ScrollView style={{ paddingBottom: 120 }}>
                <UserNavbar user={user} />
                <View style={styles.profile_options_block}>
                    <View style={[styles.options, { position: "relative" }]}>
                        <Text style={{ color: "#237133", fontSize: 20, textAlign: 'left', marginTop: 10, fontFamily: "Rubik-500" }}>Редактировать аккаунт</Text>
                        <View style={{ flexDirection: "column", rowGap: 15 }}>
                            <View style={{ width: "100%", alignItems: "center", marginTop: 10 }} >
                                <TouchableOpacity style={{ justifyContent: "center", alignItems: "center" }} onPress={handleChooseAvatar}>
                                    <Image source={{ uri: avatar }} style={styles.avatar} />
                                    <Text style={{ color: "#0085FF", fontWeight: "500", marginTop: 5, textAlign: "center" }}>Изменить фото</Text>
                                </TouchableOpacity>
                            </View>
                            <FloatingLabelInput
                                label="Имя"
                                value={name}
                                onChangeText={value => setName(value)}
                                onBlur={handleBlur}
                                containerStyles={styles.inputContainer}
                                customLabelStyles={styles.labelStyles}
                                inputStyles={styles.inputStyles}
                            />
                            <FloatingLabelInput
                                label="Номер телефона"
                                value={phoneNumber}
                                onChangeText={value => setPhoneNumber(value)}
                                onBlur={handleBlur}
                                containerStyles={styles.inputContainer}
                                customLabelStyles={styles.labelStyles}
                                inputStyles={styles.inputStyles}
                                keyboardType="phone-pad"
                            />
                        </View>
                        <TouchableOpacity onPress={() => dispatch(deleteUser())} style={{ flexDirection: "row", columnGap: 10, position: "absolute", bottom: 20, left: 20 }}>
                            <OutSvg />
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