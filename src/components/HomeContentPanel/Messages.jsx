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
    return (
      <Comment.Group className='chat_comment_container' id='chat_box'>
        {this.displayMessages(messages, user, otherUser, friends)}
        <div ref={node => this.messagesEnd = node}></div>
      </Comment.Group>
    )
  }
}

export default Messages;