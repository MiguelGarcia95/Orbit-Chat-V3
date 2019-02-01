import * as actionTypes from '../actions/types';

const initialState = {
  currentChannel: null,
  channelError: null,
  channels: []
}

const chatroomReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_CHANNEL: 
      return {
        ...state,
        channelError: action.payload.channelError
      }
    case actionTypes.GET_CHATROOM_CHANNELS:
      return {
        ...state,
        channelError: action.payload.channelError,
        channels: action.payload.channels
      }
    case actionTypes.SET_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload.currentChannel
      }
    case actionTypes.UNSET_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload.currentChannel
      }
    default:
      return state;
  }
}

export default chatroomReducer;