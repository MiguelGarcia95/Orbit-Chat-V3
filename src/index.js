import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route, withRouter, Redirect} from 'react-router-dom';
import {Provider, connect} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css'

// import firebase from './firebase';
import store from './store';
import App from './components/App';
import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import RoomNavbar from './components/RoomNavbar/RoomNavbar';
import Chatroom from './components/Chatroom/Chatroom';
// import UserPanel from './components/UserPanel/UserPanel';

class Root extends React.Component {
  state = {
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
      </React.Fragment>
    )
  }
}

const RootWithAuth = withRouter(connect()(Root));

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
