import dateTimeToString from "./date-time-to-string";

export default function formatClassSchedule(classData) {
    for (let i = 0; i < classData.schedule.length; i++) {
        classData.schedule[i].dateTime = dateTimeToString(classData.schedule[i].dateTime);
    }
    return classData;
} 