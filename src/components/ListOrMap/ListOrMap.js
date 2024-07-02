import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function ListOrMap({ selected = 'list', setSelected }) {
  const handleSwitch = (value) => {
    setSelected(value);
  };

  return (
    <View style={styles.list_or_map}>
      <View style={[styles.container]}>
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
  button: {
    width: 170,
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    elevation: 3,
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