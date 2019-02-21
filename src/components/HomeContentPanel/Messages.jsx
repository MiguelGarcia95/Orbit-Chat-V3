import React from 'react';
import Message from './Message';
import {Comment} from 'semantic-ui-react';

const displayMessages = (messages, user, otherUser, friends) => {
  return messages.map(message => {
    return (
      <Message 
        user={user} 
        key={message.id} 
        otherUser={otherUser} 
        messageId={message.id} 
        message={message.message} 
        friends={friends}
      />
    )
  })
}

const Messages = ({messages, user, otherUser, friends}) => {
  return (
    <Comment.Group className='chat_comment_container'>
      {displayMessages(messages, user, otherUser, friends)}
    </Comment.Group>
  )
}

export default Messages;