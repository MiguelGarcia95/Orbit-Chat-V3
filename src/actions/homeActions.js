import * as actionTypes from './types';

export const createDirectMessage = (user, message, comment) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();


    firestore.add(`users/${user.uid}/messages/${message.uid}/messages`, {
      comment: comment,
      uid: user.uid,
      uid1: user.uid,
      uid2: message.uid,
      username: user.displayName,
      avatar: user.photoURL,
      avatar2: message.avatar,
      createdAt: firestore.FieldValue.serverTimestamp()
    }).catch(err => {
      dispatch({
        type: actionTypes.CREATE_DIRECT_MESSAGE,
        payload: {
          homeError: err.message
        }
      })
    })

    firestore.add(`users/${message.uid}/messages/${user.uid}/messages`, {
      comment: comment,
      uid: user.uid,
      uid1: message.uid,
      uid2: user.uid,
      username: user.displayName,
      avatar: user.photoURL,
      avatar2: message.avatar,
      createdAt: firestore.FieldValue.serverTimestamp()
    }).then(() => {
      dispatch({
        type: actionTypes.CREATE_DIRECT_MESSAGE,
        payload: {
          homeError: null
        }
      })
    }).catch(err => {
      dispatch({
        type: actionTypes.CREATE_DIRECT_MESSAGE,
        payload: {
          homeError: err.message
        }
      })
    })
  }
}

export const getDirectMessagesReference = userId => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection(`users/${userId}/dmList`).get().then(data => {
      let references = [];
      data.forEach(doc => {
        references.push(doc.data())
      })

      dispatch({
        type: actionTypes.GET_DIRECT_MESSAGES_REFERENCE,
        payload: {
          homeError: null,
          references: references
        }
      })
    }).catch(err => {
      dispatch({
        type: actionTypes.GET_DIRECT_MESSAGES_REFERENCE,
        payload: {
          homeError: err.message,
          references: []
        }
      })
    })
  }
}

export const deleteDirectMessage = message => {
  return (dispatch, getState, {getFirestore}) => {
    console.log(message.id)
  }
}

export const joinChatroom = (user, chatroom) => {
  return (dispatch, getState, {getFirestore}) => {
    console.log(user);
    console.log(chatroom)
  }
};

export const leaveChatroom = (user, chatroom) => {
  return (dispatch, getState, {getFirestore}) => {
    console.log(user);
    console.log(chatroom);
  }
};

export const addFriend = (user, friend) => {
  return (dispatch, getState, {getFirestore}) => {
    console.log(user);
    console.log(friend)
  }
};

export const removeFriend = (user, friend) => {
  return (dispatch, getState, {getFirestore}) => {
    console.log(user);
    console.log(friend)
  }
};

export const setFriendsPanel = (user) => {
  return (dispatch, getState, {getFirestore}) => {
    console.log(user);
  }
}

export const displayDirectMessages = (user, otherUser) => {
  return (dispatch, getState, {getFirestore}) => {
    console.log(user);
    console.log(otherUser)
  }
} 

export const getDirectMessages = (user, reference) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    
    // console.log(user.uid);
    // console.log(reference);
    
    firestore.collection(`users/${user.uid}/messages/${reference}/messages`).get().then(data => {
      let messages = [];
      let avatar;
      data.forEach(doc => {
        if (!avatar) {
          avatar = doc.data().avatar2;
        }
        messages.push({id: doc.id, data: doc.data()})
      })

      dispatch({
        type: actionTypes.GET_DIRECT_MESSAGES,
        payload: {
          homeError: null,
          userMessages: {uid: reference, avatar: avatar, messages: messages}
        }
      })
    }).catch(err => {
      dispatch({
        type: actionTypes.GET_DIRECT_MESSAGES,
        payload: {
          homeError: err.message,
          userMessages: null
        }
      })
    })
  }
}