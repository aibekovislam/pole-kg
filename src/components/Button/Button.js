import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ onPress, title, pinTyped = true }) => {
  return (
    <TouchableOpacity 
      style={[styles.button, pinTyped ? {opacity: 1} : {opacity: 0.5}]} 
      onPress={pinTyped ? onPress : null} 
      disabled={!pinTyped}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 60,
    backgroundColor: '#237133',
    padding: 15,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Button;