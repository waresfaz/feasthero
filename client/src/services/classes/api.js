import axios from 'axios';

import Class from './models/class';
import { allClasses } from '../../constants/api-constants';

async function fetchAllClasses() {
    let allClassesData = [];
    const classesReponse = await axios.get(allClasses);
    console.log(classesReponse);
    classesReponse.data.response.forEach((class_) => {
        allClassesData.push(Class.fromJson(class_));
    })
    return allClassesData;
}

export { fetchAllClasses };