import React, { useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Linking } from 'react-native';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import PhoneSVG from '../../../assets/images/svgs/PhoneSVG';
import TelegramIcon from '../../../assets/images/svgs/TelegramSVG';
import CheckPIN from '../../components/CheckPIN/CheckPIN';
import { openTelegramBot } from '../../helpers/linkTelegram';
import { storeData } from '../../helpers/storeHelper';
import { useFonts } from 'expo-font';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../redux/slices/auth/authSlice';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const phoneInputRef = useRef(null);
  const [number, onChangeNumber] = React.useState('');
  const [checkPIN, setCheckPIN] = React.useState(false);
  const [pinTyped, setPinTyped] = React.useState(false);
  const [token, setToken] = React.useState(null);
  const user = useSelector(state => state.auth.user);

  const [fontsLoaded] = useFonts({
    'Rubik-400': require("../../../assets/fonts/Rubik-Regular.ttf"),
    'Rubik-500': require("../../../assets/fonts/Rubik-Medium.ttf"),
    'Rubik-600': require("../../../assets/fonts/Rubik-SemiBold.ttf"),
    'Rubik-700': require("../../../assets/fonts/Rubik-Bold.ttf")
  });

  const handleCheckPIN = () => {
    dispatch(signIn({ phone_number: number }));
    setCheckPIN(true);
  };

  const handleOpenURL = (event) => {
    const url = event.url;
    const accessToken = url.split('access_token=')[1]?.split('&')[0];
    const refreshToken = url.split('refresh_token=')[1];

    if (accessToken && refreshToken) {
      const tokenObject = { access: accessToken, refresh: refreshToken };
      setToken(tokenObject);
      storeData('token', JSON.stringify(tokenObject));
      navigation.navigate('Root');
    }
  };

  useEffect(() => {
    const handleOpenURLWrapper = ({ url }) => handleOpenURL({ url });

    Linking.addEventListener('url', handleOpenURLWrapper);

    Linking.getInitialURL().then((url) => {
      if (url) {
        handleOpenURL({ url });
      }
    });

    return () => {
      Linking.removeAllListeners('url', handleOpenURLWrapper);
    };
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <Header />
        <View style={styles.login_screen_block}>
          <View style={styles.container}>
            <View style={styles.switchContainer}>
              <Text style={styles.switchText} onPress={() => navigation.navigate('Register')}>Регистрация</Text>
              <Text style={[styles.switchText, styles.switchText_main]}>Вход</Text>
            </View>
            {checkPIN ? (
              <>
                <CheckPIN setPinTyped={setPinTyped} phoneNumber={number} />
                <View style={styles.flexGrow} />
                <View style={styles.btn_block}>
                  <Button pinTyped={pinTyped} onPress={() => navigation.navigate('Root')} title={'Продолжить'} />
                </View>
              </>
            ) : (
              <>
                <Text style={styles.input_text}>Вход через номер</Text>
                <View style={styles.inputs}>
                  <TouchableOpacity style={styles.input_block} onPress={() => phoneInputRef.current.focus()}>
                    <PhoneSVG style={styles.input_svg} />
                    <TextInput
                      ref={phoneInputRef}
                      style={styles.input}
                      onChangeText={onChangeNumber}
                      value={number}
                      placeholder="996 Введите свой номер"
                      keyboardType="numeric"
                      placeholderTextColor={"gray"}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.flexGrow} />
                <View style={styles.btn_block}>
                  <View style={styles.flex_telegram}>
                    <Text style={styles.flex_telegram_text}>Вход через</Text>
                    <TouchableOpacity onPress={openTelegramBot}>
                      <TelegramIcon />
                    </TouchableOpacity>
                  </View>
                  <Button title="Продолжить" onPress={handleCheckPIN} />
                </View>
              </>
            )}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  login_screen_block: {
    padding: 15,
    height: '85%',
    borderRadius: 20,
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    borderBottomWidth: 0.5,
    padding: 20,
  },
  switchText: {
    fontSize: 18,
    fontFamily: "Rubik-500"
  },
  switchText_main: {
    fontWeight: '700',
    fontFamily: "Rubik-700"
  },
  inputs: {
    padding: 20,
  },
  input: {
    height: 50,
    paddingHorizontal: 5,
    borderRadius: 10,
    flex: 1,
  },
  input_text: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  input_block: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#237133',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  input_svg: {
    marginRight: 10,
  },
  flexGrow: {
    flexGrow: 1,
  },
  btn_block: {
    padding: 20,
  },
  flex_telegram: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 10,
    marginBottom: 10,
  },
  flex_telegram_text: {
    fontSize: 16,
  },
});

export default LoginScreen;