import React from 'react';
// import firebase from '../../firebase';
import {Grid, Sidebar, Menu} from 'semantic-ui-react';
import {connect} from 'react-redux';
import Spinner from '../Layout/Spinner';

class Chatroom extends React.Component {
  state = {
  }

  componentDidMount() {
  }

  render() {
    const {user} = this.props;
    return !user ? <Spinner /> : (
      <Grid columns='equal' className='app'>
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

        <Grid.Column style={{marginLeft: 320, padding: '0px'}} >
          <React.Fragment>
            {/* <ChatCommentPanel  channels={channels} user={user} chatroom={chatroom} getChannelComments={this.props.getChannelComments} /> */}
          </React.Fragment>
        </Grid.Column>
        <Grid.Column width={2}>
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

export default connect(mapStateToProps)(Chatroom);
