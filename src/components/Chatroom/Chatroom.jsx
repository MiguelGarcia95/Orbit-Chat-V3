import React from 'react';
import firebase from '../../firebase';
import {Grid} from 'semantic-ui-react';
import {getChatroom} from '../../actions/chatroomActions';
import {connect} from 'react-redux';
import Spinner from '../Layout/Spinner';

class Chatroom extends React.Component {
  state = {
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.props.history.push('/signin');
      } else {
        this.props.getChatroom(this.props.match.params.roomId)
      }
    })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.props.getChatroom(nextProps.match.params.roomId);
  }

  

  render() {
    const {user} = this.props;
    return !user ? <Spinner /> : (
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
    user: state.auth.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getChatroom: roomId => dispatch(getChatroom(roomId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chatroom);
