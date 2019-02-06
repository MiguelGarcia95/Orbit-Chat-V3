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
    let newComments = [...state.comments, ...action.payload.comments];
    
    var filteredComments = newComments.reduce((newArray, comment) => {
      if (newArray.length > 0) {
        let isInArray = false;
        newArray.forEach(arrayComment => {
          if (comment.id === arrayComment.id) {
            isInArray = true;
          }
        });
        if (!isInArray) {
          newArray.push(comment)
        }
      } else {
        newArray.push(comment)
      }
      return newArray
    }, []);

    let sortedComments = [];
    if (filteredComments.length !== 0) {
      sortedComments = filteredComments.sort((a, b) => {
        if (b.comment.createdAt !== null && a.comment.createdAt !== null) {
          return new Date(a.comment.createdAt.toDate()) - new Date(b.comment.createdAt.toDate());
        }
      });
    } else {
      sortedComments = [...filteredComments];
    }

      return {
        ...state,
        channelError: action.payload.channelError,
        comments: sortedComments
        // comments: action.payload.comments
      }
    default:
      return state;
  }
}

export default chatroomReducer;