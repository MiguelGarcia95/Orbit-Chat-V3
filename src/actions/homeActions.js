import * as actionTypes from './types';

export const createDirectMessage = (user, otherUser, comment) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();

    firestore.add(`users/${user.uid}/messages/${otherUser.uid}/messages`, {
      comment: comment,
      uid: user.uid,
      username: user.displayName,
      avatar: user.photoURL,
      createdAt: firestore.FieldValue.serverTimestamp()
    }).then(() => {
        let listRef = firestore.collection(`users/${user.uid}/dmList`).doc(otherUser.uid);
        listRef.get().then(doc => {
          if (!doc.exists) {
            listRef.set({
              uid: otherUser.uid,
              avatar: otherUser.avatar,
              username: otherUser.username
            })
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

    firestore.add(`users/${otherUser.uid}/messages/${user.uid}/messages`, {
      comment: comment,
      uid: user.uid,
      username: user.displayName,
      avatar: user.photoURL,
      createdAt: firestore.FieldValue.serverTimestamp()
    }).then(() => {
      let listRef = firestore.collection(`users/${otherUser.uid}/dmList`).doc(user.uid);
        listRef.get().then(doc => {
          if (!doc.exists) {
            listRef.set({
              uid: user.uid,
              avatar: user.photoURL,
              username: user.displayName
            })
          }
        })

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

export const getReference = (userId, referenceId) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection(`users/${userId}/dmList`).doc(referenceId).get().then(data => {
      const currentReference = data.data();
      dispatch({
        type: actionTypes.GET_REFERENCE,
        payload: {
          homeError: null,
          currentReference: currentReference
        }
      })
    }).catch(err => {
      dispatch({
        type: actionTypes.GET_REFERENCE,
        payload: {
          homeError: err.message,
          currentReference: null
        }
      })
    })
  } 
}

export const setHomeView = view => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_HOME_VIEW,
      payload: {
        homeError: null,
        currentView: view
      }
    })
  }
}

export const deleteDirectMessageChat = (user, otherUser, allMessageIds) => {
  return (dispatch, getstate, {getFirestore}) => {
    const firestore = getFirestore();

    allMessageIds.forEach(messageId => {
      firestore
        .collection(`users/${user.uid}/messages/${otherUser.uid}/messages`)
        .doc(messageId)
        .delete()
    })

    firestore.collection(`users/${user.uid}/dmList`).doc(otherUser.uid)
      .delete().then(() => {
        dispatch({
          type: actionTypes.DELETE_DIRECT_MESSAGE_CHAT,
          payload: {
            homeError: null,
            currentView: 'friends'
          }
        })
      })
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

export const getDirectMessages = (user, otherUserId) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    
    firestore.collection(`users/${user.uid}/messages/${otherUserId}/messages`).get().then(data => {
      let messages = [];
      data.forEach(doc => {
        messages.push({id: doc.id, message: doc.data()})
      })

      let sortedMessages = messages.sort((a, b) => {
        if (b.message.createdAt !== null && a.message.createdAt !== null) {
          return new Date(a.message.createdAt.toDate()) - new Date(b.message.createdAt.toDate());
        }
      });

      dispatch({
        type: actionTypes.GET_DIRECT_MESSAGES,
        payload: {
          homeError: null,
          userMessages: sortedMessages
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

export const setComments = (docComments, reference) => {
  return (dispatch) => {
    let comments = [];
    let commentToDelete = [];
    docComments.forEach(docComment => {
      if (docComment.type === 'added') {
        comments.push({id: docComment.doc.id, message: docComment.doc.data(), reference: reference})
      } else if (docComment.type === 'modified') {
        comments.push({id: docComment.doc.id, message: docComment.doc.data(), reference: reference})
      } else if (docComment.type === 'removed') {
        commentToDelete.push({id: docComment.doc.id, commmessageent: docComment.doc.data(), reference: reference})
      }
    })

    dispatch({
      type: actionTypes.SET_COMMENTS_HOME,
      payload: {
        userMessages: comments,
        homeError: null,
        commentToDelete: commentToDelete,
        referenceId: reference
      }
    })
  }
}

export const setReferences = docReferences => {
  return (dispatch) => {
    let references = [];
    let referencesToDelete = [];

    

  }
}

export const deleteDirectMessage = (user, otherUserId, commentId) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection(`users/${user.uid}/messages/${otherUserId}/messages`)
      .doc(commentId).delete().then(() => {
        dispatch({
          type: actionTypes.DELETE_DIRECT_MESSAGE,
          payload: {
            homeError: null
          }
        })
      }).catch(err => {
        dispatch({
          type: actionTypes.DELETE_DIRECT_MESSAGE,
          payload: {
            homeError: err.message
          }
        })
      })
  }
}