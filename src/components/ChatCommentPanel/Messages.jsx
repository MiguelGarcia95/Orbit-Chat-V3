import React from 'react';
import Message from './Message';
import {Comment} from 'semantic-ui-react';

const displayMessages = (messages, user, chatroomUsers, chatroomInvites) => {
  return messages.map(message => {
    return (
      <Message 
        user={user} 
        key={message.id} 
        messageId={message.id} 
        message={message.message} 
        chatroomUsers={chatroomUsers} 
        chatroomInvites={chatroomInvites}
      />
    )
  })
}

const Messages = ({messages, user, chatroomUsers, chatroomInvites}) => {
  return (
    <Comment.Group className='chat_comment_container'>
      {displayMessages(messages, user, chatroomUsers, chatroomInvites)}
    </Comment.Group>
  )
}

export default Messages;