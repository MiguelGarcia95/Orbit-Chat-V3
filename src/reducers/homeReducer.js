import * as actionTypes from '../actions/types';

const initialState = {
  homeroomError: null,
  references: [],
  currentView: '',
  directMessages: [],
  currentReference: null
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
        homeroomError: action.payload.homeroomError
      }
    case actionTypes.GET_DIRECT_MESSAGES_REFERENCE:
      return {
        ...state,
        homeroomError: action.payload.homeError,
        references: action.payload.references
      }
    case actionTypes.GET_REFERENCE:
      return {
        ...state,
        homeroomError: action.payload.homeError,
        currentReference: action.payload.currentReference
      }
    case actionTypes.SET_COMMENTS_HOME:
      let newComments = [...state.directMessages, ...action.payload.directMessages];
      
      let filteredComments = newComments.reduce((newArray, comment) => {
        if (newArray.length > 0) {
          let isInArray = false;
          newArray.forEach(arrayComment => {
            if (comment.id === arrayComment.id) {
              isInArray = true;
            }
          });
          if (!isInArray) {
            newArray.push(comment)
          }
        } else {
          newArray.push(comment)
        }
        return newArray
      }, []);

      let sortedComments = [];
      if (filteredComments.length !== 0) {
        sortedComments = filteredComments.sort((a, b) => {
          if (b.comment.createdAt !== null && a.comment.createdAt !== null) {
            return new Date(a.comment.createdAt.toDate()) - new Date(b.comment.createdAt.toDate());
          }
        });
      } else {
        sortedComments = [...filteredComments];
      }

      let comments = sortedComments.reduce((newArray, comment) => {
        if (action.payload.commentToDelete.length > 0) {
          if (action.payload.commentToDelete[0].id !== comment.id) {
            newArray.push(comment)
          }
        } else {
          newArray.push(comment)
        }
        return newArray;
      }, []);
      
      return {
        ...state,
        directMessages: comments
      }
    case actionTypes.GET_DIRECT_MESSAGES:
      // let allMessages = [];

      // if (state.directMessages.length > 0) {
      //   let inDMArray = false;
      //   state.directMessages.forEach(message => {
      //     if (message.uid === action.payload.userMessages.uid) {
      //       inDMArray = true;
      //     }
      //   })
      //   if (!inDMArray) {
      //     allMessages.push(action.payload.userMessages);
      //   }
      // } else {
      //   allMessages.push(action.payload.userMessages);
      // }

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