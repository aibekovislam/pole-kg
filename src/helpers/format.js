import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";

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