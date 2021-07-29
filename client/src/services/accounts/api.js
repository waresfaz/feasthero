import { GET_ACCOUNT as GET_ACCOUNT_URL } from '../../constants/api-constants';
import feastHeroAxios from '../axios/feast-hero-axios';

export async function getAccount() {
    const response = await feastHeroAxios.get(GET_ACCOUNT_URL, { withCredentials: true })
        .then((response) => response)
        .catch((err) => ({ error: err.response.status }))

    return response;
}