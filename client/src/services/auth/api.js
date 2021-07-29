import { STANDARD_REGISTER } from '../../constants/api-constants';
import feastHeroAxios from '../axios/feast-hero-axios';

export async function register(data) {
    const response = await feastHeroAxios.post(
        STANDARD_REGISTER, {
        regData: {
            firstName: data.firstName, lastName: data.lastName, email: data.email,
            passwordOne: data.passwordOne, passwordTwo: data.passwordTwo,
            accountType: data.accountType,
        },

    },
        {
            withCredentials: true
        })
        .then((response) => response)
        .catch((err) => ({ error: err.response }));

    return response;
}