import { settings, initSettings } from '../settings';

initSettings();

export const baseUrl = settings.ORIGIN;
export const classesPath = '/classes';
export const allClasses = baseUrl + classesPath + '/all';