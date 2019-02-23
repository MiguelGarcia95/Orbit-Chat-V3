export const removeDuplicateComments = (comments) => {
  return comments.reduce((newArray, comment) => {
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
}

export const sortCommentsByDate = (comments) => {
  let sortedComments = [];

  if (comments.length !== 0) {
    sortedComments = comments.sort((a, b) => {
      if (b.message.createdAt !== null && a.message.createdAt !== null) {
        return new Date(a.message.createdAt.toDate()) - new Date(b.message.createdAt.toDate());
      }
    });
  } else {
    sortedComments = [...comments];
  }

  return sortedComments;
}

export const removeCommentsFromOtherChannels = (comments, channelId) => {
  let channelComments = [];
  comments.forEach(comment => {
    if (comment.message.channelId === channelId) {
      channelComments.push(comment)
    }
  })
  return channelComments;
}

export const removeDeletedComments = (comments, commentToDelete) => {
  return comments.reduce((newArray, comment) => {
    if (commentToDelete.length > 0) {
      if (commentToDelete[0].id !== comment.id) {
        newArray.push(comment)
      }
    } else {
      newArray.push(comment)
    }
    return newArray;
  }, []);
}

export const removeUnrelatedComments = (comments, referenceId) => {
  return comments.reduce((newArray, comment) => {
    if (referenceId === comment.reference) {
      newArray.push(comment)
    }
    return newArray;
  }, [])
}

export const getIdsFromMessages = messages => {
  let messageIds = [];
  messages.forEach(message => {
    messageIds.push(message.id);
  });
  return messageIds;
}

export const removeDuplicateReferences = (references) => {
  return references.reduce((newArray, reference) => {
    if (newArray.length > 0) {
      let isInArray = false;
      newArray.forEach(arrayReference => {
        if (reference.uid === arrayReference.uid) {
          isInArray = true;
        }
      });
      if (!isInArray) {
        newArray.push(reference)
      }
    } else {
      newArray.push(reference)
    }
    return newArray
  }, []);
}

export const removeDeletedReferences = (references, referenceToDelete) => {
  return references.reduce((newArray, reference) => {
    if (referenceToDelete.length > 0) {
      if (referenceToDelete[0].uid !== reference.uid) {
        newArray.push(reference)
      }
    } else {
      newArray.push(reference)
    }
    return newArray;
  }, []);
}

export const removeDuplicateChatrooms = (chatrooms) => {
  return chatrooms.reduce((newArray, chatroom) => {
    if (newArray.length > 0) {
      let isInArray = false;
      newArray.forEach(arrayChatroom => {
        if (chatroom.id === arrayChatroom.id) {
          isInArray = true;
        }
      });
      if (!isInArray) {
        newArray.push(chatroom)
      }
    } else {
      newArray.push(chatroom)
    }
    return newArray
  }, []);
}

export const removeDeletedChatrooms = (chatrooms, chatroomToDelete) => {
  return chatrooms.reduce((newArray, chatroom) => {
    if (chatroomToDelete.length > 0) {
      if (chatroomToDelete[0].id !== chatroom.id) {
        newArray.push(chatroom)
      }
    } else {
      newArray.push(chatroom)
    }
    return newArray;
  }, []);
}

export const getUserChatrooms = (chatrooms, userChatrooms) => {
  return chatrooms.reduce((newArray, chatroom) => {
    if (userChatrooms.length > 0) {
      let isUserInChatroom = false;
      userChatrooms.forEach(userChatroom => {
        console.log(chatroom)
        console.log(userChatroom)
        if (chatroom.id === userChatroom.id) {
          isUserInChatroom = true;
        }
      })
      if (isUserInChatroom) {
        newArray.push(chatroom);
      }
    }
    return newArray;
  }, []);
}

export const sortCategoriesByDate = categories => {
  let sortedCategories = [];

  if (categories.length !== 0) {
    sortedCategories = categories.sort((a, b) => {
      if (b.category.createdAt !== null && a.category.createdAt !== null ) {
        return new Date(a.category.createdAt.toDate()) - new Date(b.category.createdAt.toDate());
      }
    })
  } else {
    sortedCategories = [...categories];
  }

  return sortedCategories;
}

export const sortChannelsByDate = channels => {
  let sortedChannels = [];

  if (channels.length !== 0) {
    sortedChannels = channels.sort((a, b) => {
      if (b.channel.createdAt !== null && a.channel.createdAt !== null ) {
        return new Date(a.channel.createdAt.toDate()) - new Date(b.channel.createdAt.toDate());
      }
    })
  } else {
    sortedChannels = [...channels];
  }

  return sortedChannels;
}

export const removeDuplicateChannels = channels => {
  return channels.reduce((newArray, channel) => {
    if (newArray.length > 0) {
      let isInArray = false;
      newArray.forEach(arrayChannel => {
        if (channel.id === arrayChannel.id) {
          isInArray = true;
        }
      });
      if (!isInArray) {
        newArray.push(channel);
      }
    } else {
      newArray.push(channel);
    }
    return newArray;
  }, [])
}

export const removeDuplicateInvites = chatroomInvites => {
  return chatroomInvites.reducer((newArray, chatroomInvite) => {
    if (newArray.length > 0) {
      let isInArray = false;
      newArray.foreach(arrayInvite => {
        if (chatroomInvite.id === arrayInvite.id) {
          isInArray = true;
        }
      });
      if (!isInArray) {
        newArray.push(chatroomInvite);
      }
    } else {
      newArray.push(chatroomInvite);
    }
    return newArray;
  }, []);
}

export const removeDeletedInvites = (chatroomInvites, inviteToDelete) => {
  return chatroomInvites.reduce((newArray, chatroomInvite) => {
    if (inviteToDelete.length > 0) {
      if (inviteToDelete[0].id !== chatroomInvite.id) {
        newArray.push(chatroomInvite);
      }
    } else {
      newArray.push(chatroomInvite);
    }
    return newArray;
  }, []);
}

export const removeDuplicateFriends = friends => {
  return friends.reduce((newArray, friend) => {
    if (newArray.length > 0) {
      let isInArray = false;
      newArray.forEach(arrayFriend => {
        if (friend.id === arrayFriend.id) {
          isInArray = true;
        }
      });
      if (!isInArray) {
        newArray.push(friend);
      }
    } else {
      newArray.push(friend);
    }
    return newArray;
  }, []);
}

export const removeDeletedFriends = (friends, friendToDelete) => {
  return friends.reduce((newArray, friend) => {
    if (friendToDelete.length > 0) {
      if (friendToDelete[0].id !== friend.id) {
        newArray.push(friend)
      }
    } else {
      newArray.push(friend)
    }
    return newArray;
  }, []);
}

export const replaceUpdateFriends = (friends, friendsToUpdate) => {
  return friends.reduce((newArray, friend) => {
    if (friendsToUpdate.length > 0) {
      if (friendsToUpdate[0].id !== friend.id) {
        newArray.push(friend)
      } else {
        newArray.push(friendsToUpdate[0])
      }
    } else {
      newArray.push(friend)
    }
    return newArray;
  }, []);
}