import * as actionTypes from '../actions/types';
import {
  sortCommentsByDate, removeDeletedComments, sortChannelsByDate, 
  removeCommentsFromOtherChannels, removeDeletedChannels, removeDuplicates, sortByDate
} from '../utils/functions';

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
      let sortedChannels = sortByDate(allChannels, 'channel');
      let uniqueChannels = removeDuplicates(sortedChannels);
      let channels = removeDeletedChannels(uniqueChannels, action.payload.channelToDelete);
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
        let filteredComments = removeDuplicates(channelComemnts);
        let sortedComments = sortByDate(filteredComments, 'message');
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