import feastHeroAxios from '../axios/feast-hero-axios';

import { ALL_CLASSES_FILTERED_FOR_BOOKING, DELETE_CLASS_PREFIX, NEW_CLASS, UPDATE_CLASS_PREFIX } from '../../constants/api-constants';
import formDataFromObject from '../../helpers/form-data-from-object';

async function getAllClassesForBooking() {
    const classesReponse = await feastHeroAxios.get(ALL_CLASSES_FILTERED_FOR_BOOKING, { withCredentials: true })
        .then((response) => response)
        .catch((_) => ({ error: true }));

    if (classesReponse.error)
        return false;

    return classesReponse.data;
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

export { getAllClassesForBooking, deleteClass, updateClass, newClass };