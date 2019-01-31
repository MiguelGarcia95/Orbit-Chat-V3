import * as actionTypes from './types';

export const createChannel = channel => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    // channels / chatroomId-categoryId / channels
    firestore.add(`channels/${channel.chatroom.id}-${channel.category.id}/channels`, {
      name: channel.name,
      description: channel.description,
      uid: channel.user.uid,
      categoryId: channel.category.id,
      chatroomId: channel.chatroom.id
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

export const getChannels = (chatroomId, categoryId) => {
  return (dispatch, getState, {getFirestore}) => {
    console.log(chatroomId)
    console.log(categoryId)
  }
}