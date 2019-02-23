import React from 'react';
import {connect} from 'react-redux';
import {List, Button, Image, Icon} from 'semantic-ui-react';
import {joinChatroom, rejectChatroomInvitation} from '../../actions/chatroomActions';

const ChatroomInvite = ({chatroomInvite, user, joinChatroom, rejectChatroomInvitation}) => {
  return (
    <List.Item className='chat_comment'>
      <List.Content floated='right'>
        <Button circular
          animated='fade' color='green'
          style={{padding: '10px 20px'}} 
          onClick={() => joinChatroom(user, chatroomInvite)}
        >
          <Button.Content hidden>Join</Button.Content>
          <Button.Content visible>
            <Icon name='check' />
          </Button.Content>
        </Button>
        <Button circular
          animated='fade' color='orange'
          style={{padding: '10px 20px'}} 
          onClick={() => rejectChatroomInvitation(user.id, chatroomInvite.id)}
        >
          <Button.Content hidden>Reject</Button.Content>
          <Button.Content visible>
            <Icon name='ban' />
          </Button.Content>
        </Button>
      </List.Content>
      <Image avatar src={chatroomInvite.chatroom.avatar} />
      <List.Content 
        className={`comment_body`} 
        as='p'
      >
        {chatroomInvite.chatroom.name}
      </List.Content>
    </List.Item>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    rejectChatroomInvitation: (userId, chatroomId) => dispatch(rejectChatroomInvitation(userId, chatroomId)),
    joinChatroom: (user, chatroom) => dispatch(joinChatroom(user, chatroom))
  }
}

export default connect(null, mapDispatchToProps)(ChatroomInvite);