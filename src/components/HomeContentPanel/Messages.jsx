import React from 'react';
import Message from './Message';
import {Comment} from 'semantic-ui-react';

const scrollToBottom = () => {
  let commentBox = document.getElementById('chat_box');
  // commentBox.scrollTop = commentBox.scrollHeight;
  console.log(commentBox.clientHeight);
}

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
  scrollToBottom()
  return (
    <Comment.Group className='chat_comment_container' id='chat_box'>
      {displayMessages(messages, user, otherUser, friends)}
    </Comment.Group>
  )
}

export default Messages;