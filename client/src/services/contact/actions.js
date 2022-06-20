import asAction from "../../helpers/as-redux-action";
import errorsAreEmpty from "../../helpers/no-errors-in-map";
import { RESET_CONTACT, SEND_EMAIL_FAILED, SEND_EMAIL_SUCCESS } from "./types";
import { email as sendEmailRequest } from './api';
import requestErrorHasAdditionalInfo from '../../helpers/request-error-has-additional-info';
import * as validators from '../../validators';

function sendEmailFailed(errors) {
    return asAction(SEND_EMAIL_FAILED, errors);
}

function sendEmailSuccess() {
    return asAction(SEND_EMAIL_SUCCESS);
}

export function resetContact() {
    return asAction(RESET_CONTACT);
}

export function sendEmail(contactDetails, reCaptcha) {
    return async (dispatch) => {
        const { name, email, subject, message } = contactDetails;

        const validate = () => {
            let errors = {};

            errors['name'] = validators.NameValidator.validate(name)
            errors['email'] = validators.EmailValidator.validate(email);
            errors['subject'] = validators.NotEmptyValidator.validate(subject);
            errors['message'] = validators.NotEmptyValidator.validate(message);

            return errors;
        }

        const errors = validate();
        if (!errorsAreEmpty(errors)) {
            dispatch(sendEmailFailed(errors))
            return;
        }

        const response = await sendEmailRequest(name, email, subject, message, reCaptcha);
        if (response.error) {
            if (requestErrorHasAdditionalInfo(response.error))
                dispatch(sendEmailFailed(response.error.data['errors']));
            else
                dispatch(sendEmailFailed({ error: 'Failed to send email' }));

            return;
        }

        dispatch(sendEmailSuccess());
    }
}