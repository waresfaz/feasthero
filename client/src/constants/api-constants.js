const CLASSES_PATH = `/classes`;
export const ALL_CLASSES = `${CLASSES_PATH}/all`;
export const ALL_CHEFS_CLASSES = `${CLASSES_PATH}/current-chef/all`;
export const FIND_CLASS = `${CLASSES_PATH}/find`;
export const FILTER_CLASSES = `${CLASSES_PATH}/filter`
export const DELETE_CLASS_PREFIX = `${CLASSES_PATH}/class`;
export const UPDATE_CLASS_PREFIX = `${CLASSES_PATH}/class`;
export const NEW_CLASS = `${CLASSES_PATH}/new`;

const BOOKING_PATH = `/booking`;
export const INIT_BOOKING_DETAILS_SESSION = `${BOOKING_PATH}/init-session`;
export const GET_BOOKING_DETAILS_FROM_SESSION = `${BOOKING_PATH}/details-from-session`;
export const BOOK_CLASS = `${BOOKING_PATH}/book`;
export const VERIFY_BOOKING_SUCCESS = `${BOOKING_PATH}/verify-success`;
export const IS_BOOKING_SESSION_ACTIVE = `${BOOKING_PATH}/is-session-active`;
export const SHARE_CONFIRMATION = `${BOOKING_PATH}/share-confirmation`;

const CONTACT_PATH = `/contact`;
export const EMAIL = `${CONTACT_PATH}/email`;

const SUBSCRIBE_PATH = `/subscribe`;
export const SUBSCRIBE = `${SUBSCRIBE_PATH}`;

const BLOG_PATH = `/blog`;
const BLOG_POSTS_PATH = `${BLOG_PATH}/posts`;
export const ALL_BLOG_POSTS = `${BLOG_POSTS_PATH}/all`;
export const FIND_BLOG_POST = `${BLOG_POSTS_PATH}`

const AUTH_PATH = `/auth`;
export const STANDARD_REGISTER = `${AUTH_PATH}/register`;
export const STANDARD_LOGIN = `${AUTH_PATH}/login`;
export const OAUTH_REGISTER = `${AUTH_PATH}/oauth/register`;
export const OAUTH_LOGIN = `${AUTH_PATH}/oauth/login`;
export const LOGOUT = `${AUTH_PATH}/logout`;

const ACCOUNTS_PATH = '/accounts';
export const GET_ACCOUNT =`${ACCOUNTS_PATH}/get-account`;