import React from 'react';
import {Grid, Container, Header, Image} from 'semantic-ui-react';

const FriendChatHeader = ({friend}) => {
  return (
    <Grid className='home_comment_header'>
      <Grid.Row columns='1' style={{padding: '0px'}}>
        <Container fluid textAlign='right' >
          <Image circular src={friend.avatar} size='mini' floated='left' verticalAlign="middle" style={{marginBottom: '0', marginTop: '7.5px'}} />
          <Header as='h5' floated='left' style={{lineHeight: '50px'}} >{friend.username}</Header>
        </Container>
      </Grid.Row>
    </Grid>
  )
}

export default FriendChatHeader;