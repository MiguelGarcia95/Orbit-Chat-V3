import React from 'react';
import {connect} from 'react-redux';

import ChatCommentHeader from './ChatCommentHeader';
import Messages from './Messages';
import MessageForm from './MessageForm';

const ChatCommentPanel = (props) => {
    const {channel, user, comments, friendsList} = props;
    return (
      <section className='chat_comment_panel'>
        <ChatCommentHeader channel={channel} />
        {comments && <Messages messages={comments} user={user} friendsList={friendsList} />}
        <MessageForm channel={channel} user={user}  />
      </section>
    )
}

const mapStateToProps = state => {
  return {
    comments: state.channel.comments,
    friendsList: state.home.friendsList
  }
}

export default connect(mapStateToProps)(ChatCommentPanel);