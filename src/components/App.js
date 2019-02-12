import React from 'react';
import './App.css';
import firebase from '../firebase';
import {Grid} from 'semantic-ui-react';
import {clearChatroom} from '../actions/chatroomActions';
import {connect} from 'react-redux';
import Spinner from './Layout/Spinner';
import {getDirectMessages, getDirectMessagesReference} from '../actions/homeActions';

class App extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.props.history.push('/signin');
      } else {
        this.props.clearChatroom();
        this.props.getDirectMessagesReference(user.uid);
      }
    })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.references.length > 0) {
      nextProps.references.forEach(reference => {
        this.props.getDirectMessages(this.props.user, reference.uid);
      })
    }
  }

  render() {
    const {user, currentView} = this.props;
    console.log(currentView)
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
    user: state.auth.currentUser,
    currentView: state.home.currentView,
    references: state.home.references,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearChatroom: () => dispatch(clearChatroom()),
    getDirectMessages: (user, references) => dispatch(getDirectMessages(user, references)),
    getDirectMessagesReference: userId => dispatch(getDirectMessagesReference(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
