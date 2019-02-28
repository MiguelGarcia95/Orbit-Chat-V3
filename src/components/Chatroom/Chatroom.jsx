import React from 'react';
import firebase from '../../firebase';
import {Grid} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {getFirestore} from 'redux-firestore';

import {getChatroom, clearChatroom, setChatroomUsers, joinChatroom, setSentChatroomInvitations, triggerChatroomRedirect} from '../../actions/chatroomActions';
import {setFriends} from '../../actions/homeActions';
import {unsetChannel, setChannel, setComments} from '../../actions/channelActions';
import Spinner from '../Layout/Spinner';
import ChatCommentPanel from '../ChatCommentPanel/ChatCommentPanel';

class Chatroom extends React.Component {
  state = {
    redirect: false,
    firstLoad: true
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.props.history.push('/signin');
      } else {
        this.props.unsetChannel();
        this.props.clearChatroom();
        this.props.getChatroom(this.props.match.params.roomId);
        this.getChatroomUsersRT(this.props.match.params.roomId);
        this.getChatroomInvitationsRT(this.props.match.params.roomId)
        this.getFriendsRT(user);
      }
    })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!nextProps.isDeleting) {
      if (!this.state.firstLoad && nextProps.chatroomRedirect) {
        this.props.history.push('/app');
      } else if (this.state.firstLoad) {
        this.getChatroomUsersRT(nextProps.match.params.roomId);      
      }else if (!this.state.firstLoad && this.props.match.params.roomId !== nextProps.match.params.roomId) {
        this.props.unsetChannel();
        this.props.clearChatroom();
        this.props.getChatroom(nextProps.match.params.roomId);
        this.getChatroomUsersRT(nextProps.match.params.roomId);      
      }
  
      if (nextProps.chatroomUsers.length === 0 && nextProps.currentChatroom && !this.state.firstLoad) {
        if (nextProps.currentChatroom.chatroom.uid === nextProps.user.uid) {
          this.props.joinChatroom(nextProps.user, nextProps.currentChatroom);
        }
        this.getChatroomUsersRT(nextProps.currentChatroom.id);
      } else if (nextProps.chatroomUsers.length > 0 && !this.isUserAMember(nextProps.user, nextProps.chatroomUsers)) {
        this.props.triggerChatroomRedirect();
      }
  
      if (this.props.channels.length > nextProps.channels.length && !this.state.firstLoad) {
        this.props.setChannel(this.getMatchingChannels(nextProps.categories[0], nextProps.channels));
      }
  
      this.setCurrentChannel(nextProps.currentChannel, nextProps.channels, nextProps.categories);
      this.setState({firstLoad: false}); 
    } else {
      this.props.unsetChannel();
      this.props.clearChatroom();
      this.props.history.push('/app');
    }
  }

  getChannelCommentsRT = (chatroomId, channelId) => {
    const firestore = getFirestore();
    firestore.collection(`comments/${channelId}/comments`).onSnapshot(snapshot => {
      let changes = snapshot.docChanges();
      this.props.setComments(changes);
    })
  }

  getChatroomUsersRT = chatroomId => {
    const firestore = getFirestore();
    firestore.collection(`chatrooms/${chatroomId}/users`).onSnapshot(snapshot => {
      let changes = snapshot.docChanges();
      this.props.setChatroomUsers(changes);
    });
  }

  getChatroomInvitationsRT = chatroomId => {
    const firestore = getFirestore();
    firestore.collection(`chatrooms/${chatroomId}/invites`).onSnapshot(snapshot => {
      let changes = snapshot.docChanges();
      this.props.setSentChatroomInvitations(changes);
    });
  }
  
  getMatchingChannels = (category, channels) => {
    return channels.reduce((filteredChannels, channel) => {
      if (channel.channel.categoryId === category.id && Object.keys(filteredChannels).length === 0) {
        filteredChannels = channel
      }
      return filteredChannels
    }, {}) 
  }

  getFriendsRT = (user) => {
    const firestore = getFirestore();
    firestore.collection(`users/${user.uid}/friends`).onSnapshot(snapshot => {
      let changes = snapshot.docChanges();
      this.props.setFriends(changes)
    })
  }

  isUserAMember = (user, chatroomUsers) => {
    let hasUserJoined = false;
    chatroomUsers.forEach(chatroomUser => {
      if (user.uid === chatroomUser.user.uid) {
        hasUserJoined = true;
      }
    });
    return hasUserJoined;
  }

  setCurrentChannel = (currentChannel, channels, categories) => {
    if (!currentChannel && channels.length > 0 && categories.length > 0) {
      this.props.setChannel(this.getMatchingChannels(categories[0], channels));
    } else if (currentChannel && channels.length > 0 && ('channel' in currentChannel) ) {
      this.getChannelCommentsRT(currentChannel.channel.chatroomId, currentChannel.id);
    }
  }

  displayCommentPanel = (currentChannel, channels, user) => {
    if ('channel' in currentChannel && channels.length > 0) {
      return <ChatCommentPanel  channel={currentChannel} user={user} />
    }
  }

  render() {
    const {user, currentChatroom, currentChannel, channels} = this.props;
    return !user || !currentChatroom ? <Spinner /> : (
      <Grid columns='equal' className='app' style={{marginTop: '0px'}}>
        <Grid.Column style={{marginLeft: 312, height: '100%'}} >
            {currentChannel && this.displayCommentPanel(currentChannel, channels, user)}
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.currentUser,
    chatroomRedirect: state.chat.chatroomRedirect,
    currentChatroom: state.chat.currentChatroom,
    currentChannel: state.channel.currentChannel,
    channels: state.channel.channels,
    categories: state.chat.categories,
    chatroomUsers: state.chat.chatroomUsers,
    chatroomDelete: state.chat.chatroomDelete,
    isDeleting: state.chat.isDeleting
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getChatroom: roomId => dispatch(getChatroom(roomId)),
    unsetChannel: () => dispatch(unsetChannel()),
    clearChatroom: () => dispatch(clearChatroom()),
    setChannel: (channel) => dispatch(setChannel(channel)),
    setComments: comments => dispatch(setComments(comments)),
    joinChatroom: (user, chatroom) => dispatch(joinChatroom(user, chatroom)),
    setFriends: docFriends => dispatch(setFriends(docFriends)),
    triggerChatroomRedirect: () => dispatch(triggerChatroomRedirect()),
    setChatroomUsers: docUsers => dispatch(setChatroomUsers(docUsers)),
    setSentChatroomInvitations: docInvitations => dispatch(setSentChatroomInvitations(docInvitations))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chatroom);
