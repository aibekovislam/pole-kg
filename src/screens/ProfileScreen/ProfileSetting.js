import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import BottomNavbar from '../../components/bottomNavbar/BottomNavbar';
import UserNavbar from '../../components/Header/UserNavbar';
import { useFonts } from 'expo-font';
import NotificationSVG from '../../../assets/images/svgs/Notification';
import LngSvg from '../../../assets/images/svgs/LngSvg';

const ProfileSetting = ({ navigation, route }) => {
    const { user } = route.params

    const [isEnabled, setIsEnabled] = useState(true);
    const [ showLng, setShowLng ] = useState(false);
    const [isRussian, setIsRussian] = useState(true);
    const [isKyrgyz, setIsKyrgyz] = useState(false);

    const toggleShow = () => setShowLng(previousState => !previousState);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const [fontsLoaded] = useFonts({
        'Rubik-400': require("../../../assets/fonts/Rubik-Regular.ttf"),
        'Rubik-500': require("../../../assets/fonts/Rubik-Medium.ttf"),
    });

    const toggleRussian = () => {
        setIsRussian(!isRussian);
        if (!isRussian) {
            setIsKyrgyz(false);
        }
    };
    
    const toggleKyrgyz = () => {
        setIsKyrgyz(!isKyrgyz);
        if (!isKyrgyz) {
            setIsRussian(false);
        }
    };    

    return (
        <View style={{ position: "relative" }}>
            <ScrollView style={{paddingBottom: 120}}>
                <UserNavbar user={user} />
                <View style={styles.profile_options_block}>
                <View style={styles.options}>
                    <Text style={{ color: "#237133", fontSize: 20, textAlign: 'left', marginTop: 10, fontFamily: "Rubik-500" }}>Настройки</Text>
                    <TouchableOpacity style={[styles.option, { justifyContent: "space-between", paddingBottom: 10 }]}>
                        <View style={{ flexDirection: "row", columnGap: 10, alignItems: "center" }}>
                            <NotificationSVG/>
                            <Text style={{ fontSize: 16, fontFamily: "Rubik-400" }}>Уведомление</Text>
                        </View>
                        <Switch
                            trackColor={{ false: '#767577', true: '#237133' }}
                            thumbColor={isEnabled ? '#fff' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option} onPress={toggleShow}>
                        <LngSvg/>
                        <Text style={{ fontSize: 16, fontFamily: "Rubik-400" }}>Язык</Text>
                    </TouchableOpacity>
                    { showLng && (
                        <View style={{ marginTop: 20 }}>
                            <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={{ fontFamily: "Rubik-400" }}>Русский язык</Text>
                                <Switch
                                    trackColor={{ false: '#767577', true: '#237133' }}
                                    thumbColor={isRussian ? '#fff' : '#f4f3f4'}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleRussian}
                                    value={isRussian}
                                />
                            </View>
                            <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={{ fontFamily: "Rubik-400" }}>Кыргыз тили</Text>
                                <Switch
                                    trackColor={{ false: '#767577', true: '#237133' }}
                                    thumbColor={isKyrgyz ? '#fff' : '#f4f3f4'}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleKyrgyz}
                                    value={isKyrgyz}
                                />
                            </View>
                        </View>
                    ) }
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
      paddingVertical: 20,
      alignItems: "center"
    }
});

export default ProfileSetting;