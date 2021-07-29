import { STANDARD_REGISTER } from '../../constants/api-constants';
import feastHeroAxios from '../axios/feast-hero-axios';

export async function register(firstName, lastName, email, passwordOne, passwordTwo) {
    const response = await feastHeroAxios.post(
        STANDARD_REGISTER, {
        regData: {
            firstName: firstName, lastName: lastName, email: email,
            passwordOne: passwordOne, passwordTwo: passwordTwo
        }
    })
        .then((response) => response)
        .catch((err) => ({ error: err.response }));
    return response;
}