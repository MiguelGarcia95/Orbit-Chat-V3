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
  return chatroomInvites.reduce((newArray, chatroomInvite) => {
    if (newArray.length > 0) {
      let isInArray = false;
      newArray.forEach(arrayInvite => {
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

export const removeDuplicateCategories = categories => {
  return categories.reduce((newArray, category) => {
    if (newArray.length > 0) {
      let isInArray = false;
      newArray.forEach(arrayCategory => {
        if (category.id === arrayCategory.id) {
          isInArray = true;
        }
      });
      if (!isInArray) {
        newArray.push(category);
      }
    } else {
      newArray.push(category);
    }
    return newArray;
  }, []);
}

export const removeDuplicates = items => {
  return items.reduce((newArray, item) => {
    if (newArray.length > 0) {
      let isInArray = false;
      newArray.forEach(arrayItem => {
        if (item.id === arrayItem.id) {
          isInArray = true;
        }
      });
      if (!isInArray) {
        newArray.push(item);
      }
    } else {
      newArray.push(item);
    }
    return newArray;
  })
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

export const removeDeletedChannels = (channels, channelToDelete) => {
  return channels.reduce((newArray, channel) => {
    if (channelToDelete.length > 0) {
      if (channelToDelete[0].id !== channel.id) {
        newArray.push(channel);
      }
    } else {
      newArray.push(channel);
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

export const removeDeletedCategories = (categories, categoryToDelete) => {
  return categories.reduce((newArray, category) => {
    if (categoryToDelete.length > 0) {
      if (categoryToDelete[0].id !== category.id) {
        newArray.push(category)
      }
    } else {
      newArray.push(category)
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

export const removeCommentsFromOtherChannels = (comments, channelId) => {
  let channelComments = [];
  comments.forEach(comment => {
    if (comment.message.channelId === channelId) {
      channelComments.push(comment)
    }
  })
  return channelComments;
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