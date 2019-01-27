import React from 'react';
import './App.css';
// import firebase from '../firebase';
import {Grid, Sidebar, Menu} from 'semantic-ui-react';
import HomeMenu from './HomeMenu/HomeMenu';
// import {connect} from 'react-redux';

class App extends React.Component {
  state = {

  }
  render() {
    return (
      <Grid columns='equal'>
        <Sidebar 
          width='very thin'
          icon='labeled'
          as={Menu}
          inverted
          vertical
          visible
        />
        <HomeMenu />
        <Grid.Column style={{marginLeft: 320}}>
          <React.Fragment></React.Fragment>
        </Grid.Column>
        {/* <Grid.Column width={2}>
          <React.Fragment>t</React.Fragment>
        </Grid.Column> */}
      </Grid>
    );
  }
}

export default App;
