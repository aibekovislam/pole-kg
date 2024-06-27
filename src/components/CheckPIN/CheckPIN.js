import { useFonts } from 'expo-font';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { verifyUser } from '../../redux/slices/auth/authSlice';
import { useDispatch } from 'react-redux';

const CheckPIN = ({ setPinTyped, phoneNumber }) => {
    const dispatch = useDispatch();
    const input1Ref = useRef(null);
    const input2Ref = useRef(null);
    const input3Ref = useRef(null);
    const input4Ref = useRef(null);

    const [errorPIN, setErrorPIN] = useState(false);
    const [pinValues, setPinValues] = useState(['', '', '', '']);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [fontsLoaded] = useFonts({
        'Rubik-400': require("../../../assets/fonts/Rubik-Regular.ttf"),
        'Rubik-500': require("../../../assets/fonts/Rubik-Medium.ttf"),
        'Rubik-600': require("../../../assets/fonts/Rubik-SemiBold.ttf"),
        'Rubik-700': require("../../../assets/fonts/Rubik-Bold.ttf")
    });

    useEffect(() => {
        const allFieldsFilled = pinValues.every(value => value.length === 1);
        setPinTyped(allFieldsFilled);

        if (allFieldsFilled && !isSubmitting) {
            dispatch(verifyUser({ pin: pinValues.join(''), number: phoneNumber }));
        }
    }, [pinValues]);

    const handleTextChange = (text, index, nextRef) => {
        const newPinValues = [...pinValues];
        newPinValues[index] = text;
        setPinValues(newPinValues);

        if (text.length === 1 && nextRef) {
            nextRef.current && nextRef.current.focus();
        }
    };

    const handleKeyPress = (e, index, currentRef, prevRef) => {
        if (e.nativeEvent.key === 'Backspace' && prevRef) {
            const newPinValues = [...pinValues];
            newPinValues[index] = '';
            setPinValues(newPinValues);
            prevRef.current && prevRef.current.focus();
        }
    };

    return (
        <View style={styles.checkPIN}>
            <View style={styles.checkPIN_block}>
                <Text style={styles.check_pin_text}>Введите код подтверждение</Text>
                <View style={styles.check_pin_code_details}>
                    <TextInput 
                        ref={input1Ref}
                        style={styles.check_pin_code_detail} 
                        placeholder='0' 
                        placeholderTextColor={errorPIN ? '#CA3737' : '#237133'}
                        maxLength={1} 
                        keyboardType="numeric" 
                        onChangeText={(text) => handleTextChange(text, 0, input2Ref)}
                        onKeyPress={(e) => handleKeyPress(e, 0, input1Ref, null)}
                        value={pinValues[0]}
                    />
                    <TextInput 
                        ref={input2Ref}
                        style={styles.check_pin_code_detail} 
                        placeholder='0' 
                        placeholderTextColor={errorPIN ? '#CA3737' : '#237133'}
                        maxLength={1} 
                        keyboardType="numeric" 
                        onChangeText={(text) => handleTextChange(text, 1, input3Ref)}
                        onKeyPress={(e) => handleKeyPress(e, 1, input2Ref, input1Ref)}
                        value={pinValues[1]}
                    />
                    <TextInput 
                        ref={input3Ref}
                        style={styles.check_pin_code_detail} 
                        placeholder='0' 
                        placeholderTextColor={errorPIN ? '#CA3737' : '#237133'} 
                        maxLength={1} 
                        keyboardType="numeric" 
                        onChangeText={(text) => handleTextChange(text, 2, input4Ref)}
                        onKeyPress={(e) => handleKeyPress(e, 2, input3Ref, input2Ref)}
                        value={pinValues[2]}
                    />
                    <TextInput 
                        ref={input4Ref}
                        style={styles.check_pin_code_detail} 
                        placeholder='0' 
                        placeholderTextColor={errorPIN ? '#CA3737' : '#237133'}
                        maxLength={1} 
                        keyboardType="numeric" 
                        onChangeText={(text) => handleTextChange(text, 3, { current: null })}
                        onKeyPress={(e) => handleKeyPress(e, 3, input4Ref, input3Ref)}
                        value={pinValues[3]}
                    />
                </View>
                {errorPIN ? (
                    <View style={styles.checkPIN_error}>
                        <Text style={styles.error_pin}>Неверный код</Text>
                        <Text style={styles.new_pin}>Запросить новый код</Text>
                    </View>
                ) : (null)}
                <Text style={styles.checkPIN_info}>Код подтверждения придет к вам в номер телефона в виде сообщения</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    checkPIN: {
        paddingHorizontal: 10,
    },
    check_pin_text: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "500",
        fontFamily: "Rubik-500"
    },
    check_pin_code_details: {
        marginTop: 15,
        width: '100%',
        height: 'auto',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    check_pin_code_detail: {
        borderColor: "#237133",
        color: "#237133",
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: 75,
        height: 75,
        borderRadius: 20,
        fontWeight: "500",
        fontSize: 32,
        textAlign: "center"
    },
    checkPIN_info: {
        marginTop: 10,
        color: "#828282",
        fontWeight: "400",
        width: 300,
        fontFamily: "Rubik-400"
    },
    checkPIN_error: {
        marginTop: 10,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
    },
    error_pin: {
        color: "#CA3737",
        fontFamily: "Rubik-400"
    },
    new_pin: {
        color: "#0085FF",
        fontFamily: "Rubik-400"
    }
});

export default CheckPIN;