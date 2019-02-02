import React from 'react';
import firebase from '../../firebase';
import {Grid} from 'semantic-ui-react';
import {getChatroom} from '../../actions/chatroomActions';
import {unsetChannel} from '../../actions/channelActions';
import {connect} from 'react-redux';
import Spinner from '../Layout/Spinner';

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
    this.setState({firstLoad: false});
  }  

  render() {
    const {user, currentChatroom, currentChannel, channels} = this.props;
    if (!currentChannel && channels.length > 0) {
      console.log('currentChannel no set up and channels + 1')
      // console.log(channels)
      // channels.forEach(channel => {
      //   console.log(channel.channel.createdAt.toDate())
      // })
      let sortedChannels = channels.sort(function(a, b) {
        return new Date(a.channel.createdAt.toDate()) - new Date(b.channel.createdAt.toDate());
      });
      console.log(sortedChannels)
    }
    return !user || !currentChatroom ? <Spinner /> : (
      <Grid columns='equal' className='app'>
        <Grid.Column style={{marginLeft: 320}} >
          <React.Fragment>
            {/* <ChatCommentPanel  channels={channels} user={user} chatroom={chatroom} getChannelComments={this.props.getChannelComments} /> */}
          </React.Fragment>
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
    channels: state.channel.channels
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getChatroom: roomId => dispatch(getChatroom(roomId)),
    unsetChannel: () => dispatch(unsetChannel())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chatroom);
