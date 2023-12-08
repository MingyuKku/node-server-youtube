import { combineReducers } from 'redux';
import user from './user_reducer';
import chat from './chat_reducer';

const rootReducer = combineReducers({
    user,
    chat
})

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;