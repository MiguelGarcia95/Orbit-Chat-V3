import React from 'react';
import {Grid, Sidebar, Menu, Button, Divider, Image, Modal, Input, Label, Segment} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createChatroom, getChatrooms} from '../../actions/chatroomActions';
import UserPanel from '../UserPanel/UserPanel';
import RoomMenu from './RoomMenu';

class RoomNavbar extends React.Component {
  state = {
    modal: false,
    name: '',
    description: ''
  }

  componentDidMount() {
    this.props.getChatrooms()
  }

  static getDerivedStateFromProps(props, state) {
    return {
      ...state,
      user: props.user,
      chatrooms: props.chatrooms
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

  onSubmit = () => {
    this.props.createChatroom(this.state);
    this.closeModal();
  }

  render() {
    const {modal, user, chatrooms} = this.state;
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
          {/* BS */}
          {/* <UserPanel user={user} /> */}

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
                <Button positive onClick={this.onSubmit} > Create</Button>
              </Button.Group>
            </Modal.Content>
          </Modal>
        </Sidebar>
        {/* Add New Menu here  */}
        <RoomMenu />
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.currentUser,
    chatrooms: state.chat.chatrooms
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createChatroom: (chatroom) => dispatch(createChatroom(chatroom)),
    getChatrooms: () => dispatch(getChatrooms())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomNavbar);