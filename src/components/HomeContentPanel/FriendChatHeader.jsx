import React from 'react';
import {Grid} from 'semantic-ui-react';

const FriendChatHeader = () => {
  return (
    <Grid className='chat_comment_header'>
      <Grid.Row style={{paddingBottom: 0}} >
        <Grid.Column verticalAlign='middle' >
          <p><strong>Avatar - </strong> Username</p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default FriendChatHeader;