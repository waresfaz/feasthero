import axios from 'axios';
import { SUBSCRIBE } from '../../constants/api-constants';

export async function subscribe(email) {
    const response = await axios.post(SUBSCRIBE, { 'email': email })
        .then((response) => response)
        .catch((err) => ({ error: err.response }));

    if (response.error) {
        if (response.error.status === 409)
            return 'already exists';
        return false;
    }

    return true;
}