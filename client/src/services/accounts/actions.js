import asAction from '../../helpers/as-redux-action';
import { SET_ACCOUNT } from "./types";


export function setAccount(account) {
    return asAction(SET_ACCOUNT, account);
}