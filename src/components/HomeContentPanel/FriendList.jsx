import React from 'react';
import {Comment} from 'semantic-ui-react';
import Friend from './Friend';

const displayFriends = friends => {
  return friends.map(friend => {
    return <Friend key={friend.id} friend={friend} />
  })
}

const FriendList = ({friends}) => {
  return (
    <Comment.Group className='chat_comment_container'>
      {displayFriends(friends)}
    </Comment.Group>
  )
}

export default FriendList;