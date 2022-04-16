import { ERROR_VIEWED_AT_HOME_PAGE } from "./types";

export function errorViewedAtHomePage(error) {
    return {
        type: ERROR_VIEWED_AT_HOME_PAGE,
        value: error,
    }
}