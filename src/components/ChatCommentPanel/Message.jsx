import React from 'react';
import {Comment} from 'semantic-ui-react';
import moment from 'moment';

const timeFromNow = timestamp => moment(timestamp).fromNow();

const Message = ({message}) => {
  return (
    <Comment>
      <Comment.Avatar src={message.avatar} />
      <Comment.Content>
        <Comment.Author as='a'>{message.username}</Comment.Author>
        <Comment.Metadata >{timeFromNow(message.createdDate.toDate())}</Comment.Metadata>
        <Comment.Text>{message.message}</Comment.Text>
      </Comment.Content>
    </Comment>
  )
}

export default Message;