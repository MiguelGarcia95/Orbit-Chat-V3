import React from 'react';
import {Grid, Container, Header, Icon} from 'semantic-ui-react';
import {connect} from 'react-redux';

class MenuHome extends React.Component {
  state = {
  }

  onClick = () => {console.log('test')}
 

  render() {
    return (
      <React.Fragment>
        <Grid >
          <Grid.Row onClick={this.onClick} className='home_option' >
            <Container fluid textAlign='right' >
              <Header as='h3' style={{margin: '0'}} floated='left'>Friends</Header>
              <Icon name='users'  size='large'/>
            </Container>
          </Grid.Row>
          <Container fluid textAlign='right'>
          </Container>
          {/* <p>Friends</p> <h3>Direct Messages</h3> */}
        </Grid>
      </React.Fragment>
    )
  }
}

export default connect()(MenuHome);