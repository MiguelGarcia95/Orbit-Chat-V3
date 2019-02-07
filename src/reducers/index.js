import {combineReducers} from 'redux';
import authReducer from './authReducer';
import chatroomReducer from './chatroomReducer';
import channelReducer from './channelReducer';
import homeReducer from './homeReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatroomReducer,
  channel: channelReducer,
  home: homeReducer
})

export default rootReducer;