import React from 'react';
import {Grid, Container, Header, Icon} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {getDirectMessages, getDirectMessagesReference} from '../../actions/homeActions';

class MenuHome extends React.Component {
  state = {
  }

  componentDidMount() {
    this.props.getDirectMessagesReference(this.props.user.uid);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.references.length > 0) {
      nextProps.references.forEach(reference => {
        this.props.getDirectMessages(this.props.user, reference.uid);
      })
    }
  }

  isOptionActive = name => {
    return name === this.props.currentView ? 'active' : '';
  }

  // Get real time comments

  onClick = () => {console.log('test')} 

  render() {
    return (
      <React.Fragment>
        <Grid className='home_optiopns_container' style={{marginTop: '0'}}>
          <Grid.Row onClick={this.onClick} className='home_option active' verticalAlign="middle" textAlign='center' >
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

const mapStateToProps = state => {
  return {
    references: state.home.references,
    currentView: state.home.currentView
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDirectMessages: (user, references) => dispatch(getDirectMessages(user, references)),
    getDirectMessagesReference: userId => dispatch(getDirectMessagesReference(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuHome);