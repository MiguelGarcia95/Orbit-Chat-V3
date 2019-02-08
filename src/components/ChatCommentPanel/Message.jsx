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
      <Dropdown.Item content='Delete' icon='x' />
    )
    // console.log('return option to edit and or delete comment')
  } else {
    return (
      <Dropdown.Item content={`Send ${message.username} DM`} icon='at' />
    )
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
            {isOwnMessageOptions(message, user)}
          </Dropdown.Menu>
        </Dropdown>
      </Comment.Content>
    </Comment>
  )
}

export default Message;