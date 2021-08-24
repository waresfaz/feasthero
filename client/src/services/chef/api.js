import { ALL_CHEFS_CLASSES, FIND_CLASS_FOR_CHEF_PREFIX } from '../../constants/api-constants';
import feastHeroAxios from '../axios/feast-hero-axios';

export async function allChefsClasses() {
    const response = await feastHeroAxios.get(ALL_CHEFS_CLASSES, { withCredentials: true })
        .then((response) => response)
        .catch((_) => ({ error: true }));

    if (response.error)
        return false;

    return response.data;
}

export async function getClassForChef(classId) {
    const response = await feastHeroAxios.get(`${FIND_CLASS_FOR_CHEF_PREFIX}/${classId}`, { withCredentials: true })
        .then((response) => response)
        .catch((_) => ({ error: true }));

    if (response.error)
        return false;

    return response.data;
}
