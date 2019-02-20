import React from 'react';
import {List, Button, Image} from 'semantic-ui-react';

const displayButtons = friend => {
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
  } else {
    return (
      <React.Fragment>
        <Button content='Accept' color='green' icon='check' labelPosition='right' />
        <Button content='Reject' color='orange' icon='user cancel' labelPosition='right' />
        <Button content='Waiting' color='grey' icon='user cancel' labelPosition='right' disabled />
      </React.Fragment>
    )
  }
}

const Friend = ({friend}) => {
  console.log(friend)
  return (
    <List.Item className='chat_comment'>
      <List.Content floated='right'>
        {displayButtons(friend)}
      </List.Content>
      <Image avatar src={friend.avatar} />
      <List.Content className={`comment_body`}>{friend.username}</List.Content>
    </List.Item>
  )
}

export default Friend;