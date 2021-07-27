import feastHeroApiTokenWrapper from '../helpers/feasthero-api-token-wrapper';
import { settings, initSettings } from '../settings';


initSettings();

export const BASE_URL = settings.SERVER_ORIGIN;

const CLASSES_PATH = `${BASE_URL}/classes`;
export const ALL_CLASSES = feastHeroApiTokenWrapper(`${CLASSES_PATH}/all`);
export const FIND_CLASS = feastHeroApiTokenWrapper(`${CLASSES_PATH}/find`);

const BOOKING_PATH = `${BASE_URL}/booking`;
export const INIT_BOOKING_DETAILS_SESSION = feastHeroApiTokenWrapper(`${BOOKING_PATH}/init-session`);
export const GET_BOOKING_DETAILS_FROM_SESSION = feastHeroApiTokenWrapper(`${BOOKING_PATH}/details-from-session`);
export const BOOK_CLASS = feastHeroApiTokenWrapper(`${BOOKING_PATH}/book`);
export const VERIFY_BOOKING_SUCCESS = feastHeroApiTokenWrapper(`${BOOKING_PATH}/verify-success`);
export const IS_BOOKING_SESSION_ACTIVE = feastHeroApiTokenWrapper(`${BOOKING_PATH}/is-session-active`);
export const SHARE_CONFIRMATION = feastHeroApiTokenWrapper(`${BOOKING_PATH}/share-confirmation`);

const CONTACT_PATH = `${BASE_URL}/contact`;
export const EMAIL = feastHeroApiTokenWrapper(`${CONTACT_PATH}/email`);

const SUBSCRIBE_PATH = `${BASE_URL}/subscribe`;
export const SUBSCRIBE = feastHeroApiTokenWrapper(`${SUBSCRIBE_PATH}`);

const BLOG_PATH = `${BASE_URL}/blog`;
const BLOG_POSTS_PATH = `${BLOG_PATH}/posts`;
export const ALL_BLOG_POSTS = feastHeroApiTokenWrapper(`${BLOG_POSTS_PATH}/all`);
export const FIND_BLOG_POST = feastHeroApiTokenWrapper(`${BLOG_POSTS_PATH}`)