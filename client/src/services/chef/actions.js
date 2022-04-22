import asAction from '../../helpers/as-redux-action';
import {
    ADD_CLASS_FAILED, ADD_CLASS_SUCCESS, HIDE_ADD_CLASS_MODAL,
    LOAD_ALL_CLASSES_FAILED, LOAD_ALL_CLASSES_SUCCESS, LOAD_CLASS_FAILED,
    LOAD_CLASS_SUCCESS, SELECT_CLASS, SHOW_ADD_CLASS_MODAL
} from "./types";
import { allChefsClasses, getClassForChef } from './api';
import errorsAreEmpty from '../../helpers/no-errors-in-map';
import { newClass } from '../classes/api';
import classDataFromObj from '../../helpers/class-data-from-state';
import requestErrorHasAdditionalInfo from '../../helpers/request-error-has-additional-info';

import NotEmptyValidator from '../../validators/not-empty';
import BooleanValidator from '../../validators/boolean';
import NumberValidator from '../../validators/number';

function addClassFailed(errors) {
    return asAction(ADD_CLASS_FAILED, errors);
}

function addClassSuccess() {
    return asAction(ADD_CLASS_SUCCESS);
}

function loadAllClassesSuccess(classes) {
    return asAction(LOAD_ALL_CLASSES_SUCCESS, classes);
}

function loadAllClassesFailed() {
    return asAction(LOAD_ALL_CLASSES_FAILED);
}

function loadClassSuccess(classData) {
    return asAction(LOAD_CLASS_SUCCESS, classData);
}

function loadClassFailed() {
    return asAction(LOAD_CLASS_FAILED);
}

export function showAddClassModal() {
    return asAction(SHOW_ADD_CLASS_MODAL);
}

export function hideAddClassModal() {
    return asAction(HIDE_ADD_CLASS_MODAL);
}

export function selectClass(classData) {
    return asAction(SELECT_CLASS, classData);
}

export function loadAllClasses() {
    return async (dispatch) => {
        const classes = await allChefsClasses();
        if (classes.error) {
            dispatch(loadAllClassesFailed());
            return;
        }
        dispatch(loadAllClassesSuccess(classes));
    }
}

export function loadClass(classId) {
    return async (dispatch, getState) => {
        if (getState().chef.currentClass)
            return;
        const classData = await getClassForChef(classId);
        if (classData.error) {
            dispatch(loadClassFailed())
        }
        dispatch(loadClassSuccess(classData));
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
        if (!errorsAreEmpty(errors)) {
            dispatch(addClassFailed(errors))
            return;
        }

        const newClassResponse = await newClass(classDataFromObj(classData));
        const errorResponse = newClassResponse.errors;
        if (errorResponse) {
            if (requestErrorHasAdditionalInfo(errorResponse))
                dispatch(addClassFailed(errorResponse));
            else
                dispatch(addClassFailed({ error: 'Failed to add class, please try again' }));
            return;
        }

        dispatch(loadAllClasses());
        dispatch(addClassSuccess());
    }
}