import React from 'react';
import {connect} from 'react-redux';
import {List, Button, Image} from 'semantic-ui-react';
import {rejectFriend, acceptFriend} from '../../actions/homeActions';

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
        <Button content='Accept' colr='green' icon='check' labelPosition='right' />
        <Button content='Reject' coloro='orange' icon='user cancel' labelPosition='right' />
      </React.Fragment>
    )
  }
}

const isUserSender = (friend, user) => {
  return friend.senderId === user.uid ? true : false;
}

const Friend = ({friend, user}) => {
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

const mapDispatchToProps = dispatch => {
  return {
    rejectFriend: (user, otherUser) => dispatch(rejectFriend(user, otherUser)),
    acceptFriend: (user, otherUser) => dispatch(acceptFriend(user, otherUser))
  }
}

export default connect(null, mapDispatchToProps)(Friend);