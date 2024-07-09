import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import moment from "moment";

export const formatSlot = (start_time, end_time) => {
    const startTime = parseISO(start_time);
    const endTime = parseISO(end_time);

    const formattedStartTime = format(startTime, 'HH:mm', { locale: ru });
    const formattedEndTime = format(endTime, 'HH:mm', { locale: ru });

    return `с ${formattedStartTime} до ${formattedEndTime}`;
}

export const formatSlotStart = (start_time) => {
    const startTime = new Date(start_time);

    return {
        hours: startTime.getHours().toString().padStart(2, '0'),
        minutes: startTime.getMinutes().toString().padStart(2, '0')
    };
}

export const formatSlotEnd = (end_time) => {
    const endTime = new Date(end_time);

    return {
        hours: endTime.getHours().toString().padStart(2, '0'),
        minutes: endTime.getMinutes().toString().padStart(2, '0')
    };
}

export function convertTimeStringToJSON(timeString) {
    function pad(number) {
      return number < 10 ? '0' + number : number;
    }
  
    const currentDate = new Date();
  
    const times = timeString.match(/(\d{2}):(\d{2})/g);
  
    const startHours = parseInt(times[0].split(':')[0], 10);
    const startMinutes = parseInt(times[0].split(':')[1], 10);
  
    const endHours = parseInt(times[1].split(':')[0], 10);
    const endMinutes = parseInt(times[1].split(':')[1], 10);
  
    const startTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), startHours, startMinutes);
    const endTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), endHours, endMinutes);
  
    const startISO = startTime.toISOString();
    const endISO = endTime.toISOString();
  
    const result = {
      start_time: startISO,
      end_time: endISO
    };
  
    return result;
}  

export const formatDateToYYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};


export const formatDateTimeStart = (dateTimeString) => {
    const date = new Date(dateTimeString);
  
    const timeString = date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  
    return `с ${timeString}`;
}

export const formatDateTimeEnd = (dateTimeString) => {
    const date = new Date(dateTimeString);
  
    const timeString = date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  
    return `до ${timeString}`;
}
  

export const calculateTimeDifference = (endTimeString) => {
    const endTime = moment(endTimeString); // Parse endTimeString using moment.js

    const now = moment(); // Current time

    const timeDifference = moment.duration(endTime.diff(now)); // Difference between endTime and now

    const hours = Math.floor(timeDifference.asHours()); // Total hours difference
    const minutes = timeDifference.minutes(); // Minutes within the last hour

    return { hours, minutes };
}
  
export const formatTimeDifference = ({ hours, minutes }) => {
    let result = "";
  
    if (hours > 0) {
      result += `${hours} часов `;
    }
  
    if (minutes > 0) {
      result += `${minutes} минут`;
    }
  
    return result.trim();
}  