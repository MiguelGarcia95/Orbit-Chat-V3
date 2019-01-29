import React from 'react';
import './App.css';
import firebase from '../firebase';
import {Grid, Sidebar, Menu} from 'semantic-ui-react';
import {connect} from 'react-redux';
import Spinner from './Layout/Spinner';

class App extends React.Component {
  state = {
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        // if not logged in, unset the user
        this.props.history.push('/signin');
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

export default connect(mapStateToProps)(App);
