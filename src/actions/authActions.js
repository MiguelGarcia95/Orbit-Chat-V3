import * as actionTypes from './types';
import md5 from 'md5';

export const signIn = credentials => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({
          type: actionTypes.SIGN_IN,
          payload: {authError: null}
        })
      }).catch(err => {
        dispatch({
          type: actionTypes.SIGN_IN,
          payload: {authError: err.message}
        })
      })
  }
}

export const signUp = credentials => {
  return (dispatch, getState, {getFirestore, getFirebase}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(createdUser => {
        //update user
        createdUser.user.updateProfile({
          displayName: credentials.username,
          photoURL: `http://gravatar.com/avatar/${md5(credentials.email)}?d=identicon`
        })

        //Create firestore user and set custom Id
        firestore.collection('users').doc(createdUser.user.uid).set({
          username: credentials.username,
          avatar: `http://gravatar.com/avatar/${md5(credentials.email)}?d=identicon`,
          uid: createdUser.user.uid,
          email: credentials.email,
          createdAt: firestore.FieldValue.serverTimestamp()
        });

      }).then(() => {
        dispatch({
          type: actionTypes.SIGN_UP,
          payload: {authError: null}
        })
      }).catch(err => {
        dispatch({
          type: actionTypes.SIGN_UP,
          payload: {authError: err.message}
        })
      })
  }
}

export const setUser = user => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_USER,
      payload: {authError: null, currentUser: user}
    })
  }
}

export const unsetUser = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.UNSET_USER,
      payload: {authError: null, currentUser: null}
    })
  }
}

export const signOut = () => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    firebase.auth().signOut().then(() => {
      dispatch({
        type: actionTypes.SIGN_OUT,
        payload: {authError: null, currentUser: null}
      })
    })
  }
}