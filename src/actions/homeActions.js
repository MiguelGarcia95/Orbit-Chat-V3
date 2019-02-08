import * as actionTypes from './types';

export const createDirectMessage = (user, secondUser, message) => {
  return (dispatch, getState, {getFirestore}) => {
    console.log(message)
  }
}

export const deleteDirectMessage = message => {
  return (dispatch, getState, {getFirestore}) => {
    console.log(message.id)
  }
}

export const joinChatroom = (user, chatroom) => {
  return (dispatch, getState, {getFirestore}) => {
    console.log(user);
    console.log(chatroom)
  }
};

export const leaveChatroom = (user, chatroom) => {
  return (dispatch, getState, {getFirestore}) => {
    console.log(user);
    console.log(chatroom);
  }
};

export const addFriend = (user, friend) => {
  return (dispatch, getState, {getFirestore}) => {
    console.log(user);
    console.log(friend)
  }
};

export const removeFriend = (user, friend) => {
  return (dispatch, getState, {getFirestore}) => {
    console.log(user);
    console.log(friend)
  }
};

export const setFriendsPanel = (user) => {
  return (dispatch, getState, {getFirestore}) => {
    console.log(user);
  }
}

export const displayDirectMessages = (user, otherUser) => {
  return (dispatch, getState, {getFirestore}) => {
    console.log(user);
    console.log(otherUser)
  }
} 

export const getDirectMessages = (user) => {
  return (dispatch, getState, {getFirestore}) => {
    console.log(user)
  }
}