import React from 'react';
import {Grid, Container, Header, Image} from 'semantic-ui-react';
import Friend from './Friend';

const displayFriends = friends => {
  return friends.map(friend => {
    return <Friend friend={friend} />
  })
}

const FriendList = ({friends}) => {
  return (
    <Grid className=''>
      {displayFriends(friends)}
    </Grid>
  )
}

export default FriendList;