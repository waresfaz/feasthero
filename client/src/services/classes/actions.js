import { SET_CURRENT_CLASS } from './types';
import asAction from '../../helpers/as-redux-action';

function setCurrentClass(classData) {
    return asAction(SET_CURRENT_CLASS, classData);
}



export { setCurrentClass }