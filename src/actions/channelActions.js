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