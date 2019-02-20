import React from 'react';
import {Grid, Container, Header} from 'semantic-ui-react';

class FriendListHeader extends React.Component {
  render() {
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
}

export default FriendListHeader;