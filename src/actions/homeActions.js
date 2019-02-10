import * as actionTypes from './types';

export const createDirectMessage = (user, secondUserId, message) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();

    firestore.add(`users/${user.uid}/messages/${secondUserId}/messages`, {
      comment: message,
      uid: user.uid,
      uid1: user.uid,
      uid2: secondUserId,
      username: user.displayName,
      avatar: user.photoURL,
      createdAt: firestore.FieldValue.serverTimestamp()
    }).catch(err => {
      dispatch({
        type: actionTypes.CREATE_DIRECT_MESSAGE,
        payload: {
          homeError: err.message
        }
      })
    })

    firestore.add(`users/${secondUserId}/messages/${user.uid}/messages`, {
      comment: message,
      uid: user.uid,
      uid1: secondUserId,
      uid2: user.uid,
      username: user.displayName,
      avatar: user.photoURL,
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
    
    // firestore.collection('users').doc(user.uid).get().then(doc => {
    //     // data.forEach(doc => {
    //     //   console.log({id: doc.id, data: doc.data()})
    //     // })
    //   console.log(doc.data())
    // })
  }
}