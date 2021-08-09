import feastHeroAxios from '../axios/feast-hero-axios';

import { ALL_CLASSES, FILTER_CLASSES } from '../../constants/api-constants';

async function fetchAllClasses() {
    const classesReponse = await feastHeroAxios.get(ALL_CLASSES, { withCredentials: true })
        .then((response) => response)
        .catch((_) => ({ error: true }));

    if (classesReponse.error)
        return false;

    return classesReponse.data;
}

async function filterClasses(filter, value) {
    const response = await feastHeroAxios.get(`${FILTER_CLASSES}?filter=${filter}&value=${value}`)
        .then((response) => response)
        .catch((_) => ({ error: true }));

    if (response.error)
        return false;

    return response.data;
}


export { fetchAllClasses, filterClasses };