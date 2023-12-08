// import { SET_RESULT, SetResult } from "../_actions/types";
import { LOGIN_USER } from "../_actions/types";

export interface LoginState {
    loginSuccess: boolean | null;
}

const initState:LoginState = {
    loginSuccess: null, // 초기값
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