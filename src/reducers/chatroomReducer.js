import * as actionTypes from '../actions/types';
import {removeDuplicateChatrooms, removeDeletedChatrooms} from '../utils/functions';

const initialState = {
  currentChatroom: null,
  chatroomError: null,
  newChatroomId: null,
  inChatroom: false,
  chatroomRedirect: false,
  chatrooms: [],
  categories: []
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
        chatroomError: action.payload.chatroomError,
        currentChatroom: action.payload.currentChatroom,
        inChatroom: action.payload.inChatroom,
        chatroomRedirect: action.payload.chatroomRedirect
      }
    case actionTypes.GET_CHATROOM_CATEGORIES:
      return {
        ...state,
        categories: action.payload.categories,
        chatroomError: action.payload.chatroomError
      }
    case actionTypes.CLEAR_CHATROOM:
      return {
        ...state,
        chatroomError: action.payload.chatroomError,
        currentChatroom: action.payload.currentChatroom,
        inChatroom: action.payload.inChatroom,
        chatroomRedirect: action.payload.chatroomRedirect
      }
    case actionTypes.GET_CHATROOMS:
      return {
        ...state,
        chatrooms: action.payload.chatrooms
      }
    case actionTypes.SET_CHATROOMS:
      let chatrooms = [state.chatrooms, action.payload.chatrooms];
      let uniqueChatrooms = removeDuplicateChatrooms(chatrooms);
      let allChatrooms = removeDeletedChatrooms(uniqueChatrooms, action.payload.chatroomToDelete);

      return {
        ...state,
        chatrooms: action.payload.chatrooms
      }
    case actionTypes.CREATE_CATEGORY:
      return {
        ...state,
        chatroomError: allChatrooms
      }
    default:
      return state;
  }
}

export default chatroomReducer;