import React from 'react';
import {Comment, Dropdown} from 'semantic-ui-react';
import moment from 'moment';
import {connect} from 'react-redux';
import {deleteChannelComment} from '../../actions/channelActions';
import {createDirectMessage} from '../../actions/homeActions';

class Message extends React.Component{
  timeFromNow = message => {
    if (message.createdAt !== null) {
      return moment(message.createdAt.toDate()).fromNow();
    }
  }
  
  isOwnMessageClass = (message, user) => {
    return message.uid === user.uid ? 'message_self' : ''
  }
  
  isOwnMessageOptions = (message, user) => {
    if (message.uid === user.uid ) {
      return (
        <Dropdown.Item content='Delete' icon='x' />
      )
    } else {
      return (
        <Dropdown.Item content={`Send ${message.username} DM`} icon='at' />
      )
    }
  }

  render() {
    const {message, user} = this.props;
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
      </React.Fragment>
    )
  }
}

export default connect()(Message);