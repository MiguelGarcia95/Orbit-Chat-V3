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
    return (
      <h1>ChatCommentPanel</h1>
    )
  }
}

export default connect()(ChatCommentPanel);