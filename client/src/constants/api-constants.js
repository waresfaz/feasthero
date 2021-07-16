import { settings, initSettings } from '../settings';

initSettings();

export const BASE_URL = settings.ORIGIN;

const CLASSES_PATH = `${BASE_URL}/classes`;
export const ALL_CLASSES = `${CLASSES_PATH}/all`;
export const FIND_CLASS = `${CLASSES_PATH}/find`;

const BOOKING_PATH = `${BASE_URL}/booking`;
export const INIT_BOOKING_DETAILS_SESSION = `${BOOKING_PATH}/init-session`;
export const GET_BOOKING_DETAILS_FROM_SESSION = `${BOOKING_PATH}/details-from-session`;
export const BOOK_CLASS = `${BOOKING_PATH}/book`;
export const VERIFY_BOOKING_SUCCESS = `${BOOKING_PATH}/verify-success`;
export const IS_SESSION_ACTIVE = `${BOOKING_PATH}/is-session-active`;

const CONTACT_PATH = `${BASE_URL}/contact`;
export const EMAIL = `${CONTACT_PATH}/email`;

const SUBSCRIBE_PATH = `${BASE_URL}/subscribe`;
export const SUBSCRIBE = `${SUBSCRIBE_PATH}/`;

const BLOG_PATH = `${BASE_URL}/blog`;
const BLOG_POSTS_PATH = `${BLOG_PATH}/posts`;
export const ALL_BLOG_POSTS = `${BLOG_POSTS_PATH}/all`;
export const FIND_BLOG_POST = `${BLOG_POSTS_PATH}`