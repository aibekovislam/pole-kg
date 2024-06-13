import React, { useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Linking } from 'react-native';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import PersonalSVG from '../../../assets/images/svgs/PersonalSVG.JSX';
import PhoneSVG from '../../../assets/images/svgs/PhoneSVG';
import TelegramIcon from '../../../assets/images/svgs/TelegramSVG';
import CheckPIN from '../../components/CheckPIN/CheckPIN';
import { openTelegramBot } from '../../helpers/linkTelegram';
import { storeData } from '../../helpers/storeHelper';

const LoginScreen = ({ navigation }) => {
  const nameInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const [number, onChangeNumber] = React.useState('');
  const [checkPIN, setCheckPIN] = React.useState(false);
  const [pinTyped, setPinTyped] = React.useState(false);
  const [token, setToken] = React.useState(null);

  const handleCheckPIN = () => {
    setCheckPIN(true);
  };

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
                <CheckPIN setPinTyped={setPinTyped} />
                <View style={styles.flexGrow} />
                <View style={styles.btn_block}>
                  <Button pinTyped={pinTyped} onPress={() => navigation.navigate('Home')} title={'Продолжить'} />
                </View>
              </>
            ) : (
              <>
                <Text style={styles.input_text}>Вход через номер</Text>
                <View style={styles.inputs}>
                  <TouchableOpacity style={styles.input_block} onPress={() => nameInputRef.current.focus()}>
                    <PersonalSVG style={styles.input_svg} />
                    <TextInput
                      ref={nameInputRef}
                      style={styles.input}
                      placeholder="Введите свое имя"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.input_block} onPress={() => phoneInputRef.current.focus()}>
                    <PhoneSVG style={styles.input_svg} />
                    <TextInput
                      ref={phoneInputRef}
                      style={styles.input}
                      onChangeText={onChangeNumber}
                      value={number}
                      placeholder="Введите свой номер"
                      keyboardType="numeric"
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
  },
  switchText_main: {
    fontWeight: '700',
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