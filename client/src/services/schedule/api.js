import { ADD_SCHEDULE, DELETE_SCHEDULE_PREFIX } from "../../constants/api-constants";
import feastHeroAxios from '../axios/feast-hero-axios';

export async function addSchedule(classId, dateTime) {
    const response = await feastHeroAxios.post(ADD_SCHEDULE, { dateTime: dateTime, classId: classId }, { withCredentials: true })
        .then((response) => response)
        .catch((_) => ({ error: true }));

    if (response.error)
        return false;

    return response.data;
}

export async function deleteSchedule(scheduleId) {
    const response = await feastHeroAxios.delete(`${DELETE_SCHEDULE_PREFIX}/${scheduleId}`, { withCredentials: true })
        .then((response) => response)
        .catch((error) => ({ error: error.response }));

    return response;
}