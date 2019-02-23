import React from 'react';
import {connect} from 'react-redux';
import {getFirestore} from 'redux-firestore';

import {getReference, setFriends, setChatroomInvites} from '../../actions/homeActions';
import FriendList from './FriendList';
import ChatroomInviteList from './ChatroomInviteList';
import FriendListHeader from './FriendListHeader';
import FriendChatHeader from './FriendChatHeader';
import ChatInviteHeader from './ChatInviteHeader';
import Messages from './Messages';
import MessageForm from './MessageForm';

class HomeContentPanel extends React.Component {
  state = {
    friendsToShow: 'all'
  }
  
  componentWillMount() {
    if (this.props.currentView === 'friends') {
      this.getFriendsRT(this.props.user);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.currentView !== nextProps.currentView && nextProps.currentView !== 'friends' && nextProps.currentView !== 'chatroom-invites') {
      this.props.getReference(nextProps.user.uid, nextProps.currentView)
    } else if (this.props.currentView !== nextProps.currentView && nextProps.currentView === 'friends') {
      this.getFriendsRT(nextProps.user);
    } else if (this.props.currentView !== nextProps.currentView && nextProps.currentView === 'chatroom-invites') {
      this.getChatroomInvitesRT(nextProps.user);
    }
  }

  displayHomeContent = view => {
    const {otherUser, user, directMessages, friendsList} = this.props;
    if (view === 'friends') {
      const {friendsToShow} = this.state;
      return (
        <React.Fragment>
          <FriendListHeader />
          {friendsList && <FriendList friendsToShow={friendsToShow} friends={friendsList} user={user} />}
        </React.Fragment>
      )
    } else if (view === 'chatroom-invites') {
      return (
        <React.Fragment>
          <ChatInviteHeader />
          <ChatroomInviteList user={user} />
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          {otherUser && <FriendChatHeader friend={otherUser} user={user} messages={directMessages} friends={friendsList} />}
          {otherUser && <MessageForm otherUser={otherUser} user={user} />}
          {directMessages && <Messages messages={directMessages} user={user} otherUser={otherUser} friends={friendsList}/>}
        </React.Fragment>
      )
    }
  }

  getFriendsRT = user => {
    const firestore = getFirestore();
    firestore.collection(`users/${user.uid}/friends`).onSnapshot(snapshot => {
      let changes = snapshot.docChanges();
      this.props.setFriends(changes)
    })
  }

  getChatroomInvitesRT = user => {
    const firestore = getFirestore();
    firestore.collection(`users/${user.uid}/chatroom-invides`).onSnapshot(snapshot => {
      let changes = snapshot.docChanges();
      this.props.setChatroomInvites(changes)
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
    friendsList: state.home.friendsList,
    chatroomInvites: state.home.chatroomInvites
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getReference: (userId, referenceId) => dispatch(getReference(userId, referenceId)),
    setFriends: docFriends => dispatch(setFriends(docFriends)),
    setChatroomInvites: docChatrooms => dispatch(setChatroomInvites(docChatrooms))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContentPanel);