import React from 'react';
import Message from './Message';
import {Comment} from 'semantic-ui-react';

class Messages extends React.Component {
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({behavior: 'smooth'});
  }

  displayMessages = (messages, user, friendsList) => {
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

  render() {
    const {messages, user, friendsList} = this.props;
    return (
      <Comment.Group className='chat_comment_container'>
        {this.displayMessages(messages, user, friendsList)}
        <div ref={node => this.messagesEnd = node}></div>
      </Comment.Group>
    )
  }
}

export default Messages;