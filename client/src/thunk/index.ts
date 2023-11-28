import { AnyAction, Dispatch } from "redux";
import { useDispatch as reduxUseDispatch } from 'react-redux';
import { ThunkAction, ThunkDispatch } from "redux-thunk";


export type AppDispatch<T> = Dispatch & ThunkDispatch<T, undefined, AnyAction>;
export type ThunkActionType<T> = ThunkAction<void, T, undefined, AnyAction>

/** state의 타입을 전달해야 함 */
export const useThunkDispatch = <T>() => reduxUseDispatch<AppDispatch<T>>();