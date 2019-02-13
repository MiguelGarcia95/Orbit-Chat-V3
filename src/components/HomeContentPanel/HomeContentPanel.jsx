import React from 'react';
import {connect} from 'react-redux';

import FriendList from './FriendList';
import FriendListHeader from './FriendListHeader';
import FriendChatHeader from './FriendListHeader';
import Messages from './Messages';
import MessageForm from './MessageForm';

class HomeContentPanel extends React.Component {
  state = {
  }

  displayHomeContent = view => {
    if (view === 'friends') {
      console.log('return friend list view')
    } else {
      console.log('return dm chat')
    }
  }

  render() {
    const {currentView} = this.props;
    return (
      <section className='home_content_panel'>
        {currentView && this.displayHomeContent(currentView)}
      </section>
    )
  }
}

export default connect()(HomeContentPanel);