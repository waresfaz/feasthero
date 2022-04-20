import asAction from '../../helpers/as-redux-action';
import { GET_ALL_CLASSES, GET_CLASS, SET_CURRENT_CLASS, SET_ERRORS, SET_LOADING, SET_SHOW_ADD_CLASS_MODAL } from "./types";
import { allChefsClasses, getClassForChef } from './api';
import errorsAreEmpty from '../../helpers/no-errors-in-map';
import { newClass } from '../classes/api';
import classDataFromObj from '../../helpers/class-data-from-state';
import requestErrorHasAdditionalInfo from '../../helpers/request-error-has-additional-info';

import NotEmptyValidator from '../../validators/not-empty';
import BooleanValidator from '../../validators/boolean';
import NumberValidator from '../../validators/number';


export function getAllClasses() {
    return async (dispatch) => {
        const classes = await allChefsClasses();
        dispatch(asAction(GET_ALL_CLASSES, classes));
    }
}

export function setCurrentClass(classData) {
    return asAction(SET_CURRENT_CLASS, classData);
}

export function setLoading(isLoading) {
    return asAction(SET_LOADING, isLoading);
}

export function setErrors(errors) {
    return asAction(SET_ERRORS, errors);
}

export function getClass(classId) {
    return async (dispatch, state) => {
        if (state.chef.currentClass)
            return;
        const classData = await getClassForChef(classId);
        dispatch(asAction(GET_CLASS, classData));
    }
}

export function clearErrors() {
    return asAction(SET_ERRORS, {});
}

export function setShowAddClassModal(showAddClassModal) {
    return asAction(SET_SHOW_ADD_CLASS_MODAL, showAddClassModal);
}

export function addClass(classData) {
    return async (dispatch) => {
        const handleError = (errorResponse) => {
            if (requestErrorHasAdditionalInfo(errorResponse))
                dispatch(setErrors(errors));
            else
                dispatch(setErrors('Failed to add class, please try again'));
            dispatch(setLoading(false));
        }

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

        dispatch(setLoading(true));

        const errors = validateClassData();
        if (!errorsAreEmpty(errors)) {
            dispatch(setErrors(errors));
            dispatch(setLoading(false));
            return;
        }

        const newClassResponse = await newClass(classDataFromObj(classData));
        if (newClassResponse.error)
            return handleError(newClassResponse.error);

        dispatch(getAllClasses());
        dispatch(setShowAddClassModal(false));
        dispatch(setLoading(false));
    }
}