import * as actionTypes from './types';

export const signIn = credentials => {
  return (dispatch, getState, {getFirestore, getFirebase}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    console.log(credentials)
  }
}

export const signUp = credentials => {
  return (dispatch, getState, {getFirestore, getFirebase}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    console.log(credentials)
  }
}