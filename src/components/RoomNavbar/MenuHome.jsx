import React from 'react';
import {Grid, Container, Header, Icon} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {getDirectMessages, getDirectMessagesReference} from '../../actions/homeActions';

class MenuHome extends React.Component {
  isOptionActive = name => {
    return name === this.props.currentView ? 'active' : '';
  }

  isDMOnDisplay = () => {
    return this.props.currentView !== 'friends' ? 'active' : '';
  }

  // Get real time comments

  onClick = () => {console.log('test')}

  displayMessageNotifications = (messages) => {
    if (messages.length > 0) {
      console.log(messages)
      return messages.map(message => {
        return (
          <Grid.Row key={message.uid} onClick={this.onClick} className={`home_option`} verticalAlign="middle" textAlign='center'>
            <Container fluid textAlign='right' >
              <Header as='h3' style={{margin: '0'}} floated='left'>{message.username}</Header>
              <Icon name='mail'  size='large'/>
            </Container>
          </Grid.Row>
        )
      })
    }
  }

  render() {
    const {directMessages} = this.props;
    return (
      <React.Fragment>
        <Grid className='home_optiopns_container' style={{marginTop: '0'}}>
          <Grid.Row onClick={this.onClick} className={`home_option ${this.isOptionActive('friends')}`} verticalAlign="middle" textAlign='center' >
            <Container fluid textAlign='right'>
              <Header as='h3' style={{margin: '0'}} floated='left'>Friends</Header>
              <Icon name='users'  size='large'/>
            </Container>
          </Grid.Row>
        </Grid>

        <Grid className='home_optiopns_container home_DM' style={{marginTop: '0'}}>
          <Grid.Row onClick={this.onClick} className={`home_option ${this.isDMOnDisplay()}`} verticalAlign="middle" textAlign='center' >
            <Container fluid textAlign='right' >
              <Header as='h3' style={{margin: '0'}} floated='left'>Direct Messages</Header>
              <Icon name='mail'  size='large'/>
            </Container>
          </Grid.Row>
          {directMessages &&  this.displayMessageNotifications(directMessages)}
        </Grid>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    references: state.home.references,
    currentView: state.home.currentView,
    directMessages: state.home.directMessages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDirectMessages: (user, references) => dispatch(getDirectMessages(user, references)),
    getDirectMessagesReference: userId => dispatch(getDirectMessagesReference(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuHome);