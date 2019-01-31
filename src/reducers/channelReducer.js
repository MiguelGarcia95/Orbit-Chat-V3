import * as actionTypes from '../actions/types';

const initialState = {
  currentChannel: null,
  channelError: null
}

const chatroomReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_CHANNEL: 
      return {
        ...state,
        channelError: action.payload.channelError
      }
    default:
      return state;
  }
}

export default chatroomReducer;