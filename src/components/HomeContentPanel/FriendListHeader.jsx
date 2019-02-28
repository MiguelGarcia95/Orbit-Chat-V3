import React from 'react';
import {Grid, Container, Header} from 'semantic-ui-react';

const FriendListHeader = ({setFriendDisplay}) => {
  return (
    <Grid className='home_comment_header'>
      <Grid.Row columns='1' style={{padding: '0px'}}>
        <Container fluid textAlign='right' >
          <Header as='h4' floated='left' style={{lineHeight: '50px', cursor: 'pointer'}} onClick={() => setFriendDisplay('all')} >All</Header>
          <Header as='h4' floated='left' style={{lineHeight: '50px', cursor: 'pointer'}} onClick={() => setFriendDisplay('friends')} >Friends</Header>
          <Header as='h4' floated='left' style={{lineHeight: '50px', cursor: 'pointer'}} onClick={() => setFriendDisplay('pending')} >Pending</Header>
        </Container>
      </Grid.Row>
    </Grid>
  )
}

export default FriendListHeader;