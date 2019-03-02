import React from 'react';
import {Grid, Container, Header, Input} from 'semantic-ui-react';

class FriendListHeader extends React.Component {
  isOptionActive = (option, friendsToShow) => {
    return option === friendsToShow ? 'active' : ''
  }

  render() {
    const {setFriendDisplay, friendsToShow} = this.props;
    return (
      <Grid className='home_comment_header'>
        <Grid.Row columns='1' style={{padding: '0px'}}>
          <Container fluid textAlign='right' >
            <Header 
              className={`home_header_option ${this.isOptionActive('all', friendsToShow)}`} 
              as='h4' 
              floated='left' 
              onClick={() => setFriendDisplay('all')} 
            >
              All
            </Header>
            <Header 
              className={`home_header_option ${this.isOptionActive('friends', friendsToShow)}`} 
              as='h4' 
              floated='left' 
              onClick={() => setFriendDisplay('friends')} 
            >
              Friends
            </Header>
            <Header 
              className={`home_header_option ${this.isOptionActive('pending', friendsToShow)}`} 
              as='h4' 
              floated='left' 
              onClick={() => setFriendDisplay('pending')} 
            >
              Pending
            </Header>
            {/* addFriendWithEmail */}
            <Input 
              action={{content: 'Send Friend Request'}} 
              icon='user plus'
              iconPosition='left'
              onClick={() => console.log('clicked')} 
              placeholder='Friend Email' 
            /> 
          </Container>
        </Grid.Row>
      </Grid>
    )
  }
}

export default FriendListHeader;