import React from 'react';
import Message from './Message';
import {Comment} from 'semantic-ui-react';

const displayMessages = (messages, user) => {
  return messages.map(message => {
    return <Message key={message.id} messageId={message.id} message={message.comment} user={user} />
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