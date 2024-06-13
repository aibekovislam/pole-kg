import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const TimePickerComponent = () => {
  const [fromTime, setFromTime] = useState({ hours: '00', minutes: '00' });
  const [toTime, setToTime] = useState({ hours: '00', minutes: '00' });
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const updateToTime = (selectedTime) => {
    if (selectedTime.hours > toTime.hours || (selectedTime.hours === toTime.hours && selectedTime.minutes > toTime.minutes)) {
      setToTime(selectedTime);
    }
    setFromTime(selectedTime);
  };

  const renderPicker = (selectedTime, setSelectedTime, minTime) => (
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedTime.hours}
        style={styles.picker}
        onValueChange={(itemValue) => {
          const newTime = { ...selectedTime, hours: itemValue };
          setSelectedTime(newTime);
        }}
      >
        {Array.from({ length: 24 }, (_, i) => {
          const value = `${i < 10 ? '0' : ''}${i}`;
          return (
            <Picker.Item
              key={i}
              label={value}
              value={value}
              enabled={!minTime || value >= minTime.hours}
            />
          );
        })}
      </Picker>
      <Text style={styles.separator}>:</Text>
      <Picker
        selectedValue={selectedTime.minutes}
        style={styles.picker}
        onValueChange={(itemValue) => {
          const newTime = { ...selectedTime, minutes: itemValue };
          setSelectedTime(newTime);
        }}
      >
        {Array.from({ length: 60 }, (_, i) => {
          const value = `${i < 10 ? '0' : ''}${i}`;
          return (
            <Picker.Item
              key={i}
              label={value}
              value={value}
              enabled={
                !minTime ||
                selectedTime.hours > minTime.hours ||
                (selectedTime.hours === minTime.hours && value >= minTime.minutes)
              }
            />
          );
        })}
      </Picker>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Укажите время и дату</Text>
      <View style={styles.timePickerRow}>
        <TouchableOpacity style={styles.timeButton} onPress={() => setShowFromPicker(true)}>
          <Text style={styles.timeButton_text}>{`с ${fromTime.hours}:${fromTime.minutes}`}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.timeButton} onPress={() => setShowToPicker(true)}>
          <Text style={styles.timeButton_text}>{`до ${toTime.hours}:${toTime.minutes}`}</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showFromPicker} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {renderPicker(fromTime, updateToTime)}
            <TouchableOpacity onPress={() => setShowFromPicker(false)}>
              <Text style={styles.doneButton}>Готово</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={showToPicker} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {renderPicker(toTime, setToTime, fromTime)}
            <TouchableOpacity onPress={() => setShowToPicker(false)}>
              <Text style={styles.doneButton}>Готово</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'left',
    width: '100%',
    marginTop: 10,
  },
  timePickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  timeButton: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    width: '47%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15,
    fontWeight: '700',
  },
  timeButton_text: {
    fontSize: 15,
    fontWeight: '700',
    color: '#828282',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {
    width: 100,
    height: 200,
  },
  separator: {
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  doneButton: {
    marginTop: 20,
    fontSize: 18,
    color: 'blue',
  },
});

export default TimePickerComponent;