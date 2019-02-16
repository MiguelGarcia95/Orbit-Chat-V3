import * as actionTypes from '../actions/types';

const initialState = {
  currentUser: null,
  authError: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_UP:
      return {
        ...state,
        authError: action.payload.authError
      }
    case actionTypes.SIGN_IN:
      return {
        ...state,
        authError: action.payload.authError
      }
    case actionTypes.SET_USER:
      return {
        ...state,
        currentUser: action.payload.currentUser
      }
    case actionTypes.UNSET_USER:
      return {
        ...state,
        currentUser: action.payload.currentUser
      }
    default:
      return state;
  }
}

export default authReducer;