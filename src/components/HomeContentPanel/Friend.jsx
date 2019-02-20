import React from 'react';
import {connect} from 'react-redux';
import {List, Button, Image} from 'semantic-ui-react';
import {rejectFriend, acceptFriend, deleteFriend} from '../../actions/homeActions';

const displayButtons = (friend, user) => {
  if (friend.status === 'accepted') {
    return (
      <React.Fragment>
        <Button 
          content='Delete' 
          color='red' 
          icon='trash alternate outline' 
          labelPosition='right'
          onClick={() => this.props.deleteFriend(user, friend)}
        />
      </React.Fragment>
    )
  } else if (friend.status === 'rejected') {
    return (
      <React.Fragment>
        <Button 
          content='Delete' 
          color='red' 
          icon='trash alternate outline' 
          labelPosition='right'
          onClick={() => this.props.deleteFriend(user, friend)}
        />
      </React.Fragment>
    )
  } else if (isUserSender(friend, user)) {
    return (
      <React.Fragment>
        <Button 
          content='Waiting' 
          color='grey' 
          icon='wait' 
          labelPosition='right' disabled 
        />
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <Button 
          content='Accept' 
          color='green' 
          icon='check' 
          labelPosition='right'
          onClick={() => this.props.acceptFriend(user, friend)}
        />
        <Button 
          content='Reject' 
          color='orange' 
          icon='user cancel' 
          labelPosition='right'
          onClick={() => this.props.rejectFriend(user, friend)}
        />
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
    rejectFriend: (user, friend) => dispatch(rejectFriend(user, friend)),
    acceptFriend: (user, friend) => dispatch(acceptFriend(user, friend)),
    deleteFriend: (user, friend) => dispatch(deleteFriend(user, friend))
  }
}

export default connect(null, mapDispatchToProps)(Friend);