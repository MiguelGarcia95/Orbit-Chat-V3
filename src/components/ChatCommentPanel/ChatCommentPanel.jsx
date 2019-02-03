import React from 'react';
import {connect} from 'react-redux';

import ChatCommentHeader from './ChatCommentHeader';
import Messages from './Messages';
import Message from './Message';
import MessageForm from './MessageForm';
import {getChannelComments} from '../../actions/channelActions';

class ChatCommentPanel extends React.Component {
  state = {
  }

  render() {
    const {channel, user, chatroom, comments} = this.props;
    console.log(comments)
    return (
      <React.Fragment>
        <ChatCommentHeader channel={channel} />
        {/* <h1>ChatCommentPanel</h1> */}
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