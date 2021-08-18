import { ADD_SCHEDULE } from "../../constants/api-constants";
import feastHeroAxios from '../axios/feast-hero-axios';

export async function addSchedule(classId, dateTime) {
    const response = await feastHeroAxios.post(ADD_SCHEDULE, { dateTime: dateTime, classId: classId }, { withCredentials: true })
        .then((response) => response)
        .catch((_) => ({ error: true }));

    if (response.error)
        return false;

    return response.data;
}