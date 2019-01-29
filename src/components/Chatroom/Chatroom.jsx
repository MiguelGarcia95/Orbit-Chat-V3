import React from 'react';
import firebase from '../../firebase';
import {Grid} from 'semantic-ui-react';
// import {Grid, Sidebar, Menu} from 'semantic-ui-react';
import {connect} from 'react-redux';
import Spinner from '../Layout/Spinner';

class Chatroom extends React.Component {
  state = {
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.props.history.push('/signin');
      }
    })
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

export default connect(mapStateToProps)(Chatroom);
