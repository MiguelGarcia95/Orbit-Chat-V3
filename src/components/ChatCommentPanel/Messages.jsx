import React from 'react';
import Message from './Message';
import {Comment} from 'semantic-ui-react';

class Messages extends React.Component {
  state = {
  }

  displayMessages = (messages, user) => {
    return messages.map(message => {
      return <Message key={message.id} message={message.comment} user={user} />
    })
  }

  render() {
    const {messages, user} = this.props;
    return (
      <Comment.Group>
        {this.displayMessages(messages, user)}
      </Comment.Group>
    )
  }
}

export default Messages;