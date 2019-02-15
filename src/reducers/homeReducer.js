import * as actionTypes from '../actions/types';
import {
  removeDuplicateComments, sortCommentsByDate, removeDeletedComments, removeUnrelatedComments, 
  removeDuplicateReferences, removeDeletedReferences
} from '../utils/functions';

const initialState = {
  homeroomError: null,
  references: [],
  currentView: '',
  directMessages: [],
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
    case actionTypes.GET_DIRECT_MESSAGES_REFERENCE:
      return {
        ...state,
        homeroomError: action.payload.homeError,
        references: action.payload.references
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
    case actionTypes.GET_DIRECT_MESSAGES:
      return {
        ...state,
        homeroomError: action.payload.homeError,
        directMessages: action.payload.userMessages
      }
    case actionTypes.SET_HOME_VIEW: 
      return {
        ...state,
        homeroomError: action.payload.homeError,
        currentView: action.payload.currentView
      }
    case actionTypes.JOIN_CHATROOM:
      return {
        ...state,
        homeroomError: action.payload.homeroomError
      }
    case actionTypes.LEAVE_CHATROOM:
      return {
        ...state,
        homeroomError: action.payload.homeroomError
      }
    case actionTypes.ADD_FRIEND:
      return {
        ...state,
        homeroomError: action.payload.homeroomError
      }
    case actionTypes.REMOVE_FRIEND:
      return {
        ...state,
        homeroomError: action.payload.homeroomError
      }
    default:
      return state;
  }
}

export default homeReducer;