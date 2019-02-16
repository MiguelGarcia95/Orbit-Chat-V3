import React from 'react';
import firebase from '../../firebase';
import {Grid} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {getFirestore} from 'redux-firestore';

import {getChatroom} from '../../actions/chatroomActions';
import {unsetChannel, setChannel, getChannelComments, setComments} from '../../actions/channelActions';
import Spinner from '../Layout/Spinner';
import ChatCommentPanel from '../ChatCommentPanel/ChatCommentPanel';

class Chatroom extends React.Component {
  state = {
    redirect: false,
    firstLoad: true,
    fetchedChatroom: false
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.props.history.push('/signin');
      } else {
        this.props.unsetChannel();
        this.props.getChatroom(this.props.match.params.roomId)
      }
    })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!this.state.firstLoad && nextProps.chatroomRedirect) {
      this.props.history.push('/app');
    } else if (!this.state.firstLoad && !this.state.fetchedChatroom) {
      this.props.unsetChannel();
      this.props.getChatroom(nextProps.match.params.roomId);
      this.setState({fetchedChatroom: true});
    } else if (this.props.match.params.roomId !== nextProps.match.params.roomId) {
      this.props.unsetChannel();
      this.props.getChatroom(nextProps.match.params.roomId);
    }

    if (this.props.currentChannel !== nextProps.currentChannel) {
      this.setCurrentChannel(nextProps.currentChannel, nextProps.channels, nextProps.categories, false);
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

  setCurrentChannel = (currentChannel, channels, categories, isNewChannel) => {
    if (!currentChannel && channels.length > 0 && categories.length > 0) {
      this.props.setChannel(this.getMatchingChannels(categories[0], channels));
    } else if (currentChannel && isNewChannel) {
      this.getChannelComemntrsRT(currentChannel.channel.chatroomId, currentChannel.id);
    } else if (currentChannel && !isNewChannel) {
      this.props.getChannelComments(currentChannel.channel.chatroomId, currentChannel.id)
    }
  }

  //real-time listener
  getChannelComemntrsRT = (chatroomId, channelId) => {
    const firestore = getFirestore();
    firestore.collection(`comments/${channelId}/comments`).onSnapshot(snapshot => {
      let changes = snapshot.docChanges();
      this.props.setComments(changes)
    })
  }

  render() {
    const {user, currentChatroom, currentChannel} = this.props;
    return !user || !currentChatroom ? <Spinner /> : (
      <Grid columns='equal' className='app' style={{marginTop: '0px'}}>
        <Grid.Column style={{marginLeft: 320, height: '100%'}} >
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
    categories: state.chat.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getChatroom: roomId => dispatch(getChatroom(roomId)),
    unsetChannel: () => dispatch(unsetChannel()),
    setChannel: (channel) => dispatch(setChannel(channel)),
    getChannelComments: (chatroomId, channelId) => dispatch(getChannelComments(chatroomId, channelId)),
    setComments: comments => dispatch(setComments(comments))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chatroom);
