import * as actionTypes from '../actions/types';
import {
  removeDuplicateChatrooms, removeDeletedChatrooms, sortCategoriesByDate, removeDeletedInvites, 
  removeDuplicateInvites, removeDeletedCategories, removeDuplicateCategories
} from '../utils/functions';

const initialState = {
  currentChatroom: null,
  chatroomError: null,
  newChatroomId: null,
  inChatroom: false,
  chatroomRedirect: false,
  chatroomDelete: false,
  isDeleting: false,
  chatroomUsers: [],
  chatroomInvites: [],
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
    case actionTypes.DELETE_CATEGORY:
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
    case actionTypes.SET_CHATROOM_USERS:
      let chatroomUsers = [...state.chatroomUsers, ...action.payload.chatroomUsers];
      let uniqueChatroomUsers = removeDuplicateChatrooms(chatroomUsers);
      let allChatroomUsers = removeDeletedChatrooms(uniqueChatroomUsers, action.payload.usersToDelete);
      return {
        ...state,
        chatroomUsers: allChatroomUsers,
        chatroomError: action.payload.chatroomError
      }
    case actionTypes.CHATROOM_REDIRECT:
      return {
        ...state,
        chatroomRedirect: action.payload.chatroomRedirect,
        inChatroom: action.payload.inChatroom
      }
    case actionTypes.SET_CHATROOM_CATEGORIES:
      let allCategories = [...state.categories, ...action.payload.categories];
      let uniqueCategories = removeDuplicateCategories(allCategories);
      let sortedCategories = sortCategoriesByDate(uniqueCategories);
      let categories = removeDeletedCategories(sortedCategories, action.payload.categoryToDelete);
      return {
        ...state,
        categories: categories,
        chatroomError: action.payload.chatroomError
      }
    case actionTypes.CLEAR_CHATROOM:
      return {
        ...state,
        chatroomError: action.payload.chatroomError,
        currentChatroom: action.payload.currentChatroom,
        inChatroom: action.payload.inChatroom,
        chatroomRedirect: action.payload.chatroomRedirect,
        categories: action.payload.categories,
        chatroomUsers: action.payload.chatroomUsers
      }
    case actionTypes.SET_CHATROOMS:
      let chatrooms = [...state.chatrooms, ...action.payload.chatrooms];
      let uniqueChatrooms = removeDuplicateChatrooms(chatrooms);
      let allChatrooms = removeDeletedChatrooms(uniqueChatrooms, action.payload.chatroomToDelete);
      return {
        ...state,
        chatrooms: allChatrooms,
        chatroomError: action.payload.chatroomError
      }
    case actionTypes.IS_DELETING_CHATROOM: 
      return {
        ...state,
        isDeleting: action.payload.isDeleting
      }
    case actionTypes.IS_DELETING_CHATROOM_RESET:
      return {
        ...state,
        isDeleting: action.payload.isDeleting
      }
    case actionTypes.DELETE_CHATROOM:
      return {
        ...state,
        chatroomError: action.payload.chatroomError,
        currentChatroom: action.payload.currentChatroom,
        chatroomDelete: action.payload.chatroomDelete
        // chatroomRedirect: action.payload.chatroomRedirect
      }
    case actionTypes.CREATE_CATEGORY:
      return {
        ...state,
        chatroomError: action.payload.chatroomError
      }
    case actionTypes.INVITE_CHATROOM:
      return {
        ...state,
        chatroomError: action.payload.chatroomError,
      }
    case actionTypes.SET_SENT_CHATROOM_INVITES: 
      let allChatroomInvites = [...state.chatroomInvites, ...action.payload.chatroomInvites];
      let filteredChatroomInvites = removeDuplicateInvites(allChatroomInvites);
      let chatroomInvites = removeDeletedInvites(filteredChatroomInvites, action.payload.inviteToDelete);
      return {
        ...state,
        chatroomError: action.payload.chatroomError,
        chatroomInvites: chatroomInvites
      }
    case actionTypes.JOIN_CHATROOM:
      let currentChatroom = !action.payload.currentChatroom ? state.currentChatroom : action.payload.currentChatroom;
      return {
        ...state,
        chatroomError: action.payload.chatroomError,
        currentChatroom: currentChatroom
      }
    case actionTypes.LEAVE_CHATROOM:
      return {
        ...state,
        chatroomError: action.payload.chatroomError,
        currentChatroom: action.payload.currentChatroom,
        chatroomRedirect: action.payload.chatroomRedirect
      }
    default:
      return state;
  }
}

export default chatroomReducer;