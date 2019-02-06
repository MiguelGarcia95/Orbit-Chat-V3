import React from 'react';
import {Grid, Container, Header, Icon} from 'semantic-ui-react';
import {connect} from 'react-redux';

class MenuHome extends React.Component {
  state = {
  }
  
  render() {
    return (
      <React.Fragment>
        <Grid >
          <Container fluid textAlign='right' className='home_option' >
            <Header as='h3' floated='left' >Friends</Header>
            <Icon name='users' style={{cursor: 'pointer'}}  size='large'/>
          </Container>
          <Container fluid textAlign='right'>
          </Container>
          {/* <p>Friends</p> <h3>Direct Messages</h3> */}
        </Grid>
      </React.Fragment>
    )
  }
}

export default connect()(MenuHome);