import { FILTER_CLASSES } from '../../constants/api-constants';
import feastHeroAxios from '../axios/feast-hero-axios';
import store from '../../redux/store/index';

export async function getAllClasses() {
    const response = await feastHeroAxios.get(`${FILTER_CLASSES}?filter=chefId&value=${store.getState().account.accountData._id}`)
        .then((response) => response.data)
        .catch((_) => ({ error: true }));

    return response;
}