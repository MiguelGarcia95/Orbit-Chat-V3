import React from 'react';
import {Grid, Container, Header, Image} from 'semantic-ui-react';

const FriendListHeader = () => {
  return (
    <Grid className='home_comment_header'>
      <Grid.Row columns='1' style={{padding: '0px'}}>
        <Container fluid textAlign='right' >
          <Header as='h4' floated='left' style={{lineHeight: '50px'}} >All</Header>
          <Header as='h4' floated='left' style={{lineHeight: '50px'}} >Friends</Header>
          <Header as='h4' floated='left' style={{lineHeight: '50px'}} >Pending</Header>
        </Container>
      </Grid.Row>
    </Grid>
  )
}

export default FriendListHeader;