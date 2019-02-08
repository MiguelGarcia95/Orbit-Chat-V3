import React from 'react';
import {Comment, Dropdown, Icon} from 'semantic-ui-react';
import moment from 'moment';

const timeFromNow = message => {
  if (message.createdAt !== null) {
    return moment(message.createdAt.toDate()).fromNow();
  }
}

const isOwnMessageClass = (message, user) => {
  return message.uid === user.uid ? 'message_self' : ''
}

const isOwnMessageOptions = (message, user) => {
  if (message.uid === user.uid ) {
    return (
      <Dropdown icon='caret down'>
        <Dropdown.Menu direction='left' >
          <Dropdown.Item text='New Category' onClick={this.openModal} />
        </Dropdown.Menu>
      </Dropdown>
    )
    // console.log('return option to edit and or delete comment')
  } else {
    // console.log('return option to add as a friend or send a dm')
  }
}

const Message = ({message, user}) => {
  return (
    <Comment className="chat_comment">
      <Comment.Avatar src={message.avatar}  />
      <Comment.Content className={`comment_body ${isOwnMessageClass(message, user)}`} >
        <Comment.Author as='a'>{message.username}</Comment.Author>
        {message.createdAt &&  <Comment.Metadata >{timeFromNow(message)}</Comment.Metadata> }
        <Comment.Text>{message.comment}</Comment.Text>
        <Dropdown icon='ellipsis vertical' className='message_options'>
          <Dropdown.Menu direction='left' >
            <Dropdown.Item text='New Category'  />
          </Dropdown.Menu>
        </Dropdown>
      </Comment.Content>
    </Comment>
  )
}

export default Message;