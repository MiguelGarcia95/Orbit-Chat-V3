import React from 'react';
import firebase from '../../firebase';
import {Grid} from 'semantic-ui-react';
import {getChatroom} from '../../actions/chatroomActions';
import {unsetChannel, setChannel, getChannelComments} from '../../actions/channelActions';
import {connect} from 'react-redux';
import Spinner from '../Layout/Spinner';
import ChatCommentPanel from '../ChatCommentPanel/ChatCommentPanel';
import {getFirestore} from 'redux-firestore';

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
    }
    this.setCurrentChannel(nextProps.currentChannel, nextProps.channels, nextProps.categories);
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

  setCurrentChannel = (currentChannel, channels, categories) => {
    if (!currentChannel && channels.length > 0 && categories.length > 0) {
      this.props.setChannel(this.getMatchingChannels(categories[0], channels));
    } else if (currentChannel) {
      this.props.getChannelComments(currentChannel.channel.chatroomId, currentChannel.id);
      this.getChannelComemntrsRT(currentChannel.channel.chatroomId, currentChannel.id);
    }
  }

  //real-time listener
  getChannelComemntrsRT = (chatroomId, channelId) => {
    const firestore = getFirestore();
    firestore.collection(`comments/${chatroomId}-${channelId}/comments`).onSnapshot(snapshot => {
      let changes = snapshot.docChanges();
      console.log(changes)
    })
  }

  render() {
    const {user, currentChatroom, currentChannel} = this.props;
    return !user || !currentChatroom ? <Spinner /> : (
      <Grid columns='equal' className='app'>
        <Grid.Column style={{marginLeft: 320, height: '100%'}} >
            {currentChannel && <ChatCommentPanel  channel={currentChannel} user={user} />}
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
    getChannelComments: (chatroomId, channelId) => dispatch(getChannelComments(chatroomId, channelId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chatroom);
