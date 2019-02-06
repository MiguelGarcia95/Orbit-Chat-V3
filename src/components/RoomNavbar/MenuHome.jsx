import React from 'react';
import {Grid, Container, Header, Icon} from 'semantic-ui-react';
import {connect} from 'react-redux';

class MenuHome extends React.Component {
  state = {
  }
  
  render() {
    return (
      <Grid >
        <Container fluid textAlign='right'>
          <Header as='h4' className='home_option' floated='left' >Option name</Header>
          {/* <Icon name='plus' style={{cursor: 'pointer'}}  onClick={this.openModal} /> */}
        </Container>
        <Container fluid textAlign='right'>
        </Container>
        {/* <p>Friends</p> <h3>Direct Messages</h3> */}
      </Grid>
    )
  }
}

export default connect()(MenuHome);