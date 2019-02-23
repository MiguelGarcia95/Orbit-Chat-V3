import * as actionTypes from '../actions/types';
import {
  removeDuplicateComments, sortCommentsByDate, removeDeletedComments, removeUnrelatedComments, 
  removeDuplicateReferences, removeDeletedReferences, removeDeletedFriends, removeDuplicateFriends, replaceUpdateFriends,
  removeDuplicateInvites, removeDeletedInvites
} from '../utils/functions';

const initialState = {
  homeroomError: null,
  references: [],
  currentView: 'friends',
  directMessages: [],
  friendsList: [],
  chatroomInvites: [],
  currentReference: null,
  referenceId: null
}

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_DIRECT_MESSAGE:
      return {
        ...state,
        homeroomError: action.payload.homeroomError
      }
    case actionTypes.DELETE_DIRECT_MESSAGE:
      return {
        ...state,
        homeroomError: action.payload.homeError
      }
    case actionTypes.DELETE_DIRECT_MESSAGE_CHAT:
      return {
        ...state,
        homeroomError: action.payload.homeError,
        currentView: action.payload.currentView
      }
    case actionTypes.SET_DIRECT_MESSAGES_REFERENCE:
      let references = [...state.references, ...action.payload.references];
      let uniqueReferences = removeDuplicateReferences(references);
      let allReferences = removeDeletedReferences(uniqueReferences, action.payload.referencesToDelete);

      return {
        ...state,
        homeroomError: action.payload.homeError,
        references: allReferences
      }
    case actionTypes.GET_REFERENCE:
      return {
        ...state,
        homeroomError: action.payload.homeError,
        currentReference: action.payload.currentReference
      }
    case actionTypes.SET_COMMENTS_HOME:
      let newComments = [...state.directMessages, ...action.payload.userMessages];
      let filteredComments = removeDuplicateComments(newComments);
      let sortedComments = sortCommentsByDate(filteredComments);
      let comments = removeDeletedComments(sortedComments, action.payload.commentToDelete);
      let referencedComments = removeUnrelatedComments(comments, action.payload.referenceId);

      return {
        ...state,
        directMessages: referencedComments,
        homeroomError: action.payload.homeError
      }
    case actionTypes.SET_HOME_VIEW: 
      return {
        ...state,
        homeroomError: action.payload.homeError,
        currentView: action.payload.currentView
      }
    case actionTypes.SET_CHATROOM_INVITES: 
      let allChatroomInvites = [...state.chatroomInvites, ...action.payload.chatroomInvites];
      let filteredChatroomInvites = removeDuplicateInvites(allChatroomInvites);
      let chatroomInvites = removeDeletedInvites(filteredChatroomInvites, action.payload.chatroomToDelete);
      return {
        ...state,
        chatroomInvites: chatroomInvites,
        homeroomError: action.payload.homeError
      }
    case actionTypes.SET_FRIENDS:
      let allFriends = [...state.friendsList, ...action.payload.friendsList];
      let filteredFriends = removeDuplicateFriends(allFriends);
      let updatedFriends = replaceUpdateFriends(filteredFriends, action.payload.friendToUpdate)
      let friends = removeDeletedFriends(updatedFriends, action.payload.friendToDelete);
      return {
        ...state,
        friendsList: friends,
        homeroomError: action.payload.homeError,
      }
    case actionTypes.ADD_FRIEND:
      return {
        ...state,
        homeroomError: action.payload.homeError
      }
    case actionTypes.DELETE_FRIEND:
      return {
        ...state,
        homeroomError: action.payload.homeError
      }
    case actionTypes.REJECT_FRIEND:
      return {
        ...state,
        homeroomError: action.payload.homeError
      }
    default:
      return state;
  }
}

export default homeReducer;