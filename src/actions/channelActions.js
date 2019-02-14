import * as actionTypes from './types';

export const createChannel = channel => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.add(`channels/${channel.chatroom.id}/channels`, {
      name: channel.name,
      description: channel.description,
      uid: channel.user.uid,
      categoryId: channel.category.id,
      chatroomId: channel.chatroom.id,
      createdAt: firestore.FieldValue.serverTimestamp()
    }).then(() => {
      dispatch({
        type: actionTypes.CREATE_CHANNEL,
        payload: {
          channelError: null
        }
      })
    }).catch(err => {
      dispatch({
        type: actionTypes.CREATE_CHANNEL,
        payload: {
          channelError: err.message
        }
      })
    })
  }
}

export const deleteChannel = channel => {
  return (dispatch, getState, {getFirestore}) => {
    console.log(channel);
  }
}

export const getChannels = (chatroomId) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection(`channels/${chatroomId}/channels`).get().then(data => {
      let channels = [];
      data.forEach(doc => {
        channels.push({id: doc.id, channel: doc.data()})
      })
      let sortedChannels = channels.sort(function(a, b) {
        return new Date(a.channel.createdAt.toDate()) - new Date(b.channel.createdAt.toDate());
      });
      dispatch({
        type: actionTypes.GET_CHATROOM_CHANNELS,
        payload: {
          channelError: null,
          channels: sortedChannels
        }
      })
    }).catch(err => {
      dispatch({
        type: actionTypes.GET_CHATROOM_CHANNELS,
        payload: {
          channelError: err.message,
          channels: []
        }
      })
    })
  }
}

export const getChannelComments = (chatroomId, channelId) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection(`comments/${channelId}/comments`).get().then(data => {
      let comments = [];
      data.forEach(doc => {
        comments.push({id: doc.id, message: doc.data()})
      })

      let sortedComments = comments.sort(function(a, b) {
        return new Date(a.message.createdAt.toDate()) - new Date(b.message.createdAt.toDate());
      });

      dispatch({
        type: actionTypes.GET_CHANNEL_COMMENTS,
        payload: {
          channelError: null,
          comments: sortedComments
        }
      })
    }).catch(err => {
      dispatch({
        type: actionTypes.GET_CHANNEL_COMMENTS,
        payload: {
          channelError: err.message,
          comments: []
        }
      })
    })
  }
}

export const setComments = (docComments) => {
  return (dispatch) => {
    let comments = [];
    let commentToDelete = [];

    docComments.forEach(docComment => {
      if (docComment.type === 'added') {
        comments.push({id: docComment.doc.id, message: docComment.doc.data()})
      } else if (docComment.type === 'modified') {
        comments.push({id: docComment.doc.id, message: docComment.doc.data()})
      } else if (docComment.type === 'removed') {
        commentToDelete.push({id: docComment.doc.id, message: docComment.doc.data()})
      }
    })

    dispatch({
      type: actionTypes.SET_COMMENTS,
      payload: {
        comments: comments,
        channelError: null,
        commentToDelete: commentToDelete
      }
    })
  }
}

export const deleteChannelComment = (channelId, commentId) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection(`comments/${channelId}/comments`)
      .doc(commentId).delete().then(() => {
        dispatch({
          type: actionTypes.DELETE_CHANNEL_COMMENT,
          payload: {
            channelError: null
          }
        })
      }).catch(err => {
        dispatch({
          type: actionTypes.DELETE_CHANNEL_COMMENT,
          payload: {
            channelError: err.message
          }
        })
      })
  }
}
 
export const createChannelComment = comment => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    
    firestore.add(`comments/${comment.channel.id}/comments`, {
      comment: comment.comment,
      uid: comment.user.uid,
      username: comment.user.displayName,
      avatar: comment.user.photoURL,
      channelId: comment.channel.id,
      chatroomId: comment.channel.channel.chatroomId,     
      categoryId: comment.channel.channel.categoryId,
      createdAt: firestore.FieldValue.serverTimestamp()
    }).then(() => {
      dispatch({
        type: actionTypes.CREATE_CHANNEL_COMMENT,
        payload: {channelError: null}
      })
    }).catch(err => {
      dispatch({
        type: actionTypes.CREATE_CHANNEL_COMMENT,
        payload: {channelError: err.message}
      })
    })
  }
}

export const setChannel = channel => {
  return (dispatch) => {
    dispatch({
      type:actionTypes.SET_CHANNEL,
      payload: {currentChannel: channel}
    })
  }
}

export const unsetChannel = () => {
  return (dispatch) => {
    dispatch({
      type:actionTypes.UNSET_CHANNEL,
      payload: {currentChannel: null}
    })
  }
}