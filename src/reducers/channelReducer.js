import * as actionTypes from '../actions/types';
import {removeDuplicateComments, sortCommentsByDate, removeDeletedComments, sortChannelsByDate, removeCommentsFromOtherChannels, removeDuplicateChannels} from '../utils/functions';

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
    case actionTypes.SET_CHANNELS:
      let allChannels = [...state.channels, ...action.payload.channels];
      let sortedChannels = sortChannelsByDate(allChannels);
      let channels = removeDuplicateChannels(sortedChannels);
      return {
        ...state,
        channels: channels,
        channelError: action.payload.channelError
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
    case actionTypes.SET_COMMENTS:
      let newComments = [...state.comments, ...action.payload.comments];
      let comments = [];
      if (state.currentChannel) {
        let channelComemnts = removeCommentsFromOtherChannels(newComments, state.currentChannel.id);
        let filteredComments = removeDuplicateComments(channelComemnts);
        let sortedComments = sortCommentsByDate(filteredComments);
        comments = removeDeletedComments(sortedComments, action.payload.commentToDelete);
      }

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