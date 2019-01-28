import * as actionTypes from '../actions/types';

const initialState = {
  currentUser: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_UP:
      return {
        ...state
      }
    default:
      return state;
  }
}

export default authReducer;