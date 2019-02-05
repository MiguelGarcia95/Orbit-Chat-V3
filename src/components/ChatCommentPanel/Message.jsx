import React from 'react';
import {Comment} from 'semantic-ui-react';
import moment from 'moment';

const timeFromNow = timestamp => moment(timestamp).fromNow();

const isOwnMessage = (message, user) => {
  return message.uid === user.uid ? 'message_self' : ''
}

const Message = ({message, user}) => {
  return (
    <Comment className="chat_comment">
      <Comment.Avatar src={message.avatar}  />
      <Comment.Content className={isOwnMessage(message, user)} >
        <Comment.Author as='a'>{message.username}</Comment.Author>
        {/* <Comment.Metadata >{timeFromNow(message.createdAt.toDate())}</Comment.Metadata> */}
        <Comment.Text>{message.comment}</Comment.Text>
      </Comment.Content>
    </Comment>
  )
}

export default Message;