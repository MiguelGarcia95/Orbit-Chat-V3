import * as actionTypes from './types';

export const createChatroom = chatroom => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.add('chatrooms', {
      name:  chatroom.name,
      description:  chatroom.description,
      avatar: chatroom.user.photoURL,
      uid: chatroom.user.uid
    }).then((docRef) => {
      dispatch({
        type: actionTypes.CREATE_CHATROOM,
        payload: {
          chatroomError: null,
          newChatroomId: docRef._key.path.segments[1],
        }
      })
    }).catch(err => {
      dispatch({
        type: actionTypes.CREATE_CHATROOM,
        payload: {
          chatroomError: err.message,
          newChatroomId: null
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

export const getChatrooms = () => {
  return (dispatch, getState, {getFirestore}) => {
    // get only get chatrooms that you belong too, later 
    const firestore = getFirestore();
    firestore.collection('chatrooms').get().then(data => {
      let chatrooms = [];
      data.forEach(doc => {
        chatrooms.push({id: doc.id, chatroom: doc.data()})
      })
      dispatch({
        type: actionTypes.GET_CHATROOMS,
        payload: {
          chatrooms: chatrooms,
          chatroomError: null
        }
      })
    }).catch(err => {
      dispatch({
        type: actionTypes.GET_CHATROOMS,
        payload: {
          chatrooms: [],
          chatroomError: err.message
        }
      })
    })
  }
}