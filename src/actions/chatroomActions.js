import * as actionTypes from './types';

export const createChatroom = chatroom => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.add('chatrooms', {
      name:  chatroom.name,
      description:  chatroom.description,
      avatar: chatroom.user.photoURL,
      uid: chatroom.user.uid
    }).then(() => {
      dispatch({
        type: actionTypes.CREATE_CHATROOM,
        payload: {
          chatroomError: null,
          newChatroomId: ''
        }
      })
    }).catch(err => {
      dispatch({
        type: actionTypes.CREATE_CHATROOM,
        payload: {
          chatroomError: err.message,
          newChatroomId: ''
        }
      })
    })
  }
}

export const getChatroom = chatroomId => {
  return (dispatch, getState, {getFirestore}) => {
    console.log(chatroomId)
  }
}