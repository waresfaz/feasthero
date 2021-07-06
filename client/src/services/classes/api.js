import axios from 'axios';

import Class from './models/class';
import { allClasses, findClass } from '../../constants/api-constants';

async function fetchAllClasses() {
    let allClassesData = [];
    const classesReponse = await axios.get(allClasses);
    classesReponse.data.response.forEach((class_) => {
        allClassesData.push(Class.fromJson(class_));
    })
    return allClassesData;
}

async function fetchClass(id) {
    const fetchClassResponse = await axios.get(`${findClass}/${id}`);
    if (fetchClassResponse.status !== 200)
        return false;
    return Class.fromJson(fetchClassResponse.data.response);
}

export { fetchAllClasses, fetchClass };