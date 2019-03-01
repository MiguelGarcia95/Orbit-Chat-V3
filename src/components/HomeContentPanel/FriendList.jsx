import React from 'react';
import {List} from 'semantic-ui-react';
import Friend from './Friend';

const displayFriends = (friends, user) => {
  return friends.map(friend => {
    return <Friend key={friend.id} friend={friend.friend} user={user} />
  })
}

const filterFriends = (friends, friendsToShow) => {
  if (friendsToShow === 'all') {
    return friends
  } else if (friendsToShow === 'friends') {
    let allFriends = [];
    friends.forEach(friend => {
      if (friend.friend.status === 'accepted') {
        allFriends.push(friend);
      }
    });
    return allFriends;
  } else {
    let allFriends = [];
    friends.forEach(friend => {
      if (friend.friend.status === 'pending') {
        allFriends.push(friend);
      }
    });
    return allFriends;
  }
}

const FriendList = ({friends, user, friendsToShow}) => {
  const sortedFriends = filterFriends(friends, friendsToShow);
  return (
    <List divided verticalAlign='middle' className='chat_comment_container'>
      {displayFriends(sortedFriends, user)}
    </List>
  )
}

export default FriendList;