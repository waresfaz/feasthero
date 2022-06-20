import asAction from '../../helpers/as-redux-action';
import {
    ADD_CLASS_SUCCESS,
    LOAD_ALL_CLASSES_SUCCESS,
    LOAD_CLASS_SUCCESS, SELECT_CLASS
} from "./types";
import { allChefsClasses, getClassForChef } from './api';
import errorsAreEmpty from '../../helpers/no-errors-in-map';
import { newClass } from '../classes/api';
import classDataFromObj from '../../helpers/class-data-from-state';
import requestErrorHasAdditionalInfo from '../../helpers/request-error-has-additional-info';

import NotEmptyValidator from '../../validators/not-empty';
import BooleanValidator from '../../validators/boolean';
import NumberValidator from '../../validators/number';


function addClassSuccess(newClass) {
    return asAction(ADD_CLASS_SUCCESS, newClass);
}

function loadAllClassesSuccess(classes) {
    return asAction(LOAD_ALL_CLASSES_SUCCESS, classes);
}

function loadClassSuccess(classData) {
    return asAction(LOAD_CLASS_SUCCESS, classData);
}

export function selectClassForEdit(classData) {
    return asAction(SELECT_CLASS, classData);
}

export function loadAllClasses() {
    return async (dispatch) => {
        const classes = await allChefsClasses();

        if (classes.error)
            throw new Error(classes.error);

        dispatch(loadAllClassesSuccess(classes));
    }
}

export function loadClass(classId) {
    return async (dispatch, getState) => {
        if (getState().chef.currentClass)
            return getState().chef.currentClass;
        const classData = await getClassForChef(classId);
        if (classData.error)
            throw new Error(classData.error);

        dispatch(loadClassSuccess(classData));

        return classData;
    }
}

export function addClass(classData) {
    return async (dispatch) => {
        const validateClassData = () => {
            let errors = {};

            errors['title'] = NotEmptyValidator.validate(classData.title);
            errors['description'] = NotEmptyValidator.validate(classData.description);
            errors['thumbnail'] = NotEmptyValidator.validate(classData.thumbnail);
            errors['costPerDevice'] = NumberValidator.validate(classData.costPerDevice);
            errors['duration'] = NumberValidator.validate(classData.duration);
            errors['mealKitCost'] = NumberValidator.validate(classData.mealKitCost);
            errors['hasMealKit'] = BooleanValidator.validate(classData.hasMealKit);

            return errors;
        }

        const errors = validateClassData();
        if (!errorsAreEmpty(errors))
            throw errors;


        const newClassResponse = await newClass(classDataFromObj(classData));
        const errorResponse = newClassResponse.errors;
        if (errorResponse) {
            if (requestErrorHasAdditionalInfo(errorResponse))
                throw errorResponse;
            else {
                const error = { error: 'Failed to add class, please try again' }
                throw error;
            }
        }

        dispatch(addClassSuccess(newClassResponse.data));

        return true;
    }
}