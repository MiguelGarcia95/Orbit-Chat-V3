import React from 'react';
import {Grid, Container, Header, Image, Icon} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {deleteDirectMessageChat} from '../../actions/homeActions';

const FriendChatHeader = ({friend, user}) => {
  return (
    <Grid className='home_comment_header'>
      <Grid.Row columns='1' style={{padding: '0px'}}>
        <Container fluid textAlign='right' >
          <Image circular src={friend.avatar} size='mini' floated='left' verticalAlign="middle" style={{marginBottom: '0', marginTop: '7.5px'}} />
          <Header as='h5' floated='left' style={{lineHeight: '50px'}} >{friend.username}</Header>
          {/* 21 height of icon */}
          <Icon 
            name='trash alternate outline' 
            size='large' color='red' 

            style={{marginBottom: '0', marginTop: '14.5px', cursor: 'pointer'}}
          />
        </Container>
      </Grid.Row>
    </Grid>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    deleteDirectMessageChat: (user, otherUser, allMessageIds) => dispatch(deleteDirectMessageChat(user, otherUser, allMessageIds))
  }
}

export default connect(null, mapDispatchToProps)(FriendChatHeader);