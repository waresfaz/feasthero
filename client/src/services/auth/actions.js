import asAction from "../../helpers/as-redux-action";
import { IS_AT_LOGIN_PAGE } from "./types";

export function isAtLoginPage(isAtLoginPage) {
    return asAction(IS_AT_LOGIN_PAGE, isAtLoginPage);
}