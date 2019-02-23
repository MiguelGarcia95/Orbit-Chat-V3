import React from 'react';
import {connect} from 'react-redux';
import {List, Button, Image, Icon} from 'semantic-ui-react';
import {joinChatroom, rejectChatroomInvitation} from '../../actions/chatroomActions';

class ChatroomInvite extends React.Component {
  // onUsernameClick = friend => this.props.setHomeView(friend.uid);

  render() {
    const {chatroomInvite, user} = this.props

    return (
      <List.Item className='chat_comment'>
        <List.Content floated='right'>
          <Button circular
            animated='fade' color='green'
            style={{padding: '10px 20px'}} 
            // onClick={() => this.props.acceptFriend(user, friend)}
          >
            <Button.Content hidden>Join</Button.Content>
            <Button.Content visible>
              <Icon name='check' />
            </Button.Content>
          </Button>
          <Button circular
            animated='fade' color='orange'
            style={{padding: '10px 20px'}} 
            // onClick={() => this.props.rejectFriend(user, friend)}
          >
            <Button.Content hidden>Reject</Button.Content>
            <Button.Content visible>
              <Icon name='ban' />
            </Button.Content>
          </Button>
        </List.Content>
        <Image avatar src={chatroomInvite.avatar} />
        <List.Content 
          className={`comment_body`} 
          as='a' style={{color: 'black'}}
          // onClick={() => this.onUsernameClick(chatroomInvite)} 
        >
          {chatroomInvite.name}
        </List.Content>
      </List.Item>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    rejectChatroomInvitation: () => dispatch(rejectChatroomInvitation(userId, chatroomId)),
    joinChatroom: (user, chatroom) => dispatch(joinChatroom(user, chatroom))
  }
}

export default connect(null, mapDispatchToProps)(ChatroomInvite);