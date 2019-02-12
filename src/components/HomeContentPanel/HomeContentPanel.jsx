import React from 'react';
import {connect} from 'react-redux';

import Messages from './Messages';
import MessageForm from './MessageForm';

class HomeContentPanel extends React.Component {
  state = {
  }

  render() {
    // const {channel, user, comments} = this.props;
    return (
      <section className='chat_comment_panel'>
      </section>
    )
  }
}

export default connect()(HomeContentPanel);