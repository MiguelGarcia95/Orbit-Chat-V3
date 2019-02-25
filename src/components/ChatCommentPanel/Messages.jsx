import React from 'react';
import Message from './Message';
import {Comment} from 'semantic-ui-react';
import { comment } from 'postcss-selector-parser';

const scrollToBottom = () => {
  let commentBox = document.getElementsByClassName('chat_comment_container');
  // commentBox.scrollTop = commentBox.scrollHeight;
  console.log(commentBox);
}

const displayMessages = (messages, user, friendsList) => {
  return messages.map(message => {
    return (
      <Message 
        user={user} 
        key={message.id} 
        messageId={message.id} 
        message={message.message}
        friendsList={friendsList}
      />
    )
  })
}

const Messages = ({messages, user, friendsList}) => {
  scrollToBottom();
  return (
    <Comment.Group className='chat_comment_container'>
      {displayMessages(messages, user, friendsList)}
    </Comment.Group>
  )
}

export default Messages;