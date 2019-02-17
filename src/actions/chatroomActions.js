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

export const setCategories = docCategories => {
  return (dispatch) => {
    let categories = [];
    let categoryToDelete = [];
    docCategories.forEach(docCategory => {
      if (docCategory.type === 'added') {
        categories.push({id: docCategory.doc.id, category: docCategory.doc.data()})
      } else if (docCategory.type === 'modified') {
        categories.push({id: docCategory.doc.id, category: docCategory.doc.data()})
      } else if (docCategory.type === 'removed') {
        categoryToDelete.push({id: docCategory.doc.id, category: docCategory.doc.data()})
      }
    })

    dispatch({
      type: actionTypes.SET_CHATROOM_CATEGORIES,
      payload: {
        chatroomError: null,
        categories: categories,
        categoryToDelete: categoryToDelete
      }
    })
  }
}

export const joinChatroom = (user, chatroom) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();

    firestore.collection(`users/${user.uid}/chatrooms`).doc(chatroom.id).set({
      avatar: chatroom.chatroom.avatar,
      createdAt: chatroom.chatroom.createdAt,
      description: chatroom.chatroom.description,
      name: chatroom.chatroom.name,
      uid: chatroom.chatroom.uid
    }).then(() => {
      dispatch({
        type: actionTypes.JOIN_CHATROOM,
        payload: {
          homeError: null
        }
      })
    }).catch(err => {
      dispatch({
        type: actionTypes.JOIN_CHATROOM,
        payload: {
          homeError: err.message
        }
      })
    })
  }
};

export const leaveChatroom = (user, chatroom) => {
  return (dispatch, getState, {getFirestore}) => {
    console.log(user);
    console.log(chatroom);
  }
};

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
        chatroomRedirect: false,
        categories: []
      }
    })
  }
}

export const setChatrooms = (docChatrooms) => {
  return (dispatch) => {
    let chatrooms = [];
    let chatroomToDelete = [];
    docChatrooms.forEach(docChatroom => {
      if (docChatroom.type === 'added') {
        chatrooms.push({id: docChatroom.doc.id, chatroom: docChatroom.doc.data()})
      } else if (docChatroom.type === 'modified') {
        chatrooms.push({id: docChatroom.doc.id, chatroom: docChatroom.doc.data()})
      } else if (docChatroom.type === 'removed') {
        chatroomToDelete.push({id: docChatroom.doc.id, chatroom: docChatroom.doc.data()})
      }
    })

    dispatch({
      type: actionTypes.SET_CHATROOMS,
      payload: {
        chatrooms: chatrooms,
        chatroomError: null,
        chatroomToDelete: chatroomToDelete
      }
    })
  }
}