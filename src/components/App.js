import React from 'react';
import './App.css';
import firebase from '../firebase';
import {Grid} from 'semantic-ui-react';
import {connect} from 'react-redux';
import Spinner from './Layout/Spinner';
import {getFirestore} from 'redux-firestore';

import {clearChatroom} from '../actions/chatroomActions';
import {setHomeView, setComments, setReferences} from '../actions/homeActions';

import HomeContentPanel from './HomeContentPanel/HomeContentPanel';
 
class App extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.props.history.push('/signin');
      } else {
        this.props.clearChatroom();
        this.getDirectMessagesReferenceRT(user.uid);
        this.props.setHomeView('friends')
      }
    })
  }

  /*
    Instead of using nameError, use 
    displayMessage: {
      type: error, 
      message: 'Message here'
    }
  */

  UNSAFE_componentWillReceiveProps(nextProps) {
      if (this.props.currentView !== nextProps.currentView && nextProps.currentView !== 'friends') {
      this.getChannelCommentsRT(nextProps.user, nextProps.currentView)
    }
  }

  getDirectMessagesReferenceRT = userId => {
    const firestore = getFirestore();
    firestore.collection(`users/${userId}/dmList`).onSnapshot(snapshot => {
      let changes = snapshot.docChanges();
      this.props.setReferences(changes)
    })
  }

  getChannelCommentsRT = (user, reference) => {
    const firestore = getFirestore();
    firestore.collection(`users/${user.uid}/messages/${reference}/messages`).onSnapshot(snapshot => {
      let changes = snapshot.docChanges();
      this.props.setComments(changes, reference)
    })
  }

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
    currentReference: state.home.currentReference
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearChatroom: () => dispatch(clearChatroom()),
    setHomeView: view => dispatch(setHomeView(view)),
    setComments: (docComments, reference) => dispatch(setComments(docComments, reference)),
    setReferences: docReferences => dispatch(setReferences(docReferences))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
