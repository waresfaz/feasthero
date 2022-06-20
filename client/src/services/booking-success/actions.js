import { verifyBookingSuccess as verifyBookingSuccessRequest, sendConfirmations as sendConfirmationsRequest } from './api';
import { sessionActiveWrapper, statusEnum } from "../../helpers/session-active-wrapper";


export function verifyBookingSuccess() {
    return async () => {
        const response = await sessionActiveWrapper(verifyBookingSuccessRequest);

        if (response.status === statusEnum.sessionNotActive)
            throw new Error('Session not active');

        if (response.status === statusEnum.error)
            throw new Error('Error fetching booking details, please contact customer service to make sure your class was placed');

        const { bookingDetails, classData } = response;

        return { bookingDetails, classData };
    }
}

export function sendConfirmations(emails) {
    return async () => {
        if (emails.length === 0)
            return;

        const response = await sessionActiveWrapper(sendConfirmationsRequest, emails);
        if (response.status === statusEnum.sessionNotActive)
            throw new Error('Session not active')
        if (response.status === statusEnum.error)
            throw new Error('Error sending confirmations');
        
        return true;
    }
}