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
        <Grid className='home_optiopns_container' style={{marginTop: '0'}}>
          <Grid.Row onClick={this.onClick} className='home_option' verticalAlign="middle" textAlign='center' >
            <Container fluid textAlign='right' >
              <Header as='h3' style={{margin: '0'}} floated='left'>Friends</Header>
              <Icon name='users'  size='large'/>
            </Container>
          </Grid.Row>
        </Grid>

        <Grid className='home_optiopns_container' style={{marginTop: '0'}}>
          <Grid.Row onClick={this.onClick} className='home_option home_DM' verticalAlign="middle" textAlign='center' >
            <Container fluid textAlign='right' >
              <Header as='h3' style={{margin: '0'}} floated='left'>Direct Messages</Header>
              <Icon name='mail'  size='large'/>
            </Container>
          </Grid.Row>
        </Grid>
          {/* <p>Friends</p> <h3>Direct Messages</h3> */}
      </React.Fragment>
    )
  }
}

export default connect()(MenuHome);