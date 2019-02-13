import React from 'react';
import './App.css';
import firebase from '../firebase';
import {Grid} from 'semantic-ui-react';
import {clearChatroom} from '../actions/chatroomActions';
import {connect} from 'react-redux';
import Spinner from './Layout/Spinner';
import {getDirectMessages, getDirectMessagesReference, setHomeView} from '../actions/homeActions';

import HomeContentPanel from './HomeContentPanel/HomeContentPanel';
 
class App extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.props.history.push('/signin');
      } else {
        this.props.clearChatroom();
        this.props.getDirectMessagesReference(user.uid);
        this.props.setHomeView('friends')
      }
    })
  }



  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.currentView !== nextProps.currentView && nextProps.currentView !== 'friends') {
      // console.log('view chaNGED')
      this.props.getDirectMessages(nextProps.user, nextProps.currentView)
    }
  }

  // Get real time comments


  render() {
    const {user, currentView, currentReference} = this.props;
    return !user ? <Spinner /> : (
      <Grid columns='equal' className='app' style={{marginTop: '0px'}}>
        <Grid.Column style={{marginLeft: 320}}>
          <React.Fragment>
            <HomeContentPanel currentView={currentView} user={user} otherUser={currentReference} />
          </React.Fragment>
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
    // directMessages: state.home.directMessages,
    currentReference: state.home.currentReference
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearChatroom: () => dispatch(clearChatroom()),
    getDirectMessages: (user, references) => dispatch(getDirectMessages(user, references)),
    getDirectMessagesReference: userId => dispatch(getDirectMessagesReference(userId)),
    setHomeView: view => dispatch(setHomeView(view))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
