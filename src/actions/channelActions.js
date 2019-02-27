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

export const deleteChannel = (channelId, chatroomId) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection(`comments/${channelId}/comments`).get().then(data => {
      let commentIds = [];
      data.forEach(doc => commentIds.push(doc.id));
      commentIds.forEach(messageId => {
        firestore.collection(`comments/${channelId}/comments`).doc(messageId).delete()
      });
    })
    firestore.collection(`channels/${chatroomId}/channels`).doc(channelId).delete().then(() => {
      dispatch({
        type: actionTypes.DELETE_CHANNEL,
        channelError: null,
        currentChannel: null
      })
    }).catch(err => {
      dispatch({
        type: actionTypes.DELETE_CHANNEL,
        channelError: err.message,
        currentChannel: null
      })
    })
  }
}

export const setChannels = docChannels => {
  return (dispatch) => {
    let channels = [];
    let channelToDelete = [];

    docChannels.forEach(docChannel => {
      if (docChannel.type === 'added') {
        channels.push({id: docChannel.doc.id, channel: docChannel.doc.data()})
      } else if (docChannel.type === 'modified') {
        channels.push({id: docChannel.doc.id, channel: docChannel.doc.data()})
      } else if (docChannel.type === 'removed') {
        channelToDelete.push({id: docChannel.doc.id, channel: docChannel.doc.data()})
      }
    })

    console.log(channelToDelete);

    dispatch({
      type: actionTypes.SET_CHANNELS,
      payload: {
        channelError: null,
        channels: channels,
        channelToDelete: channelToDelete
      }
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
      payload: {
        currentChannel: null,
        channels: [],
        comments: []
      }
    })
  }
}