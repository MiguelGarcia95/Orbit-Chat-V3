import React from 'react';
import {List} from 'semantic-ui-react';
import ChatroomInvite from './ChatroomInvite';

const displayChatrooms = (chatrooms, user) => {
  if (chatrooms.length > 0) {
    return chatrooms.map(chatroomInvite => {
      return <ChatroomInvite key={chatroomInvite.id} chatroomInvite={chatroomInvite.chatroom} />
    })
  } else {
    return <section><h1>No Chatrooms</h1></section>
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