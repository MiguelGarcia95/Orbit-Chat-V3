import React from 'react';
import {Comment} from 'semantic-ui-react';

const Friend = ({friend}) => {
  console.log(friend)
  return (
    <Comment className="chat_comment">
      <Comment.Avatar src={friend.avatar}  />
      <Comment.Content className={`comment_body`} >
        <Comment.Author as='a'>{friend.username}</Comment.Author>
        <Comment.Text>Content</Comment.Text>
      </Comment.Content>
    </Comment>
  )
}

export default Friend;
