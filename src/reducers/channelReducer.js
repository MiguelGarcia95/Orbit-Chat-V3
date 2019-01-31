import * as actionTypes from '../actions/types';

const initialState = {
  currentChannel: null,
  channelError: null
}

const chatroomReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export default chatroomReducer;