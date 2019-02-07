import * as actionTypes from './types';

export const createChatroom = chatroom => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.add('chatrooms', {
      name:  chatroom.name,
      description:  chatroom.description,
      avatar: chatroom.user.photoURL,
      uid: chatroom.user.uid,
      createdAt: firestore.FieldValue.serverTimestamp()
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

export const deleteChatroom = chatroom => {
  return (dispatch, getState, {getFirestore}) => {
    console.log(chatroom)
  }
}

export const createCategory = category => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.add(`categories/${category.chatroom.id}/categories`, {
      name: category.name,
      chatroomId: category.chatroom.id,
      uid: category.user.uid,
      createdAt: firestore.FieldValue.serverTimestamp()
    }).then(() => {
      dispatch({
        type: actionTypes.CREATE_CATEGORY,
        payload: {
          chatroomError: null
        }
      })
    }).catch(err => {
      dispatch({
        type: actionTypes.CREATE_CATEGORY,
        payload: {
          chatroomError: err.message
        }
      })
    })
  }
}

export const getChatroomCategories = chatroomId => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection(`categories/${chatroomId}/categories`).get().then(data => {
      let categories = [];
      data.forEach(doc => {
        categories.push({id: doc.id, category: doc.data()})
      })
      let sortedcategories = categories.sort(function(a, b) {
        return new Date(a.category.createdAt.toDate()) - new Date(b.category.createdAt.toDate());
      });
      dispatch({
        type: actionTypes.GET_CHATROOM_CATEGORIES,
        payload: {
          chatroomError: null,
          categories: sortedcategories
        }
      })
    }).catch(err => {
      dispatch({
        type: actionTypes.GET_CHATROOM_CATEGORIES,
        payload: {
          chatroomError: err.message,
          categories: []
        }
      })
    })
  }
}

export const getChatroom = chatroomId => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('chatrooms').doc(chatroomId).get().then(chatroom => {
      if (chatroom.exists) {
        dispatch({
          type: actionTypes.GET_CHATROOM,
          payload: {
            currentChatroom: {id: chatroom.id, chatroom: chatroom.data()},
            chatroomError: null,
            inChatroom: true,
            chatroomRedirect: false
          }
        })
      } else {
        dispatch({
          type: actionTypes.GET_CHATROOM,
          payload: {
            currentChatroom: null,
            chatroomError: 'Chatroom does not exist.',
            inChatroom: true,
            chatroomRedirect: true
          }
        })
      }
    }).catch(err => {
      dispatch({
        type: actionTypes.GET_CHATROOM,
        payload: {
          currentChatroom: null,
          chatroomError: err.message,
          inChatroom: true,
          chatroomRedirect: true
        }
      })
    })
  }
}

export const clearChatroom = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CLEAR_CHATROOM,
      payload: {
        chatroomError: null,
        currentChatroom: null,
        inChatroom: false,
        chatroomRedirect: false
      }
    })
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