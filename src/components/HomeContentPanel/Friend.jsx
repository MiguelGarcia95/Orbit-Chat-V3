import React from 'react';
import {connect} from 'react-redux';
import {List, Button, Image, Icon} from 'semantic-ui-react';
import {rejectFriend, acceptFriend, deleteFriend, setHomeView} from '../../actions/homeActions';

class Friend extends React.Component {

  displayButtons = (friend, user) => {
    if (friend.status === 'accepted') {
      return (
        <React.Fragment>
          <Button circular
            animated='fade' color='red'
            style={{padding: '10px 20px'}} 
            onClick={() => this.props.deleteFriend(user, friend)}
          >
            <Button.Content hidden>Unfriend</Button.Content>
            <Button.Content visible>
              <Icon name='user x' />
            </Button.Content>
          </Button>
        </React.Fragment>
      )
    } else if (friend.status === 'rejected') {
      return (
        <React.Fragment>
          <Button
            content='Rejected' 
            color='red' 
            icon='x' 
            labelPosition='right' disabled 
          />
          <Button circular
            animated='fade' color='red'
            style={{padding: '10px 20px'}} 
            onClick={() => this.props.deleteFriend(user, friend)}
          >
            <Button.Content hidden>Delete</Button.Content>
            <Button.Content visible>
              <Icon name='user x' />
            </Button.Content>
          </Button>
        </React.Fragment>
      )
    } else if (this.isUserSender(friend, user)) {
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
          <Button circular
            animated='fade' color='green'
            style={{padding: '10px 20px'}} 
            onClick={() => this.props.acceptFriend(user, friend)}
          >
            <Button.Content hidden>Accept</Button.Content>
            <Button.Content visible>
              <Icon name='check' />
            </Button.Content>
          </Button>
          <Button circular
            animated='fade' color='orange'
            style={{padding: '10px 20px'}} 
            onClick={() => this.props.rejectFriend(user, friend)}
          >
            <Button.Content hidden>Reject</Button.Content>
            <Button.Content visible>
              <Icon name='ban' />
            </Button.Content>
          </Button>
        </React.Fragment>
      )
    }
  }

  isUserSender = (friend, user) => {
    return friend.senderId === user.uid ? true : false;
  }

  onUsernameClick = friend => this.props.setHomeView(friend.uid)

  render() {
    const {friend, user} = this.props

    return (
      <List.Item className='chat_comment'>
        <List.Content floated='right'>
          {this.displayButtons(friend, user)}
        </List.Content>
        <Image avatar src={friend.avatar} />
        <List.Content 
          className={`comment_body`} 
          as='a' style={{color: 'black'}}
          onClick={() => this.onUsernameClick(friend)} 
        >
          {friend.username}
        </List.Content>
      </List.Item>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    rejectFriend: (user, friend) => dispatch(rejectFriend(user, friend)),
    acceptFriend: (user, friend) => dispatch(acceptFriend(user, friend)),
    deleteFriend: (user, friend) => dispatch(deleteFriend(user, friend)),
    setHomeView: view => dispatch(setHomeView(view))
  }
}

export default connect(null, mapDispatchToProps)(Friend);