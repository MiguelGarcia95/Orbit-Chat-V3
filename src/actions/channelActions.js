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
    firestore.collection(`comments/${chatroomId}-${channelId}/comments`).get().then(data => {
      let comments = [];
      data.forEach(doc => {
        comments.push({id: doc.id, comment: doc.data()})
      })

      let sortedComments = comments.sort(function(a, b) {
        return new Date(a.comment.createdAt.toDate()) - new Date(b.comment.createdAt.toDate());
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
    docComments.forEach(docComment => {
      if (docComment.type === 'added') {
        comments.push({id: docComment.doc.id, comment: docComment.doc.data()})
      } else if (docComment.type === 'removed') {

      } else {
        comments.push({id: docComment.doc.id, comment: docComment.doc.data()})
      }
    })

    let sortedComments = comments.sort(function(a, b) {
      return new Date(a.comment.createdAt.toDate()) - new Date(b.comment.createdAt.toDate());
    });

    dispatch({
      type: actionTypes.SET_COMMENTS,
      payload: {
        comments: sortedComments,
        channelError: null,
      }
    })
  }
}

export const createChannelComments = comment => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    // comments/ chatroomId-channelId / comments
    firestore.add(`comments/${comment.channel.channel.chatroomId}-${comment.channel.id}/comments`, {
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