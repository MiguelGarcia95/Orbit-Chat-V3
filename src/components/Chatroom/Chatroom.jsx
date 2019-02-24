import React from 'react';
import firebase from '../../firebase';
import {Grid} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {getFirestore} from 'redux-firestore';

import {getChatroom, clearChatroom, getChatroomUsers, joinChatroom, getChatroomInvivations} from '../../actions/chatroomActions';
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
        this.props.getChatroomUsers(this.props.match.params.roomId);
        this.props.getChatroomInvivations(this.props.match.params.roomId);
        this.getFriendsRT(user);
      }
    })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!this.state.firstLoad && nextProps.chatroomRedirect) {
      this.props.history.push('/app');
    } else if (!this.state.firstLoad && this.props.match.params.roomId !== nextProps.match.params.roomId) {
      this.props.unsetChannel();
      this.props.clearChatroom();
      this.props.getChatroom(nextProps.match.params.roomId);
      this.props.getChatroomUsers(this.props.match.params.roomId);
    }

    if (nextProps.chatroomUsers.length === 0 && nextProps.currentChatroom && !this.state.firstLoad) {
      if (nextProps.currentChatroom.chatroom.uid === nextProps.user.uid) {
        this.props.joinChatroom(nextProps.user, nextProps.currentChatroom);
      }
      this.props.getChatroomUsers(nextProps.currentChatroom.id);
    } else if (nextProps.chatroomUsers.length > 0) {
      // console.log(this.isUserAMember(nextProps.user, nextProps.chatroomUsers))
    }

    this.setCurrentChannel(nextProps.currentChannel, nextProps.channels, nextProps.categories, true);
    this.setState({firstLoad: false});
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

  // isUserAMember = (user, chatroomUsers) => {
  //   let hasUserJoined = false;
  //   chatroomUsers.forEach(chatroomUser => {
  //     if (user.uid === chatroomUser.user.uid) {
  //       hasUserJoined = true;
  //     }
  //   });
  //   return hasUserJoined;
  // }

  setCurrentChannel = (currentChannel, channels, categories, isNewChannel) => {
    if (!currentChannel && channels.length > 0 && categories.length > 0) {
      this.props.setChannel(this.getMatchingChannels(categories[0], channels));
    } else if (currentChannel && isNewChannel) {
      this.getChannelComemntrsRT(currentChannel.channel.chatroomId, currentChannel.id);
    }
  }

  getChannelComemntrsRT = (chatroomId, channelId) => {
    const firestore = getFirestore();
    firestore.collection(`comments/${channelId}/comments`).onSnapshot(snapshot => {
      let changes = snapshot.docChanges();
      this.props.setComments(changes);
    })
  }

  render() {
    const {user, currentChatroom, currentChannel} = this.props;
    return !user || !currentChatroom ? <Spinner /> : (
      <Grid columns='equal' className='app' style={{marginTop: '0px'}}>
        {/* <Grid.Column style={{marginLeft: 320, height: '100%'}} > */}
        <Grid.Column style={{marginLeft: 312, height: '100%'}} >
            {currentChannel && <ChatCommentPanel  channel={currentChannel} user={user} getChannelComemntrsRT={this.getChannelComemntrsRT} />}
        </Grid.Column>
        <Grid.Column width={2}>
          <React.Fragment> </React.Fragment>
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
    // friendsList: state.home.friendsList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getChatroom: roomId => dispatch(getChatroom(roomId)),
    unsetChannel: () => dispatch(unsetChannel()),
    clearChatroom: () => dispatch(clearChatroom()),
    setChannel: (channel) => dispatch(setChannel(channel)),
    setComments: comments => dispatch(setComments(comments)),
    getChatroomUsers: chatroomId => dispatch(getChatroomUsers(chatroomId)),
    joinChatroom: (user, chatroom) => dispatch(joinChatroom(user, chatroom)),
    setFriends: docFriends => dispatch(setFriends(docFriends)),
    getChatroomInvivations: chatroomId => dispatch(getChatroomInvivations(chatroomId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chatroom);
