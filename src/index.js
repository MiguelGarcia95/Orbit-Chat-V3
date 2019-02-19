import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route, withRouter, Redirect} from 'react-router-dom';
import {Provider, connect} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css'

import firebase from './firebase';
import {setUser} from './actions/authActions';
import {getUserChatrooms} from './actions/chatroomActions';
import store from './store';
import App from './components/App';
import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import RoomNavbar from './components/RoomNavbar/RoomNavbar';
import Chatroom from './components/Chatroom/Chatroom';

class Root extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.setUser(user);
        // this.props.getUserChatrooms(user);
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path='/app/:roomId' component={Chatroom} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/signin' component={SignIn} />
          <Route path='/app' component={App} />
          <Route exact path="/" render={() => (<Redirect to="/app" />)} /> 
        </Switch>
        <Route path='/app' component={RoomNavbar} />
        {/* <Route path='/app'
          render={(props) => <RoomNavbar {...props} user={this.props.user} />}
        /> */}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.currentUser
  }
}

const mapDispatchToState = dispatch => {
  return {
    setUser: user => dispatch(setUser(user)),
    getUserChatrooms: user => dispatch(getUserChatrooms(user))
  }
}

const RootWithAuth = withRouter(connect(mapStateToProps, mapDispatchToState)(Root));

const RootWithRouter = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <RootWithAuth />
      </BrowserRouter>
    </Provider>
  )
}

ReactDOM.render(<RootWithRouter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
