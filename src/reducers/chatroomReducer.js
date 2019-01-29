import * as actionTypes from '../actions/types';

const initialState = {
  currentChatroom: null,
  chatroomError: null,
  newChatroomId: null,
  chatrooms: []
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
    case actionTypes.GET_CHATROOMS:
      return {
        ...state,
        chatrooms: action.payload.chatrooms
      }
    default:
      return state;
  }
}

export default chatroomReducer;