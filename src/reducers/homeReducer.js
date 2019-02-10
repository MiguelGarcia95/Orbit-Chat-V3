import * as actionTypes from '../actions/types';

const initialState = {
  homeroomError: null,
  references: []
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
    case actionTypes.DIRECT_MESSAGES_REFERENCE:
      return {
        ...state,
        homeroomError: action.payload.homeroomError,
        references: action.payload.references
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