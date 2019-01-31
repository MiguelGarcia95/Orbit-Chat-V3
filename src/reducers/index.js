import {combineReducers} from 'redux';
import authReducer from './authReducer';
import chatroomReducer from './chatroomReducer';
import channelReducer from './channelReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatroomReducer,
  channel: channelReducer
})

export default rootReducer;