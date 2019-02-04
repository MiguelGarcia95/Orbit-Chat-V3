import React from 'react';
import Message from './Message';

class Messages extends React.Component {
  state = {

  }

  displayMessages = (messages) => {
    return messages.map(message => {
      return <Message key={message.id} message={message} />
    })
  }

  render() {
    const {messages} = this.props;
    return (
      <React.Fragment>
        {this.displayMessages(messages)}
      </React.Fragment>
    )
  }
}

export default Messages;