import {combineReducers} from 'redux';
import authReducer from './authReducer';
import chatroomReducer from './chatroomReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatroomReducer
})

export default rootReducer;