import React from 'react';
import {Grid, Container, Header} from 'semantic-ui-react';

const isOptionActive = (option, friendsToShow) => {
  return option === friendsToShow ? 'active' : ''
}

const FriendListHeader = ({setFriendDisplay, friendsToShow}) => {
  return (
    <Grid className='home_comment_header'>
      <Grid.Row columns='1' style={{padding: '0px'}}>
        <Container fluid textAlign='right' >
          <Header 
            className={`home_header_option ${isOptionActive('all', friendsToShow)}`} 
            as='h4' 
            floated='left' 
            onClick={() => setFriendDisplay('all')} 
          >
            All
          </Header>
          <Header 
            className={`home_header_option ${isOptionActive('friends', friendsToShow)}`} 

            as='h4' 
            floated='left' 
            onClick={() => setFriendDisplay('friends')} 
          >
            Friends
          </Header>
          <Header 
            className={`home_header_option ${isOptionActive('pending', friendsToShow)}`} 
            as='h4' 
            floated='left' 
            onClick={() => setFriendDisplay('pending')} 
          >
            Pending
          </Header>
        </Container>
      </Grid.Row>
    </Grid>
  )
}

export default FriendListHeader;