import * as actionTypes from './types';

export const createChatroom = chatroom => {
  return (dispatch, getState, {getFirestore}) => {
    console.log(chatroom)
  }
}

export const getChatroom = chatroomId => {
  return (dispatch, getState, {getFirestore}) => {
    console.log(chatroomId)
  }
}