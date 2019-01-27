import {reactReduxFirebase, getFirebase} from 'react-redux-firebase';
import {reduxFirestore, getFirestore} from 'redux-firestore';
import {createStore, compose, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import firebase from './firebase';

const initialState = {};

const middleware = [thunk.withExtraArgument({getFirebase, getFirestore})];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    reduxFirestore(firebase),
    reactReduxFirebase(firebase),
    composeWithDevTools()
  )
)

export default store;