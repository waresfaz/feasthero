import axios from 'axios';
import { EMAIL } from '../../constants/api-constants';

export async function email(name, email, subject, message) {
    const response = await axios.post(EMAIL, { name: name, subject: subject, email: email, message: message })
        .then((response) => response)
        .catch((_) => ({ error: true }));
        

    return !response.error;
}