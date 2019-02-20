import React from 'react';
import {List} from 'semantic-ui-react';
import Friend from './Friend';

const displayFriends = friends => {
  return friends.map(friend => {
    return <Friend key={friend.id} friend={friend.friend} />
  })
}

const FriendList = ({friends}) => {
  return (
    <List divided verticalAlign='middle' className='chat_comment_container'>
      {displayFriends(friends)}
    </List>
  )
}

export default FriendList;