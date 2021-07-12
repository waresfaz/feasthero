import axios from 'axios';

import { allClasses } from '../../constants/api-constants';

async function fetchAllClasses() {
    const classesReponse = await axios.get(allClasses, { withCredentials: true })
                                        .then((response) => response)
                                        .catch((_) => ({ error: true }));

    if (classesReponse.error)
        return false;

    return classesReponse.data.response;
}


export { fetchAllClasses };