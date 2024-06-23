import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const TimePickerComponent = ({ payBlocked = false, backgroundColor = '#ffffff', onFromTimeChange, onToTimeChange }) => {
  const formatTime = (date) => {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };  

  const [fromTime, setFromTime] = useState(new Date());
  const [toTime, setToTime] = useState(new Date());
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [fromTimeString, setFromTimeString] = useState(formatTime(new Date()));
  const [toTimeString, setToTimeString] = useState(formatTime(new Date()));

  const showFromTimePicker = () => {
    setShowFromPicker(true);
  };

  const hideFromTimePicker = () => {
    setShowFromPicker(false);
  };

  const handleFromTimeConfirm = (date) => {
    setFromTime(date);
    setFromTimeString(formatTime(date));
    onFromTimeChange({ hours: date.getHours().toString().padStart(2, '0'), minutes: date.getMinutes().toString().padStart(2, '0') });
    hideFromTimePicker();
  };
    
  const showToTimePicker = () => {
    setShowToPicker(true);
  };

  const hideToTimePicker = () => {
    setShowToPicker(false);
  };

  const handleToTimeConfirm = (date) => {
    setToTime(date);
    setToTimeString(formatTime(date));
    onToTimeChange({ hours: date.getHours().toString().padStart(2, '0'), minutes: date.getMinutes().toString().padStart(2, '0') });
    hideToTimePicker();
  };

  return (
    <View style={styles.container}>
      {payBlocked ? null : <Text style={styles.label}>Укажите время</Text>}
      <View style={styles.timePickerRow}>
        <TouchableOpacity style={[styles.timeButton, { backgroundColor }]} onPress={showFromTimePicker}>
          <Text style={styles.timeButton_text}>{`с ${fromTimeString}`}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.timeButton, { backgroundColor }]} onPress={showToTimePicker}>
          <Text style={styles.timeButton_text}>{`до ${toTimeString}`}</Text>
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={showFromPicker}
        mode="time"
        display="spinner"
        locale="ru"
        is24Hour={true}
        onConfirm={handleFromTimeConfirm}
        onCancel={hideFromTimePicker}
        buttonTextColorIOS="#237133"
        isDarkModeEnabled={false}
        textColor='#237133'
      />

      <DateTimePickerModal
        isVisible={showToPicker}
        mode="time"
        display="spinner"
        locale="ru"
        is24Hour={true}
        onConfirm={handleToTimeConfirm}
        onCancel={hideToTimePicker}
        buttonTextColorIOS="#237133"
        isDarkModeEnabled={false}
        textColor='#237133'
      />

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
  },
  timeButton_text: {
    fontSize: 15,
    fontWeight: '700',
    color: '#828282',
  },
});

export default TimePickerComponent;