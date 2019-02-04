import React from 'react';
import {connect} from 'react-redux';

import ChatCommentHeader from './ChatCommentHeader';
import Messages from './Messages';
import MessageForm from './MessageForm';

class ChatCommentPanel extends React.Component {
  state = {
  }

  render() {
    const {channel, user, comments} = this.props;
    return (
      <React.Fragment>
        <ChatCommentHeader channel={channel} />
        {comments && <Messages messages={comments} />}
        <MessageForm channel={channel} user={user} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    comments: state.channel.comments
  }
}

export default connect(mapStateToProps)(ChatCommentPanel);