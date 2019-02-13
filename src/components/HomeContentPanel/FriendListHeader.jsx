import React from 'react';
import {Grid} from 'semantic-ui-react';

const FriendListHeader = ({friend}) => {
  return (
    <Grid className='chat_comment_header'>
      <Grid.Row columns='1' >
        <Grid.Column verticalAlign='middle' >
          <p><strong>Avatar - </strong> {friend.username}</p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default FriendListHeader;