import feastHeroAxios from '../axios/feast-hero-axios';

import { ALL_CLASSES } from '../../constants/api-constants';

async function fetchAllClasses() {
    const classesReponse = await feastHeroAxios.get(ALL_CLASSES, { withCredentials: true })
        .then((response) => response)
        .catch((_) => ({ error: true }));

    if (classesReponse.error)
        return false;

    return classesReponse.data.response;
}


export { fetchAllClasses };