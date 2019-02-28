import React from 'react';
import {Grid, Container, Modal, Segment, Button, Label, Input, Dropdown, Divider} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {createCategory, leaveChatroom, inviteChatroom, deleteCategory, deleteChatroom} from '../../actions/chatroomActions';
import {deleteChannel} from '../../actions/channelActions';

class MenuHeader extends React.Component {
  state = {
    modal: false,
    inviteFriendModal: false,
    deleteChannelModal: false,
    deleteCategoryModal: false,
    deleteChatroomModal: false,
    friendInviteId: '',
    channelToDelete: '',
    channelCategory: '',
    name: '',
    user: this.props.user,
    chatroom: this.props.chatroom
  }

  openModal = () => this.setState({modal: true});
  closeModal = () => this.setState({modal: false});
  
  openFriendModal = () => this.setState({inviteFriendModal: true});
  closeFriendModal = () => this.setState({inviteFriendModal: false});

  openChannelDeleteModal = () => this.setState({deleteChannelModal: true});
  closeChannelDeleteModal = () => this.setState({deleteChannelModal: false});

  openCategoryDeleteModal = () => this.setState({deleteCategoryModal: true});
  closeCategoryDeleteModal = () => this.setState({deleteCategoryModal: false});

  openChatroomDeleteModal = () => this.setState({deleteChatroomModal: true});
  closeChatroomDeleteModal = () => this.setState({deleteChatroomModal: false});
  
  onChange = e => this.setState({[e.target.name]: e.target.value});

  clearFields = () => {
    this.setState({
      friendInviteId: '',
      channelToDelete: '',
      categoryToDelete: '',
      channelCategory: '',
    });
  }

  onSubmit = () => {
    this.props.createCategory(this.state);
    this.closeModal();
  }

  inviteFriend = () => {
    if (this.props.friendInviteId !== '') {
      this.props.inviteChatroom(this.state.friendInviteId);
      this.clearFields();
      this.closeFriendModal();
    }
  };

  deleteChannel = () => {
    this.props.deleteChannel(this.state.channelToDelete, this.state.chatroom.id);
    this.clearFields();
    this.closeChannelDeleteModal();
  };

  deleteCategory = () => {
    this.props.deleteCategory(this.state.categoryToDelete, this.state.chatroom.id);
    this.clearFields();
    this.closeCategoryDeleteModal();
  };

  deleteChatroom = () => {
    this.closeChatroomDeleteModal();
  }

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

  getAllChannels = (channels, channelCategoryId) => {
    let allChannels = [];
    channels.forEach(channel => {
      if (channel.channel.categoryId === channelCategoryId) {
        allChannels.push({
          text: channel.channel.name, 
          value: channel.id,
        });
      }
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
  isCategoryValueEmpty = () => this.state.categoryToDelete === '' ? true : false;
  isChannelValueEmpty = () => this.state.channelToDelete === '' ? true : false;

  handleFriendChange = (e, { value }) => this.setState({ friendInviteId: value });
  handleCategoryChange = (e, { value }) => this.setState({ categoryToDelete: value });
  handleChannelCategoryChange = (e, { value }) => this.setState({ channelCategory: value });
  handleChannelChange = (e, { value }) => this.setState({ channelToDelete: value });

  onChatroomLeave = () => {
    this.props.leaveChatroom(this.props.user, this.props.chatroom);
  }

  render() {
    const {modal, inviteFriendModal, deleteChannelModal, deleteCategoryModal, deleteChatroomModal, channelCategory} = this.state;
    const {friendsList, chatroom, user, categories, channels} = this.props;
    let isFriendIdEmpty = this.isFriendInviteEmpty();
    let isCategoryEmpty = this.isCategoryValueEmpty();
    let isChannelEmpty = this.isChannelValueEmpty();
    let modalFriends = this.getAllFriends(friendsList);
    let modalCategories = this.getAllCategories(categories)
    let modalChannels = this.getAllChannels(channels, channelCategory)
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
                        <Dropdown.Item content='Delete Chatroom' onClick={this.openChatroomDeleteModal} icon='trash alternate outline' />
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
            <Dropdown placeholder='Select Channel Category' fluid selection options={modalCategories} onChange={this.handleChannelCategoryChange} />
            <Divider />
            <Dropdown placeholder='Select Channel' fluid selection options={modalChannels} onChange={this.handleChannelChange} />
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
              disabled={isChannelEmpty} 
            />
          </Modal.Actions>
        </Modal>
        {/* Modal for Category Delete */}
        <Modal open={deleteCategoryModal} onClose={this.closeCategoryDeleteModal} size='mini'>
          <Modal.Header>Pick A Category To Delete</Modal.Header>
          <Modal.Content>
            <Dropdown placeholder='Select Category' fluid selection options={modalCategories} onChange={this.handleCategoryChange} />
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
              disabled={isCategoryEmpty} 
            />
          </Modal.Actions>
        </Modal>
        {/* Modal for Category Delete */}
        <Modal open={deleteChatroomModal} onClose={this.closeChatroomDeleteModal} size='mini'>
          <Modal.Header>Are you sure you want to delete {chatroom.chatroom.name} chatroom?</Modal.Header>
          <Modal.Actions>
            {/* <Button
              negative icon='ban' 
              labelPosition='left' 
              content='Cancel' 
              onClick={this.closeChatroomDeleteModal}
            />
            <Button 
              positive icon='checkmark' 
              labelPosition='right' 
              content='Delete Chatroom' 
              onClick={this.deleteChatroom} 
            /> */}
            <Button.Group attached='bottom'>
              <Button negative onClick={this.closeChatroomDeleteModal} >Cancel</Button>
              <Button.Or />
              <Button positive onClick={this.deleteChatroom} >Delete</Button>
            </Button.Group>
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
    inviteChatroom: (friendId, chatroom) => dispatch(inviteChatroom(friendId, chatroom)),
    deleteCategory: (categoryId, chatroomId) => dispatch(deleteCategory(categoryId, chatroomId)),
    deleteChannel: (channelId, chatroomId) => dispatch(deleteChannel(channelId, chatroomId)),
    deleteChatroom: chatroomId => dispatch(deleteChatroom(chatroomId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuHeader);
