import React from 'react';
import {Grid, Container, Modal, Segment, Button, Label, Input, Dropdown, Image, Header} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {createCategory, leaveChatroom} from '../../actions/chatroomActions';

class MenuHeader extends React.Component {
  state = {
    modal: false,
    inviteFriendModal: false,
    inviteFriendModal: true,
    user: this.props.user,
    chatroom: this.props.chatroom,
    name: ''
  }

  openModal = () => this.setState({modal: true});
  openFriendModal = () => this.setState({inviteFriendModal: true});

  closeModal = () => this.setState({modal: false});
  closeFriendModal = () => this.setState({inviteFriendModal: false});

  onChange = e => this.setState({[e.target.name]: e.target.value});

  onSubmit = () => {
    this.props.createCategory(this.state);
    this.closeModal();
  }

  inviteFriend = () => {
    console.log(this.props.friendsList)
  }

  friendOptions = (friends) => {
//     text: 'Jenny Hess',
//     value: 'Jenny Hess',
//     image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
  }

  getAllFriends = (friends) => {
    let allFriends = false;
    friends.forEach(friend => {
      if (friend.friend.status === 'accepted') {
        allFriends.push({username: friend.friend.username, avatar: friend.friend.avatar, uid: friend.id});
      }
    })
    return allFriends;
  }

  // isFriend = (friend, friends) => {
  //   let isFriend = false;
  //   friends.forEach(friendRequest => {
  //     if (friendRequest.friend.uid === friend.uid && friendRequest.friend.status === 'accepted') {
  //       isFriend = true;
  //     }
  //   })
  //   return isFriend;
  // }

  render() {
    const {modal, inviteFriendModal} = this.state;
    return(
      <React.Fragment>
        <Grid className='header_menu'>
          <Grid.Row columns='2' style={{paddingBottom: 0}}>
            <Grid.Column verticalAlign='middle' width={12}>
              <Container fluid>
              {this.props.chatroom.chatroom.name}
              </Container>
            </Grid.Column>
            <Grid.Column verticalAlign='middle' width={2} style={{position: 'absolute', right: '0px', marginRight: '10px'}}>
              <Container fluid>
                <Dropdown icon='caret down'>
                  <Dropdown.Menu >
                    <Dropdown.Item content='New Category' onClick={this.openModal} icon='list' />
                    <Dropdown.Item content='Invite Friend' onClick={this.openFriendModal} icon='user plus' />
                    <Dropdown.Divider />
                    <Dropdown.Item content='Leave Chatroom' onClick={this.openModal} icon='minus circle'/>
                  </Dropdown.Menu>
                </Dropdown>
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        {/* Modal for New Category */}
        <Modal open={modal} onClose={this.closeModal} >
          <Modal.Header>Create A New Category</Modal.Header>
          <Modal.Content>
            <Segment>
              <Label attached='top' color='black' >Name</Label>
              <Input fluid placeholder='Category Name' name='name' onChange={this.onChange} />
            </Segment>
            <Button.Group attached='bottom'>
              <Button negative onClick={this.closeModal} >Cancel</Button>
              <Button.Or />
              <Button positive onClick={this.onSubmit} >Create</Button>
            </Button.Group>
          </Modal.Content>
        </Modal>

        <Modal open={inviteFriendModal} onClose={this.closeFriendModal} size='mini'>
          <Modal.Header>Pick A Friend To Invite</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete your account account account account</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative>No</Button>
            <Button positive icon='checkmark' labelPosition='right' content='Yes' />
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    friendsList: state.home.friendsList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createCategory: category => dispatch(createCategory(category)),
    leaveChatroom: (user, chatroom) => dispatch(leaveChatroom(user, chatroom))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuHeader);
