import React from 'react';
import {connect} from 'react-redux';

import ChatCommentHeader from './ChatCommentHeader';
import Messages from './Messages';
import Message from './Message';
import MessageForm from './MessageForm';

class ChatCommentPanel extends React.Component {
  state = {

  }

  render() {
    const {channel, user, chatroom} = this.props;
    return (
      <React.Fragment>
        <ChatCommentHeader channel={channel} />
        {/* <h1>ChatCommentPanel</h1> */}
        <MessageForm />
      </React.Fragment>
    )
  }
}

export default connect()(ChatCommentPanel);