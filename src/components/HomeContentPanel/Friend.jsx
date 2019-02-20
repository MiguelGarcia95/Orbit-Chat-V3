import React from 'react';
import {Comment} from 'semantic-ui-react';

const Friend = ({friends}) => {
  return (
    <Comment className="chat_comment">
      {/* <Comment.Avatar src={message.avatar}  /> */}
      <Comment.Content className={`comment_body`} >
        <Comment.Author as='a'>Username</Comment.Author>
        <Comment.Text>Content</Comment.Text>
      </Comment.Content>
    </Comment>
  )
}

export default Friend;
