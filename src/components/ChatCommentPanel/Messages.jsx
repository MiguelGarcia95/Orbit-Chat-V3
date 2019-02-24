import React from 'react';
import Message from './Message';
import {Comment} from 'semantic-ui-react';

const displayMessages = (messages, user) => {
  return messages.map(message => {
    return (
      <Message 
        user={user} 
        key={message.id} 
        messageId={message.id} 
        message={message.message} 
      />
    )
  })
}

const Messages = ({messages, user}) => {
  return (
    <Comment.Group className='chat_comment_container'>
      {displayMessages(messages, user)}
    </Comment.Group>
  )
}

export default Messages;