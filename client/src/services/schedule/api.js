import { ADD_TIME_SLOT, DELETE_TIME_SLOT_PREFIX } from "../../constants/api-constants";
import feastHeroAxios from '../axios/feast-hero-axios';

export async function addTimeSlot(classId, dateTime) {
    const response = await feastHeroAxios.post(ADD_TIME_SLOT, { dateTime: dateTime, classId: classId }, { withCredentials: true })
        .then((response) => response)
        .catch((_) => ({ error: true }));

    if (response.error)
        return false;

    return response.data;
}

export async function deleteTimeSlot(timeSlotId, classId) {
    const response = await feastHeroAxios.delete(`${DELETE_TIME_SLOT_PREFIX}/${timeSlotId}`, { data: {classId: classId}, withCredentials: true })
        .then((response) => response)
        .catch((error) => ({ error: error.response }));

    return response;
}