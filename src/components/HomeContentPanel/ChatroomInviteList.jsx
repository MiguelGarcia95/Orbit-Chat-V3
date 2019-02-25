import React from 'react';
import {List, Header} from 'semantic-ui-react';
import ChatroomInvite from './ChatroomInvite';

const displayChatrooms = (chatrooms, user) => {
  if (chatrooms.length > 0) {
    return chatrooms.map(chatroomInvite => {
      return <ChatroomInvite key={chatroomInvite.id} chatroomInvite={chatroomInvite} user={user} />
    })
  } else {
    return (
      <Header as='h4' color='red' content='No Chatroom Invitations' size='large' textAlign='center' style={{marginTop: '20px'}}/>
    )
  }
  
}

const ChatroomInviteList = ({user, chatroomInvites}) => {
  return (
    <List divided verticalAlign='middle' className='chat_comment_container'>
      {displayChatrooms(chatroomInvites, user)}
    </List>
  )
}

export default ChatroomInviteList;