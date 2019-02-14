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

// let filteredComments = newComments.reduce((newArray, comment) => {
//   if (newArray.length > 0) {
//     let isInArray = false;
//     newArray.forEach(arrayComment => {
//       if (comment.id === arrayComment.id) {
//         isInArray = true;
//       }
//     });
//     if (!isInArray) {
//       newArray.push(comment)
//     }
//   } else {
//     newArray.push(comment)
//   }
//   return newArray
// }, []);