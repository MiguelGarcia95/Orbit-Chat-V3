import React from 'react';
import {connect} from 'react-redux';
import {Grid, Container, Header, Input, Modal, Button, Icon} from 'semantic-ui-react';

import {addFriendWithEmail} from '../../actions/homeActions';

class FriendListHeader extends React.Component {
  state = {
    friendRequestModal: false,
    email: ''
  }

  openFriendModal = () => this.setState({friendRequestModal: true});
  closeFriendModal = () => this.setState({friendRequestModal: false});

  isEmailFormEmpty = () => this.state.email ? false : true;

  isEmailValid = () => {
    let re = /\S+@\S+\.\S+/;
    return re.test(this.state.email);
  }
  
  onEmailChange = e => this.setState({email: e.target.value});
  
  clearForm = () => this.setState({email: ''});
  
  isOptionActive = (option, friendsToShow) => {
    return option === friendsToShow ? 'active' : ''
  }
  
  onFriendRequestSent = () => {
    if (this.isEmailValid()) {
      this.props.addFriendWithEmail(this.props.user, this.state.email);
      this.clearForm();
    }
  }

  render() {
    const {setFriendDisplay, friendsToShow} = this.props;
    const {friendRequestModal, email} = this.state;
    const isEmailEmpty = !this.isEmailValid();
    return (
      <React.Fragment>
        <Grid className='home_comment_header'>
          <Grid.Row columns='1' style={{padding: '0px'}}>
            <Container fluid textAlign='right'>
              <Header 
                className={`home_header_option ${this.isOptionActive('all', friendsToShow)}`} 
                as='h4' 
                floated='left' 
                onClick={() => setFriendDisplay('all')} 
              >
                All
              </Header>
              <Header 
                className={`home_header_option ${this.isOptionActive('friends', friendsToShow)}`} 
                as='h4' 
                floated='left' 
                onClick={() => setFriendDisplay('friends')} 
              >
                Friends
              </Header>
              <Header 
                className={`home_header_option ${this.isOptionActive('pending', friendsToShow)}`} 
                as='h4' 
                floated='left' 
                onClick={() => setFriendDisplay('pending')} 
              >
                Pending
              </Header>
              
              <Header 
                className={`home_header_option active`} 
                as='h4' 
                floated='right'
                onClick={this.openFriendModal}
              >
                Send Friend Request
              </Header>
            </Container>
          </Grid.Row>
        </Grid>

        <Modal size='mini' open={friendRequestModal} onClose={this.closeFriendModal}>
          <Modal.Header>Enter Friend's Email</Modal.Header>
          <Modal.Content>
            <Input placeholder="Friend Email ..." type='email' icon='mail' onChange={this.onEmailChange} value={email} fluid/>
          </Modal.Content>
          <Modal.Actions>
            <Button.Group attached='bottom'>
              <Button negative onClick={this.closeFriendModal}> Cancel</Button>
              <Button.Or />
              <Button positive disabled={isEmailEmpty} onClick={() => this.onFriendRequestSent()} >Create</Button>
            </Button.Group>
          </Modal.Actions>
        </Modal>

      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addFriendWithEmail: (user, email) => dispatch(addFriendWithEmail(user, email))
  }
}

export default connect(null, mapDispatchToProps)(FriendListHeader);