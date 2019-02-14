import React from 'react';
import Message from './Message';
import {Comment} from 'semantic-ui-react';

const displayMessages = (messages, user, otherUser) => {
  return messages.map(message => {
    return (
      <Message 
        user={user} 
        key={message.id} 
        otherUser={otherUser} 
        messageId={message.id} 
        message={message.message} 
      />
    )
  })
}

const Messages = ({messages, user, otherUser}) => {
  return (
    <Comment.Group className='chat_comment_container'>
      {displayMessages(messages, user, otherUser)}
    </Comment.Group>
  )
}

export default Messages;