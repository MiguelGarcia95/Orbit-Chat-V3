import React from 'react';
import {Segment} from 'semantic-ui-react';

const ChatCommentHeader = ({channel}) => {
  return (
    <Segment className='chat_comment_header'>
      <p><strong>{channel.channel.name}</strong> <small>{channel.channel.description}</small></p>
    </Segment>
  )
}

export default ChatCommentHeader;