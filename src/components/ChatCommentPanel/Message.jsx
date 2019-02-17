import React from 'react';
import {Comment, Dropdown, Modal, Input, Segment, Button} from 'semantic-ui-react';
import moment from 'moment';
import {connect} from 'react-redux';
import {deleteChannelComment} from '../../actions/channelActions';
import {createDirectMessage, addFriend} from '../../actions/homeActions';

class Message extends React.Component{
  state = {
    modal: false,
    comment: ''
  }

  timeFromNow = message => {
    if (message.createdAt !== null) {
      return moment(message.createdAt.toDate()).fromNow();
    }
  }
  
  isOwnMessageClass = (message, user) => {
    return message.uid === user.uid ? 'message_self' : ''
  }

  onChange = e => this.setState({[e.target.name]: e.target.value});
  openModal = () => this.setState({modal: true});
  closeModal = () => this.setState({modal: false});
  clearForm = () => this.setState({modal: false, comment: ''});

  onSubmit = () => {
    this.props.createDirectMessage(this.props.user, this.props.message, this.state.comment);
    this.clearForm();
  }

  onDelete = () => {
    this.props.deleteChannelComment(this.props.message.channelId, this.props.messageId)
  }

  sendFriendRequest = () => {
    this.props.addFriend(this.props.user, this.props.message);
  }
  
  isOwnMessageOptions = (message, user) => {
    if (message.uid === user.uid ) {
      return (
        <Dropdown.Item content='Delete' icon='x' onClick={this.onDelete} />
      )
    } else {
      return (
        <React.Fragment>
          <Dropdown.Item content={`Send ${message.username} DM`} icon='at' onClick={this.openModal} />
          <Dropdown.Item content={`Send Friend Request`} icon='user plus' onClick={this.sendFriendRequest} />
        </React.Fragment>
      )
    }
  }

  render() {
    const {message, user} = this.props;
    const {modal, comment} = this.state;
    return (
      <React.Fragment>
        <Comment className="chat_comment">
          <Comment.Avatar src={message.avatar}  />
          <Comment.Content className={`comment_body ${this.isOwnMessageClass(message, user)}`} >
            <Comment.Author as='a'>{message.username}</Comment.Author>
            {message.createdAt &&  <Comment.Metadata >{this.timeFromNow(message)}</Comment.Metadata> }
            <Comment.Text>{message.comment}</Comment.Text>
            <Dropdown icon='ellipsis vertical' className='message_options'>
              <Dropdown.Menu direction='left' >
                {this.isOwnMessageOptions(message, user)}
              </Dropdown.Menu>
            </Dropdown>
          </Comment.Content>
        </Comment>

        <Modal open={modal} onClose={this.closeModal} >
          <Modal.Header>DM</Modal.Header>
          <Modal.Content>
            <Segment>
              <Input fluid placeholder='Message' name='comment' value={comment} onChange={this.onChange} />
            </Segment>
            <Button.Group attached='bottom'>
              <Button negative onClick={this.closeModal} > Cancel</Button>
              <Button.Or />
              <Button positive onClick={this.onSubmit} > Create</Button>
            </Button.Group>
          </Modal.Content>
        </Modal>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteChannelComment: (channelId, commentId) => dispatch(deleteChannelComment(channelId, commentId)),
    createDirectMessage: (user, otherUser, comment) => dispatch(createDirectMessage(user, otherUser, comment)),
    addFriend: (user, otherUser) => dispatch(addFriend(user, otherUser))
  }
}

export default connect(null, mapDispatchToProps)(Message);
