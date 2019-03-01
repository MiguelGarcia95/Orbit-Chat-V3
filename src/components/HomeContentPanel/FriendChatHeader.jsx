import React from 'react';
import {Grid, Container, Header, Image, Icon, Button} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {deleteDirectMessageChat, addFriend} from '../../actions/homeActions';
import {getIdsFromMessages} from '../../utils/functions';

const isFriend = (friend, friends) => {
  let isFriend = false;
  friends.forEach(friendRequest => {
    if (friendRequest.friend.uid === friend.uid && friendRequest.friend.status === 'accepted') {
      isFriend = true;
    }
  })
  return isFriend;
}

const FriendChatHeader = ({friend, user, deleteDirectMessageChat, addFriend, messages, friends}) => {
  const isAFriend = isFriend(friend, friends);
  return (
    <Grid className='home_comment_header'>
      <Grid.Row columns='1' style={{padding: '0px'}}>
        <Container fluid textAlign='right' >
          <Image circular src={friend.avatar} size='mini' floated='left' verticalAlign="middle" style={{marginBottom: '0', marginTop: '7.5px'}} />
          <Header as='h5' floated='left' style={{lineHeight: '50px'}} content={friend.username} />
          <Button circular
            animated='fade' color='green'
            style={{padding: '10px 20px', marginBottom: '0', marginTop: '7.6px'}}
            disabled={isAFriend}
            title='Already Friend'
            onClick={() => addFriend(user, friend)}
          >
            <Button.Content hidden>Add Friend</Button.Content>
            <Button.Content visible>
              <Icon name='user plus' />
            </Button.Content>
          </Button>
          {/* 35 height of button */}
          <Button circular
            animated='fade' color='red'
            style={{padding: '10px 20px', marginBottom: '0', marginTop: '7.6px'}}
            onClick={() => deleteDirectMessageChat(user, friend, getIdsFromMessages(messages))}
          >
            <Button.Content hidden>Delete</Button.Content>
            <Button.Content visible>
              <Icon name='trash alternate outline' />
            </Button.Content>
          </Button>
        </Container>
      </Grid.Row>
    </Grid>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    deleteDirectMessageChat: (user, otherUser, allMessageIds) => dispatch(deleteDirectMessageChat(user, otherUser, allMessageIds)),
    addFriend: (user, otherUser) => dispatch(addFriend(user, otherUser))
  }
}

export default connect(null, mapDispatchToProps)(FriendChatHeader);