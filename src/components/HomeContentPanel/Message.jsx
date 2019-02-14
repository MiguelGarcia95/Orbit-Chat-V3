import React from 'react';
import {Comment, Dropdown, Modal, Input, Segment, Button} from 'semantic-ui-react';
import moment from 'moment';
import {connect} from 'react-redux';
import {createDirectMessage, deleteDirectMessage} from '../../actions/homeActions';

class Message extends React.Component{
  state = {
    modal: false,
  }

  timeFromNow = message => {
    if (message.createdAt !== null) {
      return moment(message.createdAt.toDate()).fromNow();
    }
  }
  
  isOwnMessageClass = (message, user) => {
    return message.uid === user.uid ? 'message_self' : ''
  }

  // openModal = () => this.setState({modal: true});
  // closeModal = () => this.setState({modal: false});

  onDelete = () => {
    // this.props.deleteDirectMessage(this.props.message.channelId, this.props.messageId)
  }
  
  isOwnMessageOptions = (message, user) => {
    if (message.uid === user.uid ) {
      return (
        <Dropdown.Item content='Delete' icon='x' onClick={this.onDelete} />
      )
    } else {
      return (
        <Dropdown.Item content={`Send ${message.username} DM`} icon='at' onClick={this.openModal} />
      )
    }
  }

  render() {
    const {message, user} = this.props;
    const {modal} = this.state;
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

        {/* <Modal open={modal} onClose={this.closeModal} >
          <Modal.Header>DM</Modal.Header>
          <Modal.Content>
            <Segment>
              <Input fluid placeholder='Message' name='comment' />
            </Segment>
            <Button.Group attached='bottom'>
              <Button negative onClick={this.closeModal} > Cancel</Button>
              <Button.Or />
              <Button positive onClick={this.onSubmit} > Create</Button>
            </Button.Group>
          </Modal.Content>
        </Modal> */}
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createDirectMessage: (user, otherUser, comment) => dispatch(createDirectMessage(user, otherUser, comment)),
    deleteDirectMessage: (user, reference, commentId) => dispatch(deleteDirectMessage(user, reference, commentId))
  }
}

export default connect(null, mapDispatchToProps)(Message);
