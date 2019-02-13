import React from 'react';
import {connect} from 'react-redux';

import {getReference} from '../../actions/homeActions';
import FriendList from './FriendList';
import FriendListHeader from './FriendListHeader';
import FriendChatHeader from './FriendListHeader';
import Messages from './Messages';
import MessageForm from './MessageForm';

class HomeContentPanel extends React.Component {
  state = {
  }

  componentDidMount() {
    if (this.props.currentView !== 'friends') {
      // this.props.getReference(this.props.user.uid, this.props.currentView)
    }
  }



  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.currentView !== nextProps.currentView && nextProps.currentView !== 'friends') {
      this.props.getReference(nextProps.user.uid, nextProps.currentView)
    } else if (this.props.currentView !== nextProps.currentView && nextProps.currentView === 'friends') {
      // get friends and friend invites
    }
  }

  displayHomeContent = view => {
    if (view === 'friends') {
    } else {
      const {otherUser, user, directMessages} = this.props;
      return (
        <React.Fragment>
          {otherUser && <FriendChatHeader friend={otherUser} />}
          {otherUser && <MessageForm friend={otherUser} user={user} />}
          {directMessages && <Messages messages={directMessages} />}
        </React.Fragment>
      )
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

const mapStateToProps = state => {
  return {
    directMessages: state.home.directMessages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getReference: (userId, referenceId) => dispatch(getReference(userId, referenceId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContentPanel);