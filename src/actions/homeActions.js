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

export const addFriend = (user, otherUser) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();

    let addFriendRef = firestore.collection(`users/${user.uid}/friends`).doc(otherUser.uid);
    let addFriendRef2 = firestore.collection(`users/${otherUser.uid}/friends`).doc(user.uid);
    addFriendRef.get().then(doc => {
      if (!doc.exists) {
        addFriendRef.set({
            uid: otherUser.uid,
            username: otherUser.username,
            avatar: otherUser.avatar,
            status: 'pending',
            canAccept: otherUser.uid
        })
        addFriendRef2.set({
          uid: user.uid,
          username: user.displayName,
          avatar: user.photoURL,
          status: 'pending',
          canAccept: otherUser.uid
      }).then(() => {
          dispatch({
            type: actionTypes.ADD_FRIEND,
            payload: {
              homeError: null
            }
          })
        }).catch(err => {
          dispatch({
            type: actionTypes.ADD_FRIEND,
            payload: {
              homeError: err.message
            }
          })
        })
      } else {
        dispatch({
          type: actionTypes.ADD_FRIEND,
          payload: {
            homeError: 'Friend Request Already Sent.'
          }
        })
      }
    })
  }
};

export const acceptFriend = (user, otherUser) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();

    let acceptFriendRef = firestore.collection(`users/${user.uid}/friends`).doc(otherUser.uid);
    let acceptFriendRef2 = firestore.collection(`users/${otherUser.uid}/friends`).doc(user.uid);
    acceptFriendRef.update({
      status: 'accepted'
    });
    acceptFriendRef2.update({
      status: 'accepted'
    }).then(() => {
      dispatch({
        type: actionTypes.ACCEPT_FRIEND,
        payload: {
          homeError: null
        }
      })
    }).catch(err => {
      dispatch({
        type: actionTypes.ACCEPT_FRIEND,
        payload: {
          homeError: err.message
        }
      })
    })
  }
}

export const rejectFriend = (user, otherUser) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();

    let rejectFriendRef = firestore.collection(`users/${user.uid}/friends`).doc(otherUser.uid);
    let rejectFriendRef2 = firestore.collection(`users/${otherUser.uid}/friends`).doc(user.uid);
    rejectFriendRef.delete();
    rejectFriendRef2.update({
      status: 'rejected'
    }).then(() => {
      dispatch({
        type: actionTypes.REJECT_FRIEND,
        payload: {
          homeError: null
        }
      })
    }).catch(err => {
      dispatch({
        type: actionTypes.REJECT_FRIEND,
        payload: {
          homeError: err.message
        }
      })
    })
  }
}

export const deleteFriend = (user, otherUser) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();

    firestore.collection(`users/${user.uid}/friends`).doc(otherUser.uid).delete().then(() => {
      dispatch({
        type: actionTypes.DELETE_FRIEND,
        payload: {
          homeError: null
        }
      })
    }).catch(err => {
      dispatch({
        type: actionTypes.DELETE_FRIEND,
        payload: {
          homeError: err.message
        }
      })
    });
  }
};

export const setFriends = docFriends => {
  return (dispatch) => {
    let friends = [];
    let friendToDelete = [];
    docFriends.forEach(docFriend => {
      if (docFriend.type === 'added') {
        friends.push({id: docFriend.doc.id, friend: docFriend.doc.data()});
      } else if (docFriend.type === 'modified') {
        friends.push({id: docFriend.doc.id, friend: docFriend.doc.data()});
      } else if (docFriend.type === 'removed') {
        friendToDelete.push({id: docFriend.doc.id, friend: docFriend.doc.data()});
      }
    });

    dispatch({
      type: actionTypes.SET_FRIENDS,
      payload: {
        friendsList: friends,
        homeError: null,
        friendToDelete: friendToDelete
      }
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
        commentToDelete.push({id: docComment.doc.id, message: docComment.doc.data(), reference: reference})
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
    
    docReferences.forEach(docReference => {
      if (docReference.type === 'added') {
        references.push(docReference.doc.data())
      } else if (docReference.type === 'modified') {
        references.push(docReference.doc.data())
      } else if (docReference.type === 'removed') {
        referencesToDelete.push(docReference.doc.data())
      }
    })

    dispatch({
      type: actionTypes.SET_DIRECT_MESSAGES_REFERENCE,
      payload: {
        homeError: null,
        references: references,
        referencesToDelete: referencesToDelete
      }
    })
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