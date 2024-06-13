import React, { useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import PersonalSVG from '../../../assets/images/svgs/PersonalSVG.JSX';
import PhoneSVG from '../../../assets/images/svgs/PhoneSVG';
import TelegramIcon from '../../../assets/images/svgs/TelegramSVG';
import CheckPIN from '../../components/CheckPIN/CheckPIN';
import { openTelegramBot } from '../../helpers/linkTelegram';

const RegisterScreen = ({ navigation }) => {
  const nameInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const [number, onChangeNumber] = React.useState('');
  const [ checkPIN, setCheckPIN ] = React.useState(false);
  const [ pinTyped, setPinTyped ] = React.useState(false);

  const handleCheckPIN = () => {
    setCheckPIN(true);
  }

  return (
    <View>
      <Header />
      <View style={styles.login_screen_block}>
        <View style={styles.container}>
          <View style={styles.switchContainer}>
            <Text style={[styles.switchText, styles.switchText_main]} onPress={() => navigation.navigate('Register')}>Регистрация</Text>
            <Text style={styles.switchText} onPress={() => navigation.navigate('Login')}>Вход</Text>
          </View>
          { checkPIN ? (
            <>
              <CheckPIN setPinTyped={setPinTyped} />
              <View style={styles.flexGrow}/>
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
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.flexGrow} />
              <View style={styles.btn_block}>
                <View style={styles.flex_telegram}>
                  <Text style={styles.flex_telegram_text}>Регистрация через</Text>
                  <TouchableOpacity onPress={() => openTelegramBot()}>
                    <TelegramIcon />
                  </TouchableOpacity>
                </View>
                <Button title="Продолжить" onPress={handleCheckPIN} />
              </View>
            </>
          ) }
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  login_screen_block: {
    padding: 15,
    height: '88.5%',
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 10,
    marginBottom: 10
  }
});

export default RegisterScreen;