import React from 'react';
import {Grid} from 'semantic-ui-react';

const ChatCommentHeader = ({channel}) => {
  return (
    <Grid className='chat_comment_header'>
      <Grid.Row columns='1' style={{paddingBottom: 0}} >
        <Grid.Column verticalAlign='middle'>
          <p><strong>{channel.channel.name} - </strong> {channel.channel.description}</p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default ChatCommentHeader;