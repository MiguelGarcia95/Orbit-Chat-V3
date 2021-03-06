import React from 'react';
import {Grid, Sidebar, Menu, Button, Divider, Image, Modal, Input, Label, Segment} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createChatroom, setChatrooms} from '../../actions/chatroomActions';
import RoomMenu from './RoomMenu';

class RoomNavbar extends React.Component {
  state = {
    modal: false,
    name: '',
    description: '',
    createdNewChatroom: false,
    userChatrooms: [],
    fetchedChatrooms: false
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.createdNewChatroom && nextProps.newChatroomId) {
      nextProps.history.push(`/app/${nextProps.newChatroomId}`);
      this.setState({createdNewChatroom: false});
    }
  }

  onChange = e => this.setState({[e.target.name]: e.target.value});

  openModal = () => this.setState({modal: true});

  closeModal = () => this.setState({modal: false});

  displayChatRooms = (chatrooms) => {
    return (
      chatrooms.map(chatroom => {
        return (
          <React.Fragment key={chatroom.id}>
            <Divider  />
            <Link to={`/app/${chatroom.id}`}>
              <Image title={chatroom.chatroom.name} src={chatroom.chatroom.avatar} circular />
            </Link>
          </React.Fragment>
        )
      })
    )
  }

  onChatroomSubmit = () => {
    if (!this.isChatroomFormEmpty()) {
      this.props.createChatroom({
        ...this.state,
        user: this.props.user
      });
      this.setState({createdNewChatroom: true});
      this.closeModal();
    }
  }

  isChatroomFormEmpty = () => {
    if (this.state.name && this.state.description && this.props.user) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    const {modal} = this.state;
    const {user, chatrooms, currentChatroom, inChatroom} = this.props;
    const isChatroomEmpty = this.isChatroomFormEmpty();
    return !user ? null : (
      <Grid columns='equal' >
        <Sidebar 
          width='very thin'
          icon='labeled'
          className='room_navbar'
          as={Menu}
          inverted
          vertical
          visible
        >
          <Divider hidden/>

          <Link to='/app'><Image src='/img/ChatLogo.png' size='mini' rounded centered /></Link>

          <Divider hidden />
          <Button icon='add' size='small' color='grey' inverted onClick={this.openModal} />
          
          {this.displayChatRooms(chatrooms)}

          <Modal open={modal} onClose={this.closeModal} >
            <Modal.Header>Create A New Chatroom</Modal.Header>
            <Modal.Content>
              <Segment>
                <Label attached='top' color='black' >Name</Label>
                <Input fluid placeholder='Chatroom Name' name='name' onChange={this.onChange} />
              </Segment>
              <Segment>
                <Label attached='top' color='black' >Description</Label>
                <Input fluid placeholder='Chatroom Description' name='description' onChange={this.onChange} />
              </Segment>
              <Button.Group attached='bottom'>
                <Button negative onClick={this.closeModal} > Cancel</Button>
                <Button.Or />
                <Button positive onClick={this.onChatroomSubmit} disabled={isChatroomEmpty} >Create</Button>
              </Button.Group>
            </Modal.Content>
          </Modal>
        </Sidebar>

        {/* Menu here  */}
        <RoomMenu user={user} currentChatroom={currentChatroom} inChatroom={inChatroom} />
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.currentUser,
    chatrooms: state.chat.chatrooms,
    currentChatroom: state.chat.currentChatroom,
    inChatroom: state.chat.inChatroom,
    newChatroomId: state.chat.newChatroomId,
    userChatrooms: state.chat.userChatrooms
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createChatroom: chatroom => dispatch(createChatroom(chatroom)),
    setChatrooms: docChatrooms => dispatch(setChatrooms(docChatrooms))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomNavbar);