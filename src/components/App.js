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
        <Sidebar 
          width='very thin'
          icon='labeled'
          as={Menu}
          inverted
          vertical
          visible
        />

        {/* <Menu
        size='large' 
        fixed='left'
        vertical
        // style={{paddingTop: '30px'}}
        className='Chatroom_Header'
      >
        <Menu.Header 
          as='div' 
          content={
            <Grid>
              <Grid.Row columns='2'>
                <Grid.Column verticalAlign='middle' width={12}>
                  <Container style={{width: '100%', overflow: 'hidden'}} >
                    {'Chatroom Name'}
                  </Container>
                </Grid.Column>
                <Grid.Column verticalAlign='middle' width={2}>
                  <Container fluid>
                    <Dropdown icon='plus'>
                      <Dropdown.Menu direction='left' >
                        <Dropdown.Item text='New Category' />
                      </Dropdown.Menu>
                    </Dropdown>
                  </Container>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          } 
        />
        </Menu> */}

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
