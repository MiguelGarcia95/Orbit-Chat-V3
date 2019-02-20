import React from 'react';
import {List} from 'semantic-ui-react';
import Friend from './Friend';

const displayFriends = (friends, user) => {
  return friends.map(friend => {
    return <Friend key={friend.id} friend={friend.friend} user={user} />
  })
}

const FriendList = ({friends, user}) => {
  return (
    <List divided verticalAlign='middle' className='chat_comment_container'>
      {displayFriends(friends, user)}
    </List>
  )
}

export default FriendList;