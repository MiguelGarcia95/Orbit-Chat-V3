import React from 'react';
import {List, Button, Image} from 'semantic-ui-react';

const getFriendStatus = friend => {
  if (friend.status === 'accepted') {

  } else if (friend.status === 'rejected') {

  } else {
    
  }
}

const Friend = ({friend}) => {
  console.log(friend)
  return (
    <List.Item className='chat_comment'>
      <List.Content floated='right'>
        <Button color='red' content='Delete' icon='trash alternate outline' labelPosition='right' />
        <Button content='Accept' color='green' icon='check' labelPosition='right' />
        <Button content='Reject' color='orange' icon='user cancel' labelPosition='right' />
      </List.Content>
      <Image avatar src={friend.avatar} />
      <List.Content className={`comment_body`}>{friend.username}</List.Content>
    </List.Item>
  )
}

export default Friend;