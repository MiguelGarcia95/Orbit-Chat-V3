import * as actionTypes from '../actions/types';
import {removeDuplicateComments, sortCommentsByDate, removeDeletedComments} from '../utils/functions';

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
    case actionTypes.DELETE_CHANNEL_COMMENT:
      return {
        ...state,
        channelError: action.payload.channelError
      }
    case actionTypes.UNSET_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload.currentChannel,
        channels: action.payload.channels,
        comments: action.payload.comments
      }
    case actionTypes.GET_CHANNEL_COMMENTS:
      return {
        ...state,
        channelError: action.payload.channelError,
        comments: action.payload.comments
      }
    case actionTypes.SET_COMMENTS:
    let newComments = [...state.comments, ...action.payload.comments];
    let filteredComments = removeDuplicateComments(newComments);
    let sortedComments = sortCommentsByDate(filteredComments);
    let comments = removeDeletedComments(sortedComments, action.payload.commentToDelete);

      return {
        ...state,
        channelError: action.payload.channelError,
        comments: comments
      }
    default:
      return state;
  }
}

export default chatroomReducer;