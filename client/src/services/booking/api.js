import axios from 'axios';

import { initBookingDetailsSession as initBookingDetailsSessionUrl } from '../../constants/api-constants';

export async function initBookingDetailsSession(bookingDetails) {
    const response = await axios.post(initBookingDetailsSessionUrl, bookingDetails, { withCredentials: true })
        .then((response) => response)
        .catch((_) => ({ error: true }));

    return !response.error
}