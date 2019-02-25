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

export const rejectChatroomInvitation = (userId, chatroomId) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();

    let removeUserInviteToChatroomRef = firestore.collection(`chatrooms/${chatroomId}/invites`).doc(userId);
    let removeChatroomInviteToUserRef = firestore.collection(`users/${userId}/chatroom-invides`).doc(chatroomId);

    removeUserInviteToChatroomRef.delete();
    removeChatroomInviteToUserRef.delete().then(() => {
      dispatch({
        type: actionTypes.REJECT_CHATROOM,
        payload: {
          chatroomError: null        
        }
      })
    }).catch(err => {
      dispatch({
        type: actionTypes.REJECT_CHATROOM,
        payload: {
          chatroomError: err.message        
        }
      })
    })

  }
}

export const getChatroomInvitations = chatroomId => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection(`chatrooms/${chatroomId}/invites`).get().then(data => {
      let chatroomInvites = [];
      data.forEach(chatroomInvite => {
        chatroomInvites.push({id: chatroomInvite.id, invite: chatroomInvite.data()})
      })

      dispatch({
        type: actionTypes.GET_CHATROOM_INVITES,
        payload:{
          chatroomError: null,
          chatroomInvites: chatroomInvites   
        }
      })
    }).catch(err => {
      dispatch({
        type: actionTypes.GET_CHATROOM_INVITES,
        payload:{
          chatroomError: err.message,
          chatroomInvites: []   
        }
      })
    });
  }
}

export const inviteChatroom = (friendId, chatroom) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();

    let addUserInviteToChatroomRef = firestore.collection(`chatrooms/${chatroom.id}/invites`).doc(friendId);
    let addChatroomInviteToUserRef = firestore.collection(`users/${friendId}/chatroom-invides`).doc(chatroom.id);

    addUserInviteToChatroomRef.get().then(doc => {
      if (!doc.exists) {
        addUserInviteToChatroomRef.set({
          uid: friendId,
          chatroomId: chatroom.id
        });
      }
    })

    addChatroomInviteToUserRef.get().then(doc => {
      if (!doc.exists) {
        addChatroomInviteToUserRef.set({
          name:  chatroom.chatroom.name,
          description:  chatroom.chatroom.description,
          avatar: chatroom.chatroom.avatar,
          uid: chatroom.chatroom.uid,
          createdAt: firestore.FieldValue.serverTimestamp()
        }).then(() => {
          dispatch({
            type: actionTypes.INVITE_CHATROOM,
            payload: {
              chatroomError: null        
            }
          })
        }).catch(err => {
          dispatch({
            type: actionTypes.INVITE_CHATROOM,
            payload: {
              chatroomError: err.message        
            }
          })
        })
      } else {
        dispatch({
          type: actionTypes.INVITE_CHATROOM,
          payload: {
            chatroomError: 'Already Invited'        
          }
        })
      }
    })
  }
}

export const joinChatroom = (user, chatroom) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();

    let removeUserInviteToChatroomRef = firestore.collection(`chatrooms/${chatroom.id}/invites`).doc(user.uid);
    let removeChatroomInviteToUserRef = firestore.collection(`users/${user.uid}/chatroom-invides`).doc(chatroom.id);

    let addUserToChatroomRef = firestore.collection(`chatrooms/${chatroom.id}/users`).doc(user.uid);
    let addChatroomRefToUserRef = firestore.collection(`users/${user.uid}/chatrooms`).doc(chatroom.id);

    removeUserInviteToChatroomRef.get().then(doc => {
      if (doc.exists) {
        removeUserInviteToChatroomRef.delete();
      }
    });

    removeChatroomInviteToUserRef.get().then(doc => {
      if (doc.exists) {
        removeChatroomInviteToUserRef.delete();
      }
    });

    addUserToChatroomRef.get().then(doc => {
      if (!doc.exists) {
        addUserToChatroomRef.set({
          uid: user.uid,
          avatar: user.photoURL,
          username: user.displayName
        })
      }
    })
    
    addChatroomRefToUserRef.get().then(doc => {
      if (!doc.exists) {
        addChatroomRefToUserRef.set({
          name:  chatroom.chatroom.name,
          description:  chatroom.chatroom.description,
          avatar: chatroom.chatroom.avatar,
          uid: chatroom.chatroom.uid,
          createdAt: firestore.FieldValue.serverTimestamp()
        }).then(() => {
          dispatch({
            type: actionTypes.JOIN_CHATROOM,
            payload: {
              chatroomError: null,
              currentChatroom: chatroom
            }
          })
        })
      } else {
        dispatch({
          type: actionTypes.JOIN_CHATROOM,
          payload: {
            chatroomError: 'Already In Chatroom',
            currentChatroom: chatroom
          }
        })
      }
    })
  }
};

export const triggerChatroomRedirect = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CHATROOM_REDIRECT,
      payload: {
        chatroomError: null,
        chatroomRedirect: true,
        inChatroom: false
      }
    })
  }
}

export const clearChatroomRedirect = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CHATROOM_REDIRECT,
      payload: {
        chatroomError: null,
        chatroomRedirect: false,
        inChatroom: true
      }
    })
  }
}

export const leaveChatroom = (user, chatroom) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    let addUserToChatroomRef = firestore.collection(`chatrooms/${chatroom.id}/users`).doc(user.uid);
    addUserToChatroomRef.get().then(doc => {
      if (doc.exists) {
        addUserToChatroomRef.delete();
      }
    })

    let chatroomRef = firestore.collection(`users/${user.uid}/chatrooms`).doc(chatroom.id);
    chatroomRef.get().then(doc => {
      if (doc.exists) {
        chatroomRef.delete().then(() => {
          dispatch({
            type: actionTypes.LEAVE_CHATROOM,
            payload: {
              chatroomError: null,
              currentChatroom: null,
              chatroomRedirect: true
            }
          })
        }).catch(err => {
          dispatch({
            type: actionTypes.LEAVE_CHATROOM,
            payload: {
              chatroomError: err.message,
              currentChatroom: chatroom,
              chatroomRedirect: false
            }
          })
        })
      } else {
        dispatch({
          type: actionTypes.LEAVE_CHATROOM,
          payload: {
            chatroomError: 'You are not a member of this chatroom...',
            currentChatroom: null,
            chatroomRedirect: false
          }
        })
      }
    })
  }
};

export const getChatroomUsers = chatroomId => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection(`chatrooms/${chatroomId}/users`).get().then(data => {
      let users = [];
      data.forEach(doc => {
        users.push({id: doc.id, user: doc.data()})
      });
      dispatch({
        type: actionTypes.GET_CHATROOM_USERS,
        payload: {
          chatroomError: null,
          chatroomUsers: users
        }
      })
    }).catch(err => {
      dispatch({
        type: actionTypes.GET_CHATROOM_USERS,
        payload: {
          chatroomError: err.message,
          chatroomUsers: []
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
        chatroomRedirect: false,
        categories: [],
        chatroomUsers: []
      }
    })
  }
}

export const setChatroomUsers = docUsers => {
  return (dispatch) => {
    let users = [];
    // let usersToUpdate = [];
    let usersToDelete = [];
    docUsers.forEach(docUser => {
      if (docUser.type === 'added') {
        users.push({id: docUser.doc.id, chatroom: docUser.doc.data()})
      } else if (docUser.type === 'modified') {
        users.push({id: docUser.doc.id, chatroom: docUser.doc.data()})
      } else if (docUser.type === 'removed') {
        usersToDelete.push({id: docUser.doc.id, chatroom: docUser.doc.data()})
      }
    })

    dispatch({
      type: actionTypes.SET_CHATROOM_USERS,
      payload: {
        chatroomError: null,
        chatroomUsers: users,
        usersToDelete: usersToDelete
      }
    })
  }
}

export const setChatroomInvitations = docInvitations => {
  return (dispatch) => {
    console.log(docInvitations);
    let invitations = [];
    // let invitationsToUpdate = [];
    let invitationsToDelete = [];
    docInvitations.forEach(docInvitation => {
      if (docInvitation.type === 'added') {
        invitations.push({id: docInvitation.doc.id, chatroom: docInvitation.doc.data()})
      } else if (docInvitation.type === 'modified') {
        invitations.push({id: docInvitation.doc.id, chatroom: docInvitation.doc.data()})
      } else if (docInvitation.type === 'removed') {
        invitationsToDelete.push({id: docInvitation.doc.id, chatroom: docInvitation.doc.data()})
      }
    })

    dispatch({
      type: actionTypes.SET_CHATROOM_USERS,
      payload: {
        chatroomError: null,
        chatroomInvitations: invitations,
        invitationsToDelete: invitationsToDelete
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