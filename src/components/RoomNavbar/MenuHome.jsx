import React from 'react';
import {Grid, Container, Header, Icon} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {getDirectMessages, getDirectMessagesReference} from '../../actions/homeActions';

class MenuHome extends React.Component {
  state = {
  }

  componentDidMount() {
    // this.props.getDirectMessages(this.props.user);
    this.props.getDirectMessagesReference(this.props.user.uid);
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

        <Grid className='home_optiopns_container home_DM' style={{marginTop: '0'}}>
          <Grid.Row onClick={this.onClick} className='home_option' verticalAlign="middle" textAlign='center' >
            <Container fluid textAlign='right' >
              <Header as='h3' style={{margin: '0'}} floated='left'>Direct Messages</Header>
              <Icon name='mail'  size='large'/>
            </Container>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDirectMessages: user => dispatch(getDirectMessages(user)),
    getDirectMessagesReference: userId => dispatch(getDirectMessagesReference(userId))
  }
}

export default connect(null, mapDispatchToProps)(MenuHome);