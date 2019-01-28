import React from 'react';
// import firebase from '../../firebase';
import {Grid, Sidebar, Menu} from 'semantic-ui-react';
import {connect} from 'react-redux';
import ChatMenu from './ChatMenu';

class Chatroom extends React.Component {
  state = {
  }

  componentDidMount() {
  }

  render() {
    return (
      <Grid columns='equal' className='app'>
        <Sidebar 
          width='very thin'
          icon='labeled'
          as={Menu}
          inverted
          vertical
          visible
        />

        <ChatMenu />

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

export default connect()(Chatroom);
