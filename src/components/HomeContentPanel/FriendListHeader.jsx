import React from 'react';
import {Grid, Container, Header, Image} from 'semantic-ui-react';

const FriendListHeader = () => {
  return (
    <Grid className='home_comment_header'>
      <Grid.Row columns='1' style={{padding: '0px'}}>
        <Container fluid textAlign='right' >
          <Header as='h5' floated='left' style={{lineHeight: '50px'}} >Friend</Header>
        </Container>
      </Grid.Row>
    </Grid>
  )
}

export default FriendListHeader;