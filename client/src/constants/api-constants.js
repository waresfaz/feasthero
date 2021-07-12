import { settings, initSettings } from '../settings';

initSettings();

export const baseUrl = settings.ORIGIN;

const classesPath = `${baseUrl}/classes`;
export const allClasses = `${classesPath}/all`;
export const findClass = `${classesPath}/find`;

const bookingPath = `${baseUrl}/booking`;
export const initBookingDetailsSession = `${bookingPath}/init-session`;
export const getBookingDetailsFromSession = `${bookingPath}/details-from-session`;
export const bookClass = `${bookingPath}/book`;