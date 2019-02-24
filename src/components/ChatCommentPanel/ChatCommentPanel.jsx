import React from 'react';
import {connect} from 'react-redux';

import ChatCommentHeader from './ChatCommentHeader';
import Messages from './Messages';
import MessageForm from './MessageForm';

const ChatCommentPanel = (props) => {
    const {channel, user, comments, chatroomUsers, chatroomInvites} = props;
    return (
      <section className='chat_comment_panel'>
        <ChatCommentHeader channel={channel} />
        {comments && <Messages messages={comments} user={user} chatroomUsers={chatroomUsers} chatroomInvites={chatroomInvites}  />}
        <MessageForm channel={channel} user={user}  />
      </section>
    )
}

const mapStateToProps = state => {
  return {
    comments: state.channel.comments,
    chatroomUsers: state.chat.chatroomUsers,
    chatroomInvites: state.chat.chatroomInvites
  }
}

export default connect(mapStateToProps)(ChatCommentPanel);