import React from 'react';
import {List, Button, Image} from 'semantic-ui-react';

const Friend = ({friend}) => {
  console.log(friend)
  return (
    <List.Item className='chat_comment'>
      <List.Content floated='right'>
        <Button color='red'>Delete</Button>
        <Button color='green'>Accept</Button>
        <Button color='orange'>Reject</Button>
      </List.Content>
      <Image avatar src={friend.avatar} />
      <List.Content className={`comment_body`}>{friend.username}</List.Content>
    </List.Item>
  )
}

export default Friend;