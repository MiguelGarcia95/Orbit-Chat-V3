import React from 'react';
// import firebase from '../../firebase';
import {Grid, Sidebar, Menu} from 'semantic-ui-react';
import {connect} from 'react-redux';
import ChatMenu from './ChatMenu';
import Spinner from '../Layout/Spinner';

class Chatroom extends React.Component {
  state = {
  }

  componentDidMount() {
  }

  render() {
    const {user} = this.props;
    return !user ? <Spinner /> : (
      <Grid columns='equal' className='app'>
        <Sidebar 
          width='very thin'
          icon='labeled'
          as={Menu}
          inverted
          vertical
          visible
        />

        {/* <ChatMenu /> */}

        <Grid.Column style={{marginLeft: 320, padding: '0px'}} >
          <React.Fragment>
            {/* <ChatCommentPanel  channels={channels} user={user} chatroom={chatroom} getChannelComments={this.props.getChannelComments} /> */}
          </React.Fragment>
        </Grid.Column>
        <Grid.Column width={2}>
          <React.Fragment></React.Fragment>
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
