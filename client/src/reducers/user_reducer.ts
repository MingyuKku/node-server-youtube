// import { SET_RESULT, SetResult } from "../_actions/types";
import { LOGIN_USER } from "../actions/types";

export interface LoginState {
    loginSuccess: boolean;
}

const initState:LoginState = {
    loginSuccess: false,
}

export default function userReducer (state:LoginState = initState, action:any) {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                loginSuccess: action.payload,
            }
        default:
            return state;
    }
}