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