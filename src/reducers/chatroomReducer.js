import * as actionTypes from '../actions/types';

const initialState = {
  currentChatroom: null,
  chatroomError: null,
  currentChatroomId: null
}

const chatroomReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_CHATROOM:
      return {
        ...state,
        chatroomError: action.payload.chatroomError
      }
    case actionTypes.GET_CHATROOM:
      return {
        ...state,
        chatroomError: action.payload.chatroomError
      }
    default:
      return state;
  }
}

export default chatroomReducer;