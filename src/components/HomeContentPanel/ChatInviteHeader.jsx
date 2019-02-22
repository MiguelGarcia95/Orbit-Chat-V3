import React from 'react';
import {Grid, Container, Header} from 'semantic-ui-react';

const ChatInviteHeader = () => {
  return (
    <Grid className='home_comment_header'>
      <Grid.Row columns='1' style={{padding: '0px'}}>
        <Container fluid textAlign='right' >
          <Header as='h4' floated='left' style={{lineHeight: '50px', cursor: 'pointer'}} >Chatroom Invites</Header>
        </Container>
      </Grid.Row>
    </Grid>
  )
}

export default ChatInviteHeader;