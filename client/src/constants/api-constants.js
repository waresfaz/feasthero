import { settings, initSettings } from '../settings';

initSettings();

export const baseUrl = settings.ORIGIN;
export const classesPath = `${baseUrl}/classes`;
export const allClasses = `${classesPath}/all`;
export const findClass = `${classesPath}/find`;