import React from 'react';
import {connect} from 'react-redux';
import {getFirestore} from 'redux-firestore';

import {getReference, setFriends} from '../../actions/homeActions';
import FriendList from './FriendList';
import FriendListHeader from './FriendListHeader';
import FriendChatHeader from './FriendChatHeader';
import Messages from './Messages';
import MessageForm from './MessageForm';

class HomeContentPanel extends React.Component {
  state = {
  }
  
  componentWillMount() {
    if (this.props.currentView === 'friends') {
      this.getFriendsRT(this.props.user);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.currentView !== nextProps.currentView && nextProps.currentView !== 'friends') {
      this.props.getReference(nextProps.user.uid, nextProps.currentView)
    } else if (this.props.currentView !== nextProps.currentView && nextProps.currentView === 'friends') {
      this.getFriendsRT(nextProps.user);
    }
  }

  displayHomeContent = view => {
    if (view === 'friends') {
      const {friendsList} = this.props;
      return (
        <React.Fragment>
          <FriendListHeader />
          {friendsList && <FriendList />}
        </React.Fragment>
      )
    } else {
      const {otherUser, user, directMessages} = this.props;
      return (
        <React.Fragment>
          {otherUser && <FriendChatHeader friend={otherUser} user={user} messages={directMessages} />}
          {otherUser && <MessageForm otherUser={otherUser} user={user} />}
          {directMessages && <Messages messages={directMessages} user={user} otherUser={otherUser} />}
        </React.Fragment>
      )
    }
  }

  getFriendsRT = (user) => {
    const firestore = getFirestore();
    firestore.collection(`users/${user.uid}/friends`).onSnapshot(snapshot => {
      let changes = snapshot.docChanges();
      this.props.setFriends(changes)
    })
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
    directMessages: state.home.directMessages,
    friendsList: state.home.friendsList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getReference: (userId, referenceId) => dispatch(getReference(userId, referenceId)),
    setFriends: docFriends => dispatch(setFriends(docFriends))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContentPanel);