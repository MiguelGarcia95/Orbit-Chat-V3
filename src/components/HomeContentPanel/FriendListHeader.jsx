import React from 'react';
import {Grid, Container, Header, Input, Modal, Button} from 'semantic-ui-react';

class FriendListHeader extends React.Component {
  state = {
    friendRequestModal: false
  }

  openFriendModal = () => this.setState({friendRequestModal: true});
  closeFriendModal = () => this.setState({friendRequestModal: false});

  isOptionActive = (option, friendsToShow) => {
    return option === friendsToShow ? 'active' : ''
  }

  render() {
    const {setFriendDisplay, friendsToShow} = this.props;
    const {friendRequestModal} = this.state;
    return (
      <React.Fragment>
        <Grid className='home_comment_header'>
          <Grid.Row columns='1' style={{padding: '0px'}}>
            <Container fluid textAlign='right' >
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
              {/* addFriendWithEmail */}
              <Input 
                action={{content: 'Send Friend Request'}} 
                icon='user plus'
                iconPosition='left'
                onClick={() => console.log('clicked')} 
                placeholder='Friend Email' 
              /> 
            </Container>
          </Grid.Row>
        </Grid>
        <Modal size='mini' open={friendRequestModal} onClose={this.closeFriendModal}>
          <Modal.Header>Delete Your Account</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete your account</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => this.closeFriendModal}>Cancel</Button>
            <Button positive icon='checkmark' labelPosition='right' content='Yes' />
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    )
  }
}

export default FriendListHeader;