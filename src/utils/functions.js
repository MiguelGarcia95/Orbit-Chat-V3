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
    if (action.payload.commentToDelete.length > 0) {
      if (action.payload.commentToDelete[0].id !== comment.id) {
        newArray.push(comment)
      }
    } else {
      newArray.push(comment)
    }
    return newArray;
  }, []);
}

