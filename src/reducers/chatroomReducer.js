import * as actionTypes from '../actions/types';
import {removeDuplicateChatrooms, removeDeletedChatrooms, sortCategoriesByDate} from '../utils/functions';

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
        chatroomError: action.payload.chatroomError,
        newChatroomId: action.payload.newChatroomId,
      }
    case actionTypes.GET_CHATROOM:
      return {
        ...state,
        chatroomError: action.payload.chatroomError,
        currentChatroom: action.payload.currentChatroom,
        inChatroom: action.payload.inChatroom,
        chatroomRedirect: action.payload.chatroomRedirect
      }
    case actionTypes.SET_CHATROOM_CATEGORIES:
      let categories = [...state.categories, ...action.payload.categories];
      let sortedCategories = sortCategoriesByDate(categories);
      return {
        ...state,
        categories: sortedCategories,
        chatroomError: action.payload.chatroomError

      }
    case actionTypes.CLEAR_CHATROOM:
      return {
        ...state,
        chatroomError: action.payload.chatroomError,
        currentChatroom: action.payload.currentChatroom,
        inChatroom: action.payload.inChatroom,
        chatroomRedirect: action.payload.chatroomRedirect,
        categories: action.payload.categories
      }
    case actionTypes.SET_CHATROOMS:
      let chatrooms = [...state.chatrooms, ...action.payload.chatrooms];
      // console.log(chatrooms)
      let uniqueChatrooms = removeDuplicateChatrooms(chatrooms);
      // console.log(uniqueChatrooms)
      let allChatrooms = removeDeletedChatrooms(uniqueChatrooms, action.payload.chatroomToDelete);
      // console.log(allChatrooms)

      return {
        ...state,
        chatrooms: allChatrooms
      }
    case actionTypes.CREATE_CATEGORY:
      return {
        ...state,
        chatroomError: allChatrooms
      }
    case actionTypes.JOIN_CHATROOM:
      let currentChatroom = !action.payload.currentChatroom ? state.currentChatroom : action.payload.currentChatroom;
      // let currentChatroom;
      // if (!action.payload.currentChatroom) {
      //   currentChatroom = state.currentChatroom
      // } else {
      //   currentChatroom = action.payload.currentChatroom
      // }

      return {
        ...state,
        chatroomError: action.payload.chatroomError,
        currentChatroom: currentChatroom
      }
    case actionTypes.LEAVE_CHATROOM:
      return {
        ...state,
        chatroomError: action.payload.chatroomError,
        currentChatroom: action.payload.currentChatroom

      }
    default:
      return state;
  }
}

export default chatroomReducer;