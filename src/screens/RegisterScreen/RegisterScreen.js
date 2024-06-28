import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Linking } from 'react-native';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import PersonalSVG from '../../../assets/images/svgs/PersonalSVG.JSX';
import PhoneSVG from '../../../assets/images/svgs/PhoneSVG';
import TelegramIcon from '../../../assets/images/svgs/TelegramSVG';
import CheckPIN from '../../components/CheckPIN/CheckPIN';
import { openTelegramBot } from '../../helpers/linkTelegram';
import { useFonts } from 'expo-font';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../redux/slices/auth/authSlice';

const RegisterScreen = ({ navigation }) => {
  const nameInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const [number, onChangeNumber] = useState('');
  const [name, setName] = useState('');
  const [checkPIN, setCheckPIN] = useState(false);
  const [pinTyped, setPinTyped] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = React.useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state => state.auth.user))

  const [fontsLoaded] = useFonts({
    'Rubik-400': require("../../../assets/fonts/Rubik-Regular.ttf"),
    'Rubik-500': require("../../../assets/fonts/Rubik-Medium.ttf"),
    'Rubik-600': require("../../../assets/fonts/Rubik-SemiBold.ttf"),
    'Rubik-700': require("../../../assets/fonts/Rubik-Bold.ttf")
  });

  const handleOpenURL = (event) => {
    const url = event.url;
    const token = url.split('token=')[1];
    if (token) {
      setToken(token);
      storeData('token', JSON.stringify(token));
      navigation.navigate('Home');
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
  
  useEffect(() => {
    if(user && fontsLoaded) {
      navigation.navigate('Home')
    }
  }, [user])

  if (!fontsLoaded) {
    return null;
  }

  const handleRegisterSubmit = async () => {
    try {
      const resultAction = await dispatch(signUp({ name, number }));
      if (signUp.fulfilled.match(resultAction)) {
        console.log('User registered successfully:', resultAction.payload);
      } else {
        if (resultAction.payload && resultAction.payload.phone_number) {
          setError(resultAction.payload.phone_number[0]);
        } else {
          setError('Произошла ошибка при регистрации');
        }
      }
      setCheckPIN(true);
    } catch (err) {
      console.log(err)
      setError('Этот номер телефона уже зарегистрирован');
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <Header />
        <View style={styles.login_screen_block}>
          <View style={styles.container}>
            <View style={styles.switchContainer}>
              <Text style={[styles.switchText, styles.switchText_main]} onPress={() => navigation.navigate('Register')}>Регистрация</Text>
              <Text style={styles.switchText} onPress={() => navigation.navigate('Login')}>Вход</Text>
            </View>
            {checkPIN ? (
              <>
                <CheckPIN setPinTyped={setPinTyped} phoneNumber={number} />
                <View style={styles.flexGrow} />
                <View style={styles.btn_block}>
                  <Button pinTyped={pinTyped} onPress={() => navigation.navigate('Home')} title={'Продолжить'} />
                </View>
              </>
            ) : (
              <>
                <Text style={styles.input_text}>Регистрация через номер</Text>
                <View style={styles.inputs}>
                  <TouchableOpacity style={styles.input_block} onPress={() => nameInputRef.current.focus()}>
                    <PersonalSVG style={styles.input_svg} />
                    <TextInput
                      ref={nameInputRef}
                      style={styles.input}
                      placeholder="Введите свое имя"
                      placeholderTextColor={"gray"}
                      value={name}
                      onChangeText={setName}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.input_block} onPress={() => phoneInputRef.current.focus()}>
                    <PhoneSVG style={styles.input_svg} />
                    <TextInput
                      ref={phoneInputRef}
                      style={styles.input}
                      onChangeText={onChangeNumber}
                      value={number}
                      keyboardType="numeric"
                      placeholder="Введите свой номер"
                      placeholderTextColor={"gray"}
                    />
                  </TouchableOpacity>
                </View>
                {error ? (
                  <Text style={styles.errorText}>{error}</Text>
                ) : null}
                <View style={styles.flexGrow} />
                <View style={styles.btn_block}>
                  <View style={styles.flex_telegram}>
                    <Text style={styles.flex_telegram_text}>Регистрация через</Text>
                    <TouchableOpacity onPress={openTelegramBot}>
                      <TelegramIcon />
                    </TouchableOpacity>
                  </View>
                  <Button title="Продолжить" onPress={handleRegisterSubmit} />
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
    height: "85%",
    padding: 15,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 10,
    marginBottom: 10
  },
  flex_telegram_text: {
    fontFamily: "Rubik-400"
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  }
});

export default RegisterScreen;