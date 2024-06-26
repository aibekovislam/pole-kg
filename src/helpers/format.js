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