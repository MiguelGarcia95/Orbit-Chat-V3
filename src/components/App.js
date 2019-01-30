import React from 'react';
import './App.css';
import firebase from '../firebase';
import {Grid} from 'semantic-ui-react';
import {clearChatroom} from '../actions/chatroomActions';
import {connect} from 'react-redux';
import Spinner from './Layout/Spinner';

class App extends React.Component {
  state = {
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.props.history.push('/signin');
      } else {
        this.props.clearChatroom();
      }
    })
  }

  render() {
    const {user} = this.props;
    return !user ? <Spinner /> : (
      <Grid columns='equal'>
        <Grid.Column style={{marginLeft: 320}}>
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

const mapDispatchToProps = dispatch => {
  return {
    clearChatroom: () => dispatch(clearChatroom())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
