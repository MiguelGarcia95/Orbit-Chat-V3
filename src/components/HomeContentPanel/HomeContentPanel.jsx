import React from 'react';
import {connect} from 'react-redux';

// import FriendList from './FriendList';
// import FriendListHeader from './FriendListHeader';
import FriendChatHeader from './FriendListHeader';
import Messages from './Messages';
import MessageForm from './MessageForm';

class HomeContentPanel extends React.Component {
  state = {
  }

  render() {
    return (
      <section className='chat_comment_panel'>
      </section>
    )
  }
}

export default connect()(HomeContentPanel);