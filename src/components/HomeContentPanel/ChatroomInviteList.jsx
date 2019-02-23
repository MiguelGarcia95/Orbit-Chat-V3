import React from 'react';
import {List} from 'semantic-ui-react';

const displayChatrooms = (chatrooms, user) => {
  if (chatrooms.length > 0) {
    return chatrooms.map(friend => {
      return <section><h1>Chatroom Here</h1></section>
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