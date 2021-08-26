import feastHeroAxios from '../axios/feast-hero-axios';

import { ALL_CLASSES_FILTERED_FOR_BOOKING, DELETE_CLASS_PREFIX, NEW_CLASS, UPDATE_CLASS_PREFIX, ADD_TIME_SLOT_PREFIX, FIND_CLASS_FOR_BOOKING_PAGE_PREFIX, DELETE_TIME_SLOT } from '../../constants/api-constants';
import formDataFromObject from '../../helpers/form-data-from-object';

async function getAllClassesForBooking() {
    const response = await feastHeroAxios.get(ALL_CLASSES_FILTERED_FOR_BOOKING, { withCredentials: true })
        .then((response) => response.data)
        .catch((_) => ({ error: true }));

    return response;
}

async function deleteClass(id) {
    const response = await feastHeroAxios.delete(`${DELETE_CLASS_PREFIX}/${id}`, { withCredentials: true })
        .then((response) => response)
        .catch((err) => ({ error: err.response }))

    return response;
}

async function updateClass(id, newClassData) {
    const response = await feastHeroAxios.patch(`${UPDATE_CLASS_PREFIX}/${id}`, formDataFromObject(newClassData), { withCredentials: true })
        .then((response) => response)
        .catch((err) => ({ error: err.response }));

    return response;
}

async function newClass(classData) {
    const response = await feastHeroAxios.post(NEW_CLASS, formDataFromObject(classData), { withCredentials: true })
        .then((response) => response)
        .catch((err) => ({ error: err.response }));

    return response;
}

async function addTimeSlot(classId, dateTime) {
    const response = await feastHeroAxios.post(`${ADD_TIME_SLOT_PREFIX}/${classId}`, { dateTime: dateTime, available: true }, { withCredentials: true })
        .then((response) => response.data)
        .catch((err) => { console.log(err); return { error: true } });

    return response;
}

async function deleteTimeSlot(timeSlotId, classId) {
    const response = await feastHeroAxios.delete(DELETE_TIME_SLOT(classId, timeSlotId), { withCredentials: true })
        .then((response) => response)
        .catch((error) => ({ error: error.response }));

    return response;
}

async function getClassForBooking(classId) {
    const response = await feastHeroAxios.get(`${FIND_CLASS_FOR_BOOKING_PAGE_PREFIX}/${classId}`, { withCredentials: true })
        .then((response) => response.data)
        .catch((_) => ({ error: true }));

    return response
}

export { getAllClassesForBooking, deleteClass, updateClass, newClass, addTimeSlot, deleteTimeSlot, getClassForBooking };