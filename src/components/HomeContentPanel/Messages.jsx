import React from 'react';
import Message from './Message';
import {Comment} from 'semantic-ui-react';

class Messages extends React.Component {

  scrollToBottom = () => {
    let commentBox = document.getElementById('chat_box');
    // commentBox.scrollTop = commentBox.scrollHeight;
    console.log(commentBox.clientHeight);
  }

  displayMessages = (messages, user, otherUser, friends) => {
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

  render() {
    const {messages, user, otherUser, friends} = this.props;
    this.scrollToBottom()
    return (
      <Comment.Group className='chat_comment_container' id='chat_box'>
        {this.displayMessages(messages, user, otherUser, friends)}
      </Comment.Group>
    )
  }
}

export default Messages;