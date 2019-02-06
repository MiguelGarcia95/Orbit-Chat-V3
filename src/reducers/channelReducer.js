import * as actionTypes from '../actions/types';

const initialState = {
  currentChannel: null,
  channelError: null,
  channels: [],
  comments: []
}

const chatroomReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_CHANNEL: 
      return {
        ...state,
        channelError: action.payload.channelError
      }
    case actionTypes.GET_CHATROOM_CHANNELS:
      return {
        ...state,
        channelError: action.payload.channelError,
        channels: action.payload.channels
      }
    case actionTypes.SET_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload.currentChannel
      }
    case actionTypes.CREATE_CHANNEL_COMMENT:
      return {
        ...state,
        channelError: action.payload.channelError
      }
    case actionTypes.UNSET_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload.currentChannel
      }
    case actionTypes.GET_CHANNEL_COMMENTS:
      return {
        ...state,
        channelError: action.payload.channelError,
        comments: action.payload.comments
      }
    case actionTypes.SET_COMMENTS:
    // console.log('Old Comments', state.comments);
    // console.log('Incoming Comments', action.payload.comments);
    let newComments = [...state.comments, ...action.payload.comments];

    var filteredComments = newComments.reduce((newArray, comment) => {
      if (newArray.length > 0) {

      } else {
        console.log('New Array is 0')
        newArray.push(comment)
      }
      return newArray
    }, []);

    console.log(filteredComments)

    // let sortedComments = newComments.sort(function(a, b) {
    //   return new Date(a.comment.createdAt.toDate()) - new Date(b.comment.createdAt.toDate());
    // });
    console.log('New Comment Array', newComments);
      return {
        ...state,
        channelError: action.payload.channelError,
        comments: action.payload.comments
      }
    default:
      return state;
  }
}

export default chatroomReducer;