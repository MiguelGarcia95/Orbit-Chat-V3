import React from 'react';
import Message from './Message';
import {Comment} from 'semantic-ui-react';

const displayMessages = (messages, user, otherUser) => {
  return messages.map(message => {
    return <Message key={message.id} messageId={message.id} message={message.message} user={user} otherUser={otherUser} />
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