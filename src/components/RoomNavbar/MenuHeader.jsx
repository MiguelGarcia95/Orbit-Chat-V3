import React from 'react';
import {Grid, Container, Modal, Segment, Button, Label, Input, Dropdown} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {createCategory, leaveChatroom, inviteChatroom} from '../../actions/chatroomActions';

class MenuHeader extends React.Component {
  state = {
    modal: false,
    inviteFriendModal: false,
    deleteChannelModal: false,
    deleteCategoryModal: false,
    user: this.props.user,
    friendInviteId: '',
    chatroom: this.props.chatroom,
    name: ''
  }

  openModal = () => this.setState({modal: true});
  closeModal = () => this.setState({modal: false});
  
  openFriendModal = () => this.setState({inviteFriendModal: true});
  closeFriendModal = () => this.setState({inviteFriendModal: false});

  openChannelDeleteModal = () => this.setState({deleteChannelModal: true});
  closeChannelDeleteModal = () => this.setState({deleteChannelModal: false});

  openCategoryDeleteModal = () => this.setState({deleteCategoryModal: true});
  closeCategoryDeleteModal = () => this.setState({deleteCategoryModal: false});
  
  onChange = e => this.setState({[e.target.name]: e.target.value});
  clearFriendId = () => this.setState({friendInviteId: ''});

  onSubmit = () => {
    this.props.createCategory(this.state);
    this.closeModal();
  }

  inviteFriend = () => {
    if (this.props.friendInviteId !== '') {
      this.props.inviteChatroom(this.state.friendInviteId, this.props.chatroom);
      this.clearFriendId();
      this.closeFriendModal();
    }
  };

  deleteChannel = () => {
    console.log('delete channel')
  };

  deleteCategory = () => {
    console.log('delete category')
  };

  getAllFriends = (friends) => {
    let allFriends = [];
    friends.forEach(friend => {
      if (friend.friend.status === 'accepted') {
        allFriends.push({
          text: friend.friend.username, 
          image: friend.friend.avatar, 
          value: friend.id,
          disabled: this.hasFriendJoined(friend.id)
        });
      }
    })
    return allFriends;
  }

  getAllCategories = (categories) => {
    let allCategories = [];
    categories.forEach(category => {
      allCategories.push({
        text: category.category.name, 
        value: category.id,
      });
    })
    return allCategories;
  }

  getAllChannels = (channels) => {
    let allChannels = [];
    channels.forEach(channel => {
      allChannels.push({
        text: channel.channel.name, 
        value: channel.id,
      });
    })
    return allChannels;
  }

  hasFriendJoined = (friendId) => {
    let isFriend = false;
    this.props.chatroomUsers.forEach(friendRequest => {
      if (friendRequest.user.uid === friendId) {
        isFriend = true;
      }
    })
    this.props.chatroomInvites.forEach(chatroomInvite => {
      if (chatroomInvite.id === friendId) {
        isFriend = true;
      }
    })
    return isFriend;
  }

  isFriendInviteEmpty = () => this.state.friendInviteId === '' ? true : false;

  handleFriendChange = (e, { value }) => this.setState({ friendInviteId: value });

  onChatroomLeave = () => {
    this.props.leaveChatroom(this.props.user, this.props.chatroom);
  }

  render() {
    const {modal, inviteFriendModal, deleteChannelModal, deleteCategoryModal} = this.state;
    const {friendsList, chatroom, user, categories, channels} = this.props;
    let isFriendIdEmpty = this.isFriendInviteEmpty();
    let modalFriends = this.getAllFriends(friendsList);
    let modalCategories = this.getAllCategories(categories)
    let modalChannels = this.getAllChannels(channels)
    return(
      <React.Fragment>
        <Grid className='header_menu'>
          <Grid.Row columns='2' style={{paddingBottom: 0}}>
            <Grid.Column verticalAlign='middle' width={12}>
              <Container fluid>
              {chatroom.chatroom.name}
              </Container>
            </Grid.Column>
            <Grid.Column verticalAlign='middle' width={2} style={{position: 'absolute', right: '0px', marginRight: '10px'}}>
              <Container fluid>
                <Dropdown icon='caret down'>
                  <Dropdown.Menu >
                    {chatroom.chatroom.uid === user.uid && (
                      <React.Fragment>
                        <Dropdown.Item content='New Category' onClick={this.openModal} icon='list' />
                        <Dropdown.Item content='Delete Channel' onClick={this.openChannelDeleteModal} icon='trash alternate outline' />
                        <Dropdown.Item content='Delete Category' onClick={this.openCategoryDeleteModal} icon='trash alternate outline' />
                      </React.Fragment>
                    )}
                    <Dropdown.Item content='Invite Friend' onClick={this.openFriendModal} icon='user plus' />
                    {chatroom.chatroom.uid !== user.uid && (
                      <React.Fragment>
                        <Dropdown.Divider />
                        <Dropdown.Item content='Leave Chatroom' onClick={this.onChatroomLeave} icon='minus circle'/>
                      </React.Fragment>
                    )}
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
        {/* Modal for Friend Invite */}
        <Modal open={inviteFriendModal} onClose={this.closeFriendModal} size='mini'>
          <Modal.Header>Pick A Friend To Invite</Modal.Header>
          <Modal.Content>
            <Dropdown placeholder='Select Friend' fluid selection options={modalFriends} onChange={this.handleFriendChange} />
          </Modal.Content>
          <Modal.Actions>
            <Button
              negative icon='ban' 
              labelPosition='left' 
              content='Cancel' 
              onClick={this.closeFriendModal}
            />
            <Button 
              positive icon='checkmark' 
              labelPosition='right' 
              content='Invite' 
              onClick={this.inviteFriend} 
              disabled={isFriendIdEmpty} 
            />
          </Modal.Actions>
        </Modal>
        {/* Modal for Channel Delete */}
        <Modal open={deleteChannelModal} onClose={this.closeChannelDeleteModal} size='mini'>
          <Modal.Header>Pick A Channel To Delete</Modal.Header>
          <Modal.Content>
            <Dropdown placeholder='Select Category' fluid selection options={modalCategories} onChange={this.handleFriendChange} />
            <Dropdown placeholder='Select Channel' fluid selection options={modalChannels} onChange={this.handleFriendChange} />
          </Modal.Content>
          <Modal.Actions>
            <Button
              negative icon='ban' 
              labelPosition='left' 
              content='Cancel' 
              onClick={this.closeChannelDeleteModal}
            />
            <Button 
              positive icon='checkmark' 
              labelPosition='right' 
              content='Delete Channel' 
              onClick={this.deleteChannel} 
              disabled={isFriendIdEmpty} 
            />
          </Modal.Actions>
        </Modal>
        {/* Modal for Category Delete */}
        <Modal open={deleteCategoryModal} onClose={this.closeCategoryDeleteModal} size='mini'>
          <Modal.Header>Pick A Category To Delete</Modal.Header>
          <Modal.Content>
            <Dropdown placeholder='Select Category' fluid selection options={modalCategories} onChange={this.handleFriendChange} />
          </Modal.Content>
          <Modal.Actions>
            <Button
              negative icon='ban' 
              labelPosition='left' 
              content='Cancel' 
              onClick={this.closeCategoryDeleteModal}
            />
            <Button 
              positive icon='checkmark' 
              labelPosition='right' 
              content='Delete Category' 
              onClick={this.deleteCategory} 
              disabled={isFriendIdEmpty} 
            />
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    friendsList: state.home.friendsList,
    chatroomUsers: state.chat.chatroomUsers,
    chatroomInvites: state.chat.chatroomInvites,
    categories: state.chat.categories,
    channels: state.channel.channels
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createCategory: category => dispatch(createCategory(category)),
    leaveChatroom: (user, chatroom) => dispatch(leaveChatroom(user, chatroom)),
    inviteChatroom: (friendId, chatroom) => dispatch(inviteChatroom(friendId, chatroom))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuHeader);
