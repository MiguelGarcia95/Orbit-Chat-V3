import React from 'react';
import {List, Button, Image} from 'semantic-ui-react';

const displayButtons = (friend, user) => {
  if (friend.status === 'accepted') {
    return (
      <React.Fragment>
        <Button color='red' content='Delete' icon='trash alternate outline' labelPosition='right' />
      </React.Fragment>
    )
  } else if (friend.status === 'rejected') {
    return (
      <React.Fragment>
        <Button color='red' content='Delete' icon='trash alternate outline' labelPosition='right' />
      </React.Fragment>
    )
  } else if (isUserSender(friend, user)) {
    return (
      <React.Fragment>
        <Button content='Waiting' color='grey' icon='wait' labelPosition='right' disabled />
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <Button content='Accept' color='green' icon='check' labelPosition='right' />
        <Button content='Reject' color='orange' icon='user cancel' labelPosition='right' />
      </React.Fragment>
    )
  }
}

const isUserSender = (friend, user) => {
  return friend.senderId === user.uid ? true : false;
}

const Friend = ({friend, user}) => {
  console.log(friend)
  return (
    <List.Item className='chat_comment'>
      <List.Content floated='right'>
        {displayButtons(friend, user)}
      </List.Content>
      <Image avatar src={friend.avatar} />
      <List.Content className={`comment_body`}>{friend.username}</List.Content>
    </List.Item>
  )
}

export default Friend;