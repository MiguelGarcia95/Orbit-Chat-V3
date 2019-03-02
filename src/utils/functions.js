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
  }, [])
}

export const sortByDate = (items, type) => {
  // let sortedComments = [];
  // if (items.length !== 0) {
  //   sortedComments = items.sort((a, b) => {
  //     if (b[type].createdAt !== null && a[type].createdAt !== null) {
  //       return new Date(a[type].createdAt.toDate()) - new Date(b[type].createdAt.toDate());
  //     }
  //   });
  // } else {
  //   sortedComments = [...items];
  // }
  // return sortedComments;
  return items.sort((a, b) => {
    if (b[type].createdAt !== null && a[type].createdAt !== null) {
      return new Date(a[type].createdAt.toDate()) - new Date(b[type].createdAt.toDate());
    }
  });
}

export const removeDeleted = (items, itemToDelete) => {
  return items.reduce((newArray, item) => {
    if (itemToDelete.length > 0) {
      if (itemToDelete[0].id !== item.id) {
        newArray.push(item);
      }
    } else {
      newArray.push(item);
    }
    return newArray;
  }, [])
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

export const updateFriends = (friends, friendsToUpdate) => {
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