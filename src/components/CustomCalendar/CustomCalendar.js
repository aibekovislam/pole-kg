import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['ru'] = {
  monthNames: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ],
  monthNamesShort: ['Янв.', 'Фев.', 'Март', 'Апр.', 'Май', 'Июнь', 'Июль', 'Авг.', 'Сен.', 'Окт.', 'Нояб.', 'Дек.'],
  dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
  dayNamesShort: ['Вс.', 'Пн.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Сб.']
};

LocaleConfig.defaultLocale = 'ru';

const CustomCalendar = ({ isVisible, onClose, onDateSelect, fields_available_month }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDayPress = (day) => {
    const formattedDate = day.dateString; // This is already in the format YYYY-MM-DD
    setSelectedDate(formattedDate);
    onDateSelect(formattedDate);
    onClose();
  };

  const getCurrentMonth = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    return `${year}-${month < 10 ? `0${month}` : month}`;
  };

  const isDateInPast = (dateString) => {
    const today = new Date();
    const date = new Date(dateString);
    return date < today.setHours(0, 0, 0, 0);
  };

  const markDates = () => {
    const markedDates = {};
    if (fields_available_month && fields_available_month.days_status) {
      for (const [day, status] of Object.entries(fields_available_month.days_status)) {
        const dateString = `${getCurrentMonth()}-${day.padStart(2, '0')}`;
        if (isDateInPast(dateString)) {
          markedDates[dateString] = { disabled: true };
        } else {
          markedDates[dateString] = {
            selected: false,
            marked: true,
            dotColor: status === 'fully available' ? 'green' : 'red',
            disabled: false,
          };
        }
      }
    }
    if (selectedDate) {
      markedDates[selectedDate] = { selected: true, marked: true, selectedColor: '#237133', dotColor: '#237133' };
    }
    return markedDates;
  };

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.calendarContainer}>
          <Calendar
            current={getCurrentMonth()}
            onDayPress={handleDayPress}
            markedDates={markDates()}
            hideArrows={true}
            hideExtraDays={true}
            disableMonthChange={true}
            theme={{
              selectedDayBackgroundColor: '#237133',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#237133',
              arrowColor: '#237133',
              dotColor: '#237133',
              selectedDotColor: '#ffffff',
            }}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Закрыть</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  calendarContainer: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#237133',
    borderRadius: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CustomCalendar;