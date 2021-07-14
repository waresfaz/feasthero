import { NEW_ERROR } from "./types";

export function newError(error) {
    return {
        type: NEW_ERROR,
        value: error,
    }
}