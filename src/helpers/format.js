export const formatSlot = (start_time, end_time) => {
    const startTime = new Date(start_time);
    const endTime = new Date(end_time);
    const options = { hour: '2-digit', minute: '2-digit', hour12: false };

    return `с ${startTime.toLocaleTimeString([], options)} до ${endTime.toLocaleTimeString([], options)}`
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