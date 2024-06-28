import { useFonts } from 'expo-font';
import React, { useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';

export default function ListOrMap({ selected = 'list', setSelected }) {
  const animation = useRef(new Animated.Value(0)).current;

  const [fontsLoaded] = useFonts({
    'Rubik-400': require("../../../assets/fonts/Rubik-Regular.ttf"),
    'Rubik-500': require("../../../assets/fonts/Rubik-Medium.ttf")
  });

  const handleSwitch = (value) => {
    setSelected(value);
    Animated.timing(animation, {
      toValue: value === 'list' ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const switchInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '50%'],
  });

  return (
    <View style={styles.list_or_map}>
      <View style={[styles.container]}>
        <Animated.View style={[styles.animatedSwitch, { left: switchInterpolation }]} />
        <TouchableOpacity
          style={[styles.button, selected === 'list' && styles.selectedButton]}
          onPress={() => handleSwitch('list')}
        >
          <Text style={[styles.text, selected === 'list' && styles.selectedText]}>Список полей</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selected === 'map' && styles.selectedButton]}
          onPress={() => handleSwitch('map')}
        >
          <Text style={[styles.text, selected === 'map' && styles.selectedText]}>На карте</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  list_or_map: {
    width: "100%",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flexDirection: 'row',
    borderRadius: 20,
    overflow: 'hidden',
    width: 350,
    marginTop: 20,
    backgroundColor: '#e3e3e3',
    position: 'relative',
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 2
  },
  animatedSwitch: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    zIndex: 0,
  },
  button: {
    width: 170,
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    zIndex: 1,
  },
  selectedButton: {
    boxShadow: "0px 3px 8px 0px #0000001F"
  },
  text: {
    color: '#000',
    fontFamily: "Rubik-400"
  },
  selectedText: {
    color: 'black',
    fontWeight: 'bold',
    fontFamily: "Rubik-500"
  },
});