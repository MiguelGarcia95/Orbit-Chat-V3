import * as actionTypes from './types';

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
    firebase.auth().createUserWithEmailAndPassword(credentials.email, user.password)
      .then(createdUser => {
        //update user
        createdUser.user.updateProfile({
          displayName: credentials.username,
          photoURL: `http://gravatar.com/avatar/${md5(credentials.email)}?d=identicon`
        })

        //Create Firestore user
        firestore.add('users', {
          username: credentials.username,
          avatar: `http://gravatar.com/avatar/${md5(credentials.email)}?d=identicon`,
          uid: createdUser.user.uid,
          email: credentials.email
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